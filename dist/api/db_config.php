<?php
    define ('DB_USER', "root");
    define ('DB_PASSWORD', "");
    define ('DB_DATABASE', "shooter_game");
    define ('DB_HOST', "localhost");
    $connection = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE);

    if($connection->connect_error) {
        die("Connection to Database failed " . $connection->connect_error);
    }
?>