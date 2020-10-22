from flask import Flask, jsonify, request, make_response
from flask_cors import CORS, cross_origin
from flask_restful import Api, Resource

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

arr = [
    {'first_name': 'Anton1', 'last_name': 'Solodovnikov1'},
    {'first_name': 'Anton2', 'last_name': 'Solodovnikov2'},
    {'first_name': 'Anton3', 'last_name': 'Solodovnikov3'},
    {'first_name': 'Anton4', 'last_name': 'Solodovnikov4'},
]


@app.route('/get', methods=['GET'])
@cross_origin()
def get():
    return jsonify(arr)

@app.route('/post', methods=['POST'])
def post():
    data = request.get_json()
    arr.append(data)
    return data

@app.route('/delete/<id>', methods=['GET', 'DELETE'])
def delete(id):
    arr.pop(int(id))
    return jsonify(arr)


if __name__ == '__main__':
    app.run(debug='TRUE')
