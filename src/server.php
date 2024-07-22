<?php
// src/server.php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Получение данных из запроса
    $name = isset($_POST['name']) ? $_POST['name'] : 'Имя не указано';
    $email = isset($_POST['email']) ? $_POST['email'] : 'Email не указан';

    // Формирование ответа
    $response = [
        'status' => 'success',
        'message' => 'Данные успешно получены',
        'data' => [
            'name' => $name,
            'email' => $email
        ]
    ];

    // Возврат ответа в формате JSON
    echo json_encode($response);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Метод запроса не поддерживается'
    ]);
}