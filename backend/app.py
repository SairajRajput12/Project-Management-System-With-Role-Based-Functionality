from flask import Flask, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing (CORS)

@app.route('/')
def home():
    return jsonify({"message": "This function is written for testing the connection of frontend and backend !"})

if __name__ == "__main__":
    app.run(debug=True)
