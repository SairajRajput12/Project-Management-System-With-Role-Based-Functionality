from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Create the path to the users.json file
DATA_FILE = os.path.join(os.getcwd(), 'data', 'data', 'users.json')

# Ensure the directory exists
os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)

@app.route('/')
def home():
    return jsonify({"message": "Backend and frontend connected successfully!"})

# Helper function to read users
def read_users():
    with open(DATA_FILE, 'r') as file:
        return json.load(file)

# Helper function to write users
def write_users(data):
    with open(DATA_FILE, 'w') as file:
        json.dump(data, file, indent=4)

# Signup route
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    role = data.get('role')
    if not username or not password:
        return jsonify({"message": "Username and password are required!"}), 400

    users_data = read_users()
    if any(user['username'] == username for user in users_data['users']):
        return jsonify({"message": "User already exists!"}), 400

    users_data['users'].append({"username": username, "password": password,"email":email,"role":role})
    write_users(users_data)
    return jsonify({"message": "User registered successfully."}), 200

# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    print(username) 
    print(password)

    if not username or not password:
        return jsonify({"message": "Username and password are required!"}), 400

    users_data = read_users()
    for user in users_data['users']:
        if user['email'] == username and user['password'] == password:
            return jsonify({"message": "Login successful!"}), 200

    return jsonify({"message": "Invalid username or password!"}), 401

if __name__ == "__main__":
    # Check if the file exists, if not create it with initial data
    if not os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'w') as file:
            json.dump({"users": []}, file, indent=4)
    app.run(debug=True)
