from flask import Flask
import logging
app = Flask(__name__)
app.logger.disabled = True

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)
@app.route("/")
def hello():
    return "Hello World!"
