from fastapi import FastAPI
import joblib
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
@app.get("/map-data")
def get_map_data():

    import pandas as pd

    df = pd.read_excel("../data/Glass_AMR_dataset.xlsx")

    # average resistance by country
    country_resistance = (
        df.groupby("CountryTerritoryArea")["ResistancePercentage"]
        .mean()
        .reset_index()
    )

    result = {}

    for _, row in country_resistance.iterrows():
        result[row["CountryTerritoryArea"]] = float(round(row["ResistancePercentage"],2))

    return result