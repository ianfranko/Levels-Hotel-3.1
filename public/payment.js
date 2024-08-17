document.addEventListener('DOMContentLoaded', function () {
    var stripe = Stripe('your_stripe_public_key'); // Replace with your Stripe public key
    var elements = stripe.elements();
    var cardElement = elements.create('card');
    cardElement.mount('#card-element');

    document.getElementById('payment-method').addEventListener('change', function (e) {
        var method = e.target.value;
        document.querySelectorAll('.payment-method-container').forEach(function (container) {
            container.style.display = 'none';
        });

        if (method === 'stripe') {
            document.getElementById('stripe-container').style.display = 'block';
        } else if (method === 'paypal') {
            document.getElementById('paypal-container').style.display = 'block';
            setupPayPal();
        } else if (method === 'mpesa') {
            document.getElementById('mpesa-container').style.display = 'block';
        }
    });

    // Handle Stripe payment
    document.getElementById('stripe-button').addEventListener('click', function () {
        stripe.createToken(cardElement).then(function (result) {
            if (result.error) {
                alert(result.error.message);
            } else {
                processStripePayment(result.token);
            }
        });
    });

    function processStripePayment(token) {
        // Send token to server for processing
        fetch('/app/controllers/PaymentController.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                payment_method: 'stripe',
                token: token.id,
                amount: document.getElementById('amount').value
            })
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            if (data.success) {
                alert('Payment successful');
                window.location.href = '/success.php';
            } else {
                alert('Payment failed');
            }
        });
    }

    // Handle PayPal payment
    function setupPayPal() {
        paypal.Buttons({
            createOrder: function (data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: document.getElementById('amount').value
                        }
                    }]
                });
            },
            onApprove: function (data, actions) {
                return actions.order.capture().then(function (details) {
                    processPayPalPayment(details);
                });
            }
        }).render('#paypal-button-container');
    }

    function processPayPalPayment(details) {
        fetch('/app/controllers/PaymentController.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                payment_method: 'paypal',
                order_id: details.id,
                amount: document.getElementById('amount').value
            })
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            if (data.success) {
                alert('Payment successful');
                window.location.href = '/success.php';
            } else {
                alert('Payment failed');
            }
        });
    }

    // Handle Mpesa payment
    document.getElementById('mpesa-button').addEventListener('click', function () {
        var phone = document.getElementById('mpesa-phone').value;

        fetch('/app/controllers/PaymentController.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                payment_method: 'mpesa',
                phone: phone,
                amount: document.getElementById('amount').value
            })
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            if (data.success) {
                alert('Payment successful');
                window.location.href = '/success.php';
            } else {
                alert('Payment failed');
            }
        });
    });
});
