# AMR - AI-Based Antimicrobial Resistance Forecasting System

* **AI-Based AMR Forecasting System** — *Python, Scikit-learn, FastAPI, React, Streamlit* — [[Source code](https://github.com/aditya-rathore04/AMR)]

    * Developed a machine learning forecasting system using **Scikit-learn** and **Random Forest** to predict antimicrobial resistance percentages based on global GLASS dataset parameters.
    * Engineered a **FastAPI** backend featuring RESTful endpoints for real-time resistance prediction, geographic data aggregation, and automated alerting for emerging resistance trends.
    * Designed an interactive data visualization platform using **React** and **Streamlit** that enables users to analyze global resistance maps and receive automated clinical alerts.

## 🎥 Project Demo


https://github.com/user-attachments/assets/00f21d01-3733-4839-974d-a2c800ec870e


## 🚀 Features
* **Predictive Modeling:** Uses a Random Forest Regressor to forecast resistance levels.
* **Global Mapping:** Visualizes resistance trends across different countries and territories.
* **Automated Alerts:** Identifies significant yearly increases in resistance to provide early warnings.
* **Multi-Platform Frontend:** Includes both a React-based dashboard and a Streamlit analysis tool.

## 🛠️ Tech Stack
* **Backend:** FastAPI, Uvicorn, Joblib
* **Machine Learning:** Scikit-learn, Pandas, NumPy
* **Frontend:** React.js, Streamlit, Altair
* **Data:** Excel/CSV processing via Openpyxl

## 📋 Installation & Setup

### Backend
1. Navigate to the `backend` folder.
2. Install dependencies: `pip install -r ../requirements.txt`.
3. Run the server: `uvicorn main:app --reload`.

### Frontend (React)
1. Navigate to the `frontend` folder.
2. Install dependencies: `npm install`.
3. Start the app: `npm start`.
