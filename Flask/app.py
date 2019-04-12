from flask import Flask
import logging

app = Flask(__name__)
app.logger.disabled = True

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)
print("Listen at 8080")

@app.route("/")
def hello():
    return "Hello World!"

if __name__ == "__main__":
    app.run(debug=False, port=8080)
