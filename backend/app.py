import datetime
from flask import Flask, jsonify, request
import firebase_admin
from firebase_admin import credentials, firestore
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firestore.client()


@app.route('/')
def index():
    return 'Hello World!'

@app.route('/register', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        fullname = data.get('fullname')
        email = data.get('email')
        uid = data.get('uid')

        if not fullname or not email or not uid:
            return jsonify({'error': 'All fields (fullname, email, uid) are required'}), 400

        existing_user = db.collection('users').where('email', '==', email).get()
        if existing_user:
            return jsonify({'error': 'A user with this email already exists'}), 409

        existing_user = db.collection('users').where('uid', '==', uid).get()
        if existing_user:
            return jsonify({'error': 'A user with this UID already exists'}), 409

        doc_ref = db.collection('users').document()
        doc_ref.set({
            'uid': uid,
            'fullname': fullname,
            'email': email,
        })

        return jsonify({
            'message': 'User created successfully!',
            'user_id': doc_ref.id,
            'data': {
                'uid': uid,
                'fullname': fullname,
                'email': email
            }
        }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/locations', methods=['GET'])
def get_locations():
    try:
        doc_ref = db.collection('locations').document('locations')
        doc = doc_ref.get()

        if doc.exists:
            locations = doc.to_dict().get('countries', [])
            return jsonify({"status": "success", "data": locations}), 200
        else:
            return jsonify({"status": "error", "message": "Locations not found"}), 404
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/submit_guess', methods=['POST'])
def create_guess():
    try:
        data = request.get_json()
        uid = data.get('uid')
        location = data.get('location')
        time_guessed = data.get('time')

        if not uid or not location or not time_guessed:
            return jsonify({'error': 'All fields (uid, location, time_guessed) are required'}), 400

        answers_ref = db.collection('answers')
        query = answers_ref.where('location', '==', location).where('time', '==', time_guessed)
        iscorrect = bool(query.get())

        doc_ref = db.collection('guesses').document()
        doc_ref.set({
            'uid': uid,
            'location': location,
            'time_guessed': time_guessed,
            'iscorrect': bool(iscorrect)
        })

        return jsonify({
            'message': 'Guess created successfully!',
            'guess_id': doc_ref.id,
            'iscorrect': bool(iscorrect),
            'data': {
                'uid': uid,
                'location': location,
                'time_guessed': time_guessed,
                'iscorrect': bool(iscorrect)
            }
        }), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/user/<uid>/guesses_results', methods=['GET'])
def get_results(uid):
    try:
        results_ref = db.collection("guesses").where('uid', '==', uid).where('iscorrect', '==', True)
        results = results_ref.stream()

        result_list = []
        for result in results:
            result_dict = result.to_dict()
            result_dict.pop('uid', None)
            result_dict.pop('iscorrect', None)
            result_list.append(result_dict)
        print(result_list)
        return jsonify(result_list), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
