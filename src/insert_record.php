<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $db = new Database();

    $data = json_decode(file_get_contents("php://input"));

    $dateTimeParsed = strtotime($data->LogTime);

    $data = [
        "C_Date" => "'" . date('dmY', $dateTimeParsed) . "'",
        "C_Time" => "'" . date('His', $dateTimeParsed) . "'",
        "L_TID" => "001",
        "L_UID" => $data->UserID,
        "L_Mode" => date('Y-m-d H:i:s', $dateTimeParsed) < date('Y-m-d 15:00:00') ? '1' : '2'
    ];

    $columns = implode(',', array_keys($data));
    $values = implode(',', array_values($data));

    try {
        $db->query("INSERT INTO tEnter ($columns) VALUES ($values)");
    } catch (\Throwable $th) {
        throw $th;
    }

    $fp = fopen('logs.csv', 'a');
    fputcsv($fp, $data);
    fclose($fp);

    http_response_code(200);

    $string = str_replace("'", "", $values);

    $response = ["status" => true, "message" => "Record added.", "total_records" => getCount($db, "tEnter"), "data" => $string];

    // $fp = fopen('debug.csv', 'a');
    // fputcsv($fp, $response);
    // fclose($fp);

    echo json_encode($response);
}

function getCount($db, $table)
{
    return $db->query("select count(*) from $table")->fetchColumn();
}

function getAll($db, $table, $columns = "*")
{
    // $sql = $db->query("select from tEnter");
    return $db->query("select $columns from $table")->fetchAll();
}
