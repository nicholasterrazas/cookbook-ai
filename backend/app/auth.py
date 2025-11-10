import time
from typing import Any, Dict, Optional

import httpx
from fastapi import Header, HTTPException
from jose import jwt
from jose.exceptions import JWTError
from pydantic_settings import BaseSettings


class AuthSettings(BaseSettings):
    AUTH0_DOMAIN: str
    AUTH0_AUDIENCE: str
    JWKS_CACHE_TTL: int = 3600  # in seconds

    class Config:
        env_prefix = ""
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = AuthSettings()

JWKS_URL = f"https://{settings.AUTH0_DOMAIN}/.well-known/jwks.json"
ISSUER = f"https://{settings.AUTH0_DOMAIN}/"


# In-memory cache for JWKS
_jwks_cache: Dict[str, Any] = {"keys": [], "fetched_at": 0}

async def fetch_jwks(force: bool = False) -> Dict[str, Any]:
    now = int(time.time())
    ttl = settings.JWKS_CACHE_TTL
    
    # Check cache validity
    if not force and _jwks_cache["keys"] and (now - _jwks_cache["fetched_at"] < ttl):
        return _jwks_cache
    
    # Fetch new JWKS if cache is stale or forced
    async with httpx.AsyncClient() as client:
        resp = await client.get(JWKS_URL, timeout=10.0)
        resp.raise_for_status()
        jwks = resp.json()
        _jwks_cache["keys"] = jwks.get("keys", [])
        _jwks_cache["fetched_at"] = int(time.time())
        return _jwks_cache


async def get_current_user(authorization: Optional[str] = Header(None)):
    # Extract token from Authorization header
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header missing")
    
    parts = authorization.split()
    if parts[0].lower() != "bearer" or len(parts) != 2:
        raise HTTPException(status_code=401, detail="Invalid authorization header format")
    
    token = parts[1]

    # Get header to find kid
    try:
        unverified_header = jwt.get_unverified_header(token)
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token header")
    
    jwks = await fetch_jwks()
    rsa_key = {}
    for key in jwks["keys"]:
        if key.get("kid") == unverified_header.get("kid"):
            rsa_key = {
                "kty": key["kty"],
                "kid": key["kid"],
                "use": key["use"],
                "n": key["n"],
                "e": key["e"]
            }
            break


    if not rsa_key:
        # Force refresh JWKS and try again
        jwks = await fetch_jwks(force=True)
        for key in jwks["keys"]:
            if key.get("kid") == unverified_header.get("kid"):
                rsa_key = {
                    "kty": key["kty"],
                    "kid": key["kid"],
                    "use": key["use"],
                    "n": key["n"],
                    "e": key["e"]
                }
                break

    if not rsa_key:
        raise HTTPException(status_code=401, detail="Unable to find appropriate key")
    
    # Decode and verify token
    try:
        payload = jwt.decode(
            token,
            rsa_key,
            algorithms=["RS256"],
            audience=settings.AUTH0_AUDIENCE,
            issuer=ISSUER
        )
    except JWTError as e:
        raise HTTPException(status_code=401, detail=f"Token validation error: {str(e)}")
    
    # Token is valid, return the payload (user info)
    user = payload["sub"]
    return user
    

# Optional version that returns None if no valid token is provided
# Useful for endpoints that allow both authenticated and unauthenticated access
async def get_current_user_optional(authorization: Optional[str] = Header(None)):
    if not authorization:
        return None
    try:
        user = await get_current_user(authorization)
        return user
    except HTTPException:
        return None