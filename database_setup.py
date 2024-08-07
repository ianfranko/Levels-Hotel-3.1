import sqlite3

def create_tables():
    conn = sqlite3.connect('bookings.db')
    c = conn.cursor()

    # Create the booking table
    c.execute('''CREATE TABLE IF NOT EXISTS bookings (
                    id INTEGER PRIMARY KEY,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL,
                    phone TEXT NOT NULL,
                    check_in_date TEXT NOT NULL,
                    check_out_date TEXT NOT NULL,
                    room_type TEXT NOT NULL,
                    special_requests TEXT
                )''')

    conn.commit()
    conn.close()

if __name__ == "__main__":
    create_tables()
