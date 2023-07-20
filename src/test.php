<?php


$array = array("This is a string with 'single quotes'", "Another string with 'quotes'");

$data = implode(",",$array);
$string = str_replace("'", "", $data);

print_r($string);
die;

$data = [
    "C_Date" => "'" . date('dmY') . "'",
    "C_Time" => "'" . date('His') . "'",
    "L_TID" => "001",
    "L_UID" => 5656,
    "L_Mode" => date('Y-m-d H:i:s') < date('Y-m-d 15:00:00') ? '1' : '2'
];

str_replace($data, "'", "", count($data));

echo json_encode($data);
