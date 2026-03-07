import streamlit as st
import joblib
import pandas as pd

# Load model
model = joblib.load("models/amr_random_forest.pkl")
model_columns = joblib.load("models/model_columns.pkl")
st.title("AI-Based Antimicrobial Resistance Forecasting")

st.write(
"""
Predict fluoroquinolone resistance risk in *E. coli*
using epidemiological surveillance data.
"""
)

# User inputs
year = st.number_input("Year", min_value=2015, max_value=2030, value=2025)

country = st.selectbox(
    "Country",
    ["India","Pakistan","Myanmar","Norway","Qatar","Indonesia"]
)

specimen = st.selectbox(
    "Specimen Type",
    ["Urinary tract","Bloodstream"]
)

antibiotic = st.selectbox(
    "Antibiotic",
    ["Ciprofloxacin","Levofloxacin"]
)

interpretable_ast = st.slider(
    "Number of isolates tested",
    10,1000,200
)

prev_resistance = st.slider(
    "Previous resistance (%)",
    0,100,30
)

# Prediction button
if st.button("Predict Resistance Risk"):

    input_data = pd.DataFrame([{
        "Year":year,
        "CountryTerritoryArea":country,
        "Specimen":specimen,
        "AntibioticName":antibiotic,
        "InterpretableAST":interpretable_ast,
        "PrevResistance":prev_resistance
    }])

    input_data = pd.get_dummies(input_data)

    # Align with training columns
    input_data = input_data.reindex(columns=model_columns, fill_value=0)

    prediction = model.predict(input_data)[0]

    st.success(f"Predicted Resistance: {prediction:.2f}%")