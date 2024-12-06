<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize and validate input data
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
    $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);

    // Validation checks
    if (!$name || !$email || !$phone) {
        http_response_code(400); // Bad Request
        echo json_encode(['status' => 'error', 'message' => 'Invalid input.']);
        exit;
    }

    // Email settings
    $to = "sevensquareinvestment@gmail.com"; // Replace with your email
    $subject = "New Form Submission";
    $headers = "From: " . $email . "\r\n" .
               "Reply-To: " . $email . "\r\n" .
               "Content-Type: text/plain; charset=UTF-8";

    // Email body
    $message = "You have received a new form submission:\n\n" .
               "Name: $name\n" .
               "Email: $email\n" .
               "Phone: $phone\n";
            //    return print_r($message);

    // Send email
    if (mail($to, $subject, $message, $headers)) {
        http_response_code(200); // OK
        echo json_encode(['status' => 'success', 'message' => 'Message sent successfully!']);
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(['status' => 'error', 'message' => 'Failed to send the message.']);
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
}
?>
