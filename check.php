<?php

date_default_timezone_set('Europe/Moscow');

function checkTriangle($x, $y, $r) {
    return (($x <= 0) && ($y >= 0) && ($x * 2 + $r >= $y));
};

function checkRectangle($x, $y, $r) {
    return (($x >= 0) && ($y >= 0) && ($x <= $r / 2) && ($y <= $r));
};

function checkCircle($x, $y, $r) {
    return (($x <= 0) && ($y <= 0) && (pow($x, 2) + pow($y, 2) <= pow($r / 2, 2)));
};

function checkHit($x, $y, $r) {
    return checkTriangle($x, $y, $r) || checkRectangle($x, $y, $r) || checkCircle($x, $y, $r);
};


if (isset($_POST["r"]) && isset($_POST["x"]) && isset($_POST["y"])){
    $start = microtime(true);
    $x = $_POST["x"];
    $y = $_POST["y"];
    $r = $_POST["r"];
    $hit = checkHit($x, $y, $r);
    $current_time = (new DateTime())->format("Y-m-d H:i:s");
    $script_runtime = (microtime(true) - $start);

    echo json_encode(array(
        "X" => $x,
        "Y" => $y,
        "R" => $r,
        "hit" => $hit,
        "current_time" => $current_time,
        "script_runtime" => $script_runtime
    ));
}