#!/usr/bin/env python
# coding: utf-8
from .predictor import Flags, Seq2SeqPredictor

flags = Flags()
predictor = Seq2SeqPredictor(flags)

from flask import Flask, session, redirect, url_for, request, jsonify
from markupsafe import escape

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/api/generate', methods=['POST'])
def generate():
    data = request.get_json(silent=True)
    keywords = data['keywords']
    isCangTou = data['isCangTou']
    imgBase64 = data['imgBase64']

    print(keywords)
    lines = predictor.predict(keywords)
    print(lines)
    return jsonify(lines)


if __name__ == '__main__':
    app.run()
