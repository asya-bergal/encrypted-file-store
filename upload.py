from __future__ import print_function
from flask import Flask, request, render_template, make_response
from s3_store import *
import sys
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config.from_object('config')

@app.route('/<key>/upload', methods = ['GET', 'POST'])
def upload_file(key):
    if request.method == 'POST':
        data = request.form['data']
        sanitized_key = secure_filename(key)
        s3_upload(sanitized_key, data)
    return render_template("upload.html")

@app.route('/<key>/download', methods = ['GET'])
def download(key):
    return render_template("download.html")

@app.route('/<key>/get', methods = ['GET'])
def download_file(key):
    sanitized_key = secure_filename(key)
    filestr = s3_download(sanitized_key)

    return make_response(filestr)
