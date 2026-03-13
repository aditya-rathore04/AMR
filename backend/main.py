from fastapi import FastAPI
import joblib
import pandas as pd

app = FastAPI()

# Load model
model = joblib.load("../models/amr_random_forest.pkl")
model_columns = joblib.load("../models/model_columns.pkl")

@app.get("/")
def home():
    return {"message": "AMR Prediction API Running"}

@app.post("/predict")
def predict(data: dict):

    df = pd.DataFrame([data])

    df = pd.get_dummies(df)

    df = df.reindex(columns=model_columns, fill_value=0)

    prediction = model.predict(df)[0]

    return {
        "predicted_resistance": float(prediction)
    }