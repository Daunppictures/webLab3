import json

from flask import Flask, jsonify, request, make_response
from flask_cors import CORS, cross_origin
from flask_restful import Api, Resource


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

arr = [

]


@app.route('/get', methods=['GET'])
@cross_origin()
def get():
    return jsonify(arr)

@app.route('/post', methods=['GET', 'POST'])
def post():
    data = request.get_json()
    arr.append(data)
    return jsonify(arr)

@app.route('/put/<id>', methods=['GET', 'PUT'])
def put(id):
    data = request.get_json()
    arr[int(id)] = data
    return jsonify(arr)

@app.route('/delete/<id>', methods=['GET', 'DELETE'])
def delete(id):
    arr.pop(int(id))
    return jsonify(arr)


if __name__ == '__main__':
    app.run(debug='TRUE')
