<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Page</title>
    <link rel="stylesheet" href="/public/css/styles.css"> <!-- Link to your CSS -->
    <script src="https://js.stripe.com/v3/"></script> <!-- Stripe.js -->
    <script src="https://www.paypal.com/sdk/js?client-id=your_paypal_client_id"></script> <!-- PayPal SDK -->
</head>
<body>
    <div class="payment-container">
        <h1>Complete Your Payment</h1>

        <!-- Form to capture payment information -->
        <form id="payment-form">
            <div class="form-group">
                <label for="amount">Amount to Pay:</label>
                <input type="text" id="amount" name="amount" value="1000" readonly>
            </div>

            <div class="form-group">
                <label for="payment-method">Choose Payment Method:</label>
                <select id="payment-method" name="payment_method" required>
                    <option value="stripe">Credit/Debit Card (Stripe)</option>
                    <option value="paypal">PayPal</option>
                    <option value="mpesa">Mpesa</option>
                </select>
            </div>

            <!-- Stripe Payment Form -->
            <div id="stripe-container" class="payment-method-container">
                <div id="card-element">
                    <!-- A Stripe Element will be inserted here. -->
                </div>
                <button type="button" id="stripe-button">Pay with Stripe</button>
            </div>

            <!-- PayPal Payment Button -->
            <div id="paypal-container" class="payment-method-container">
                <div id="paypal-button-container"></div>
            </div>

            <!-- Mpesa Payment Form -->
            <div id="mpesa-container" class="payment-method-container">
                <label for="mpesa-phone">Mpesa Phone Number:</label>
                <input type="text" id="mpesa-phone" name="mpesa_phone" required>
                <button type="button" id="mpesa-button">Pay with Mpesa</button>
            </div>
        </form>
    </div>

    <script src="/public/js/payment.js"></script> <!-- Link to your JavaScript for payment handling -->
</body>
</html>
