<?php
require '../config/stripe_config.php'; // Include Stripe configuration
require '../config/paypal_config.php'; // Include PayPal configuration
require '../config/mpesa_config.php'; // Include Mpesa configuration

$data = json_decode(file_get_contents('php://input'), true);

$payment_method = $data['payment_method'];
$amount = $data['amount'];

$response = ['success' => false];

if ($payment_method === 'stripe') {
    $token = $data['token'];
    try {
        \Stripe\Stripe::setApiKey(STRIPE_SECRET_KEY);
        $charge = \Stripe\Charge::create([
            'amount' => $amount * 100, // Convert amount to cents
            'currency' => 'usd',
            'description' => 'Room Payment',
            'source' => $token
        ]);
        $response['success'] = true;
    } catch (Exception $e) {
        $response['error'] = $e->getMessage();
    }
} elseif ($payment_method === 'paypal') {
    $order_id = $data['order_id'];
    // Use PayPal's API to verify payment
    // Process PayPal payment
    $response['success'] = true; // Assume successful for this example
} elseif ($payment_method === 'mpesa') {
    $phone = $data['phone'];
    // Use Mpesa API to process payment
    $response['success'] = true; // Assume successful for this example
}

header('Content-Type: application/json');
echo json_encode($response);
?>
