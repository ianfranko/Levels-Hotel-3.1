// app.js (Node.js/Express example)
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/book', (req, res) => {
    const { roomType, checkIn, checkOut, guests, name, email, phone } = req.body;

    // Save booking to database (this is just a placeholder)
    // e.g., db.saveBooking({ roomType, checkIn, checkOut, guests, name, email, phone });

    res.send({ status: 'success', message: 'Booking confirmed!' });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
