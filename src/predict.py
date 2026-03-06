import joblib
import pandas as pd

model = joblib.load("../models/amr_random_forest.pkl")

def predict_resistance(input_data):
    
    df = pd.DataFrame([input_data])
    
    df = pd.get_dummies(df)
    
    prediction = model.predict(df)
    
    return prediction[0]