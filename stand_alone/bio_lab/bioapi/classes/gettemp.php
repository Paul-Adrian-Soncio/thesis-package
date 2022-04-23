<?php




//include headers
header("Access-Control-Allow-Origin: *"); 
header("Content-type: application/json; charset: UTF-8");
header("Access-Control-Allow-Methods: GET");

//include database
include_once("../config/database.php");
//include users
include_once("../classes/temp.php");




$db = new Database();

$connection = $db->connect();


$Temp = new Temp($connection);



if($_SERVER['REQUEST_METHOD'] === "GET") {

	

            
		
		
	}

	else {
		http_response_code(500); //404 service not avaible
						echo json_encode(
						array(
							"Status" => 0,
							"Message" => "ss Error"
						)
					);
	}

?>