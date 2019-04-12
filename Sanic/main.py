from sanic import Sanic
from sanic import response

app = Sanic()

@app.route("/")
async def main(request):
    return response.text("Hello World!")

if __name__ == "__main__":
    app.run(debug=False, access_log=False, host="0.0.0.0", port=8080)