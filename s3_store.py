import boto
from boto.s3.key import Key
import os
from flask import current_app as app

# TODO: Better acl
def s3_upload(key, file_contents, acl='private'):
    # Connect to S3 and upload file.
    conn = boto.connect_s3(app.config["S3_KEY"], app.config["S3_SECRET"])
    bucket = conn.get_bucket(app.config["S3_BUCKET"])

    sml = bucket.new_key(key)
    sml.set_contents_from_string(file_contents)
    sml.set_acl(acl)

def s3_download(key):
    conn = boto.connect_s3(app.config["S3_KEY"], app.config["S3_SECRET"])
    bucket = conn.get_bucket(app.config["S3_BUCKET"])

    k = Key(bucket)
    k.key = key
    return k.get_contents_as_string()
