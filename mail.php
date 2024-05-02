<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $tel = $_POST['tel'];
    $message = $_POST['message'];
    $agree = isset($_POST['agree']) ? $_POST['agree'] : 'no';

    $to = "ваша_почта@example.com";
    $subject = "Новое сообщение от $name";
    $body = "Отправитель: $name\nEmail: $email\n\n$message";

    if (mail($to, $subject, $body)) {
        echo "Спасибо, ваше сообщение отправлено.";
    } else {
        echo "Извините, возникла проблема с отправкой вашего сообщения.";
    }
}
?>