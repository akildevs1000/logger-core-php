<?php
class Database
{

    public $connection;

    public function __construct()
    {
        $json = json_decode(file_get_contents("database.json"), true);

        $server_name = $json["server_name"]; // DESKTOP-F729IDL\SQLEXPRESS01
        $database = $json["database"]; // UNIS
        $user_name = $json["user_name"]; // francis
        $password = $json["password"]; // 1@Ab56ab56

        $db = new PDO("odbc:Driver={SQL Server};Server={$server_name};Database=$database", $user_name, $password, [
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
        $db->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        $this->connection = $db;
    }

    public function query($query)
    {
        $statement = $this->connection->prepare($query);

        $statement->execute();

        return $statement;
    }
}
