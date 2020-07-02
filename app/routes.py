from flask import render_template, url_for
from app import app

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html', title="Dashly Dash")

@app.route('/Home')
def dash_home():
    return render_template('dash/home.html')

@app.route('/Water')
def dash_water():
    return render_template('dash/water.html')

@app.route('/Gardens')
def dash_gardens():
    return render_template('dash/gardens.html')

@app.route('/Climate')
def dash_climate():
    return render_template('dash/climate.html')

@app.route('/Media')
def dash_media():
    return render_template('dash/media.html')

@app.route('/Network')
def dash_network():
    return render_template('dash/network.html')
