<?php
    require "db_config.php";

    $name = $_POST["name"];
    $score = $_POST["score"];
    $query = "INSERT INTO winners (Name, Score) VALUES ('{$name}','{$score}')";

    if($connection->query($query)) {
        echo "Data Saved";
    }
    print_r($_POST);
?>