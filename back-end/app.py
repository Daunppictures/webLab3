from flask import Flask, jsonify, request, make_response
from flask_cors import CORS, cross_origin
from flask_restful import Api, Resource

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

arr = [
    {'name': 'Anton', 'age': 19},
]


@app.route('/get', methods=['GET'])
@cross_origin()
def hello():
    print(jsonify(arr))
    return jsonify(arr)

@app.route('/post', methods=['POST'])
def post():
    data = request.get_json()
    print(data)
    arr.append(data)
    print(arr)
    return data

@app.route('/delete', methods=['DELETE'])
def delete():
    return arr.pop(len(arr) - 1)


if __name__ == '__main__':
    app.run(debug='TRUE')
