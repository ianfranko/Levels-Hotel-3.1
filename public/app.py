from flask import Flask, request, jsonify, render_template
import sqlite3

app = Flask(__name__)

# Connect to the database
def connect_db():
    return sqlite3.connect('bookings.db')

# Route for booking form
@app.route('/booking', methods=['GET', 'POST'])
def booking():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        phone = request.form['phone']
        check_in_date = request.form['check_in_date']
        check_out_date = request.form['check_out_date']
        room_type = request.form['room_type']
        special_requests = request.form.get('special_requests', '')

        conn = connect_db()
        c = conn.cursor()
        c.execute("INSERT INTO bookings (name, email, phone, check_in_date, check_out_date, room_type, special_requests) VALUES (?, ?, ?, ?, ?, ?, ?)",
                  (name, email, phone, check_in_date, check_out_date, room_type, special_requests))
        conn.commit()
        conn.close()

        return jsonify({'status': 'Booking successful'})

    return render_template('booking.html')

# Route to view all bookings
@app.route('/bookings')
def view_bookings():
    conn = connect_db()
    c = conn.cursor()
    c.execute("SELECT * FROM bookings")
    bookings = c.fetchall()
    conn.close()
    return jsonify(bookings)

if __name__ == '__main__':
    app.run(debug=True)
@app.route('/gallery')
def gallery():
    return render_template('gallery.html')
