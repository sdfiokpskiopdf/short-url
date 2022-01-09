from flask import Flask
from flask import url_for
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy

import os

db = SQLAlchemy()
DB_NAME = "database.db"


def create_app():
    app = Flask(__name__)

    # App config
    app.config["SECRET_KEY"] = "thisissecret"  # change this to something else
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + DB_NAME
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)

    from .api import create_api

    app.register_blueprint(create_api(app), url_prefix="/api")

    # Cache related stuff
    @app.context_processor
    def override_url_for():
        return dict(url_for=dated_url_for)

    def dated_url_for(endpoint, **values):
        if endpoint == "static":
            filename = values.get("filename", None)
            if filename:
                file_path = os.path.join(app.root_path, endpoint, filename)
                values["q"] = int(os.stat(file_path).st_mtime)
        return url_for(endpoint, **values)

    # Rate limit error
    @app.errorhandler(429)
    def ratelimit_handler(e):
        return jsonify({"message": "Rate limit exceeded."}), 429

    create_database(app)

    return app


def create_database(app):
    if not os.path.exists("website/" + DB_NAME):
        db.create_all(app=app)
        print("[SUCCESS] Database created.")
    else:
        print("[INFO] Database already exists.")
