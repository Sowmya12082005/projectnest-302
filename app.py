from flask import Flask, request, jsonify, render_template, redirect, url_for
import pandas as pd
import joblib

# Initialize the Flask app
app = Flask(__name__)

# Load the trained model
model = joblib.load('wine_quality_model.pkl')  # Make sure to save your model as 'wine_quality_model.pkl'

@app.route('/')
def home():
    return """
    <h1>Welcome to the Wine Quality Prediction API!</h1>
    <button onclick="window.location.href='/predict_page'"> LETS GO </button>
    """

@app.route('/predict_page')
def predict_page():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from the request
        data = request.get_json()

        # Convert JSON data to DataFrame
        input_data = pd.DataFrame([data])

        # Make prediction
        prediction = model.predict(input_data)

        # Return the prediction as JSON
        return jsonify({"predicted_quality": prediction[0]})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
