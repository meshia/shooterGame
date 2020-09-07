<?php
    require "db_config.php";

    $results_array = array();
    $query = "SELECT * FROM winners ORDER BY score DESC LIMIT 5";
    $result = $connection->query($query);

    if($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            array_push($results_array, $row);
        }
    }

    echo json_encode($results_array);
    $connection->close();

?>