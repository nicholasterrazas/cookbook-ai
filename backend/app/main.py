from fastapi import FastAPI

app = FastAPI()

def root():
    return {"message": "Welcome to Cookbook AI"}

