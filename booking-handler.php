<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Check if request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get POST data
$input = json_decode(file_get_contents('php://input'), true);

// If JSON decode fails, try $_POST
if (!$input) {
    $input = $_POST;
}

// Validate required fields
$required_fields = ['name', 'email', 'service'];
$errors = [];

foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        $errors[] = ucfirst($field) . ' is required';
    }
}

// Validate email format
if (!empty($input['email']) && !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Invalid email format';
}

// If there are validation errors, return them
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['errors' => $errors]);
    exit;
}

// Sanitize input data
$name = htmlspecialchars(trim($input['name']));
$email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
$phone = isset($input['phone']) ? htmlspecialchars(trim($input['phone'])) : '';
$service = htmlspecialchars(trim($input['service']));
$date = isset($input['date']) ? htmlspecialchars(trim($input['date'])) : '';
$message = isset($input['message']) ? htmlspecialchars(trim($input['message'])) : '';

// Create booking data array
$booking_data = [
    'name' => $name,
    'email' => $email,
    'phone' => $phone,
    'service' => $service,
    'preferred_date' => $date,
    'message' => $message,
    'submission_time' => date('Y-m-d H:i:s'),
    'ip_address' => $_SERVER['REMOTE_ADDR']
];

// Save to file (in production, save to database)
$bookings_file = 'bookings.json';
$bookings = [];

// Read existing bookings
if (file_exists($bookings_file)) {
    $existing_data = file_get_contents($bookings_file);
    $bookings = json_decode($existing_data, true) ?: [];
}

// Add new booking
$bookings[] = $booking_data;

// Save updated bookings
if (file_put_contents($bookings_file, json_encode($bookings, JSON_PRETTY_PRINT))) {
    // Send email notification (configure your email settings)
    $to = 'info@soundwavestudios.com'; // Studio email
    $subject = 'New Studio Booking Request';
    $email_body = "
    New booking request received:
    
    Name: $name
    Email: $email
    Phone: $phone
    Service: $service
    Preferred Date: $date
    Message: $message
    
    Submitted on: " . date('Y-m-d H:i:s') . "
    ";
    
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Uncomment to send email (make sure your server supports mail())
    // mail($to, $subject, $email_body, $headers);
    
    // Send confirmation email to client
    $client_subject = 'Booking Request Received - SoundWave Studios';
    $client_body = "
    Dear $name,
    
    Thank you for your booking request! We have received your inquiry for our $service service.
    
    We will review your request and contact you within 24 hours to confirm your session details.
    
    Booking Details:
    - Service: $service
    - Preferred Date: $date
    - Message: $message
    
    If you have any urgent questions, please call us at (615) 555-0123.
    
    Best regards,
    SoundWave Studios Team
    ";
    
    $client_headers = "From: info@soundwavestudios.com\r\n";
    $client_headers .= "Reply-To: info@soundwavestudios.com\r\n";
    $client_headers .= "X-Mailer: PHP/" . phpversion();
    
    // Uncomment to send confirmation email
    // mail($email, $client_subject, $client_body, $client_headers);
    
    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'Booking request submitted successfully! We will contact you within 24 hours.',
        'booking_id' => count($bookings)
    ]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save booking. Please try again.']);
}

// Log the booking attempt
error_log("New booking request: $name ($email) for $service service");
?>
