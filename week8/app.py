from flask import Flask, request, render_template, make_response

app = Flask(__name__)

@app.route('/')
def index():
    # Check if the language cookie is set
    user_language = request.cookies.get('user_language')
    return render_template('index.html', user_language=user_language)

@app.route('/set_language/<language>')
def set_language(language):
    # Set the language preference in a cookie
    response = make_response(render_template('index.html', user_language=language))
    response.set_cookie('user_language', language)
    return response

if __name__ == '__main__':
    app.run(debug=True)