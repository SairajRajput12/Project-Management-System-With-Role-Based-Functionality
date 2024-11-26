from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
from dotenv import load_dotenv
import jwt # this library is for generating tokens for authentication process and ensuring the proces of login and signup in frontend
from datetime import datetime, timedelta


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
BLACKLIST = set()


# Create the path to the users.json file
DATA_FILE = os.path.join(os.getcwd(), 'data', 'data', 'users.json')
SECRET_KEY = os.getenv('SECRET_KEY')

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


@app.route('/adminsignup', methods=['POST'])
def admin_signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')

    print(username) 
    print(email)
    if not username or not password:
        return jsonify({"message": "Username and password are required!"}), 400

    users_data = read_users()
    print(users_data)
    print(len(users_data['admin']))
    if len(users_data['admin']) != 0 and any(user['username'] == username for user in users_data['admin']):
        return jsonify({"message": "User already exists!"}), 400

    users_data['admin'].append({"username": username, "password": password,"email":email})
    write_users(users_data)
    return jsonify({"message": "User registered successfully."}), 200



@app.route('/logout', methods=['POST'])
def logout():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({"message": "Token is missing!"}), 400

    try:
        token = token.split(" ")[1]  # Extract token from "Bearer <token>"
        decoded = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])

        # Add token to the blacklist
        BLACKLIST.add(token)
        
        return jsonify({"message": "Successfully logged out!"}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token has already expired!"}), 400
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token!"}), 400


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
    print('79')
    users_data = read_users()
    for user in users_data['users']:
        if user['email'] == username and user['password'] == password:
            token = jwt.encode({
                'user_id': user['username'],
                'exp': datetime.now() + timedelta(hours=1)
            }, SECRET_KEY, algorithm='HS256')

            return jsonify({"message": "Login successful!","level":"admin","role":user['role'],"token": token}), 200
        
    for user in users_data['admin']:
        if user['email'] == username and user['password'] == password:
            token = jwt.encode({
                'user_id': user['username'],
                'exp': datetime.now() + timedelta(hours=1)
            }, SECRET_KEY, algorithm='HS256')

            return jsonify({"message": "Login successful!","level":"admin", "token": token}), 200


    return jsonify({"message": "Invalid username or password!"}), 401


@app.route('/profile', methods=['GET'])
def profile():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({"message": "Token is missing!"}), 403

    try:
        token = token.split(" ")[1]  # Extract the token from the "Bearer <token>" format
        decoded = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        username = decoded['username']
        return jsonify({"message": f"Welcome, {username}!"}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token has expired!"}), 403
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token!"}), 403


if __name__ == "__main__":
    # Check if the file exists, if not create it with initial data
    if not os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'w') as file:
            json.dump({"users": []}, file, indent=4)
    app.run(debug=True)
