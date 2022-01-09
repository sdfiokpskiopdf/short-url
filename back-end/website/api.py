from flask import Blueprint
from flask import jsonify
from flask import request
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from . import db
from .models import Url


def create_api(app):
    api = Blueprint("api", __name__)
    limiter = Limiter(app, key_func=get_remote_address)

    @api.route("/url", methods=["POST"])
    @limiter.limit("30/minute")
    def post_url():
        if request.method == "POST":

            # Get the JSON data from the request
            data = request.get_json()
            redirect_url = data["redirect_url"]
            alias = data["alias"]

            # Check if the alias is already taken
            url_exists = Url.query.filter_by(alias=alias).first()
            if url_exists:
                return jsonify({"message": "Alias already taken."}), 400

            # Add the JSON data to the database
            url = Url(redirect_url=redirect_url, alias=alias)
            db.session.add(url)
            db.session.commit()

            return jsonify(url.json())

    @api.route("/url/<alias>", methods=["GET"])
    @limiter.limit("30/minute")
    def get_url(alias):
        if request.method == "GET":

            # Get the URL from the database
            url = Url.query.filter_by(alias=alias).first()

            # return the URL if it exists
            if url:
                return jsonify(url.json())
            else:
                return jsonify({"message": "Alias not found."}), 404

    return api
