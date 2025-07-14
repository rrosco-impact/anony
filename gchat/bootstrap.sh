#!/bin/sh
export FLASK_APP=./.venv/anony/index.py
pipenv run flask --debug run -h localhost -p 8000
# -h 0.0.0.0