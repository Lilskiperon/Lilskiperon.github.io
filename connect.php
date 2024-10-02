
<?php
// Создание соединения
$dbc = mysqli_connect('sql7.freesqldatabase.com', 'sql7734356', '2gGqQrPRw4', 'sql7734356');

if (!$dbc) {
    http_response_code(500);
    header("Content-Type: application/json");
    echo json_encode(["error" => "Ошибка подключения к базе данных"]);
    exit();
}
$query="SELECT * FROM products";
$result=mysqli_query($dbc,$query); 
if (!$result) {
    http_response_code(500);
    header("Content-Type: application/json");
    echo json_encode(["error" => "Ошибка выполнения SQL-запроса"]);
    exit();
}
$products = [];

while ($row = mysqli_fetch_assoc($result)) {
    $products[] = array(
        "id" => $row["ProductID"],
        "name" => $row["Name"],
        "price" => $row["Price"],
        "imageUrl" => $row["ImageURL"],
        "description" => $row["Description"]
    );
}

mysqli_close($dbc);

http_response_code(200);
header("Content-Type: application/json");
echo json_encode($products);
error_reporting(E_ALL);
ini_set('display_errors', 1); 
?>
