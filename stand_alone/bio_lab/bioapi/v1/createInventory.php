<?php




//include headers
header("Access-Control-Allow-Origin: *"); 
header("Content-type: application/json; charset: UTF-8");
header("Access-Control-Allow-Methods: POST");


//include database
include_once("../config/database.php");
//include users
include_once("../classes/inventory.php");




$db = new Database();

$connection = $db->connect();


$Inv = new Inventory($connection);



if($_SERVER['REQUEST_METHOD'] === "POST") {

	$data = json_decode(file_get_contents("php://input"));


		if(!empty($data->itemid) && !empty($data->userid)) {
				$Inv->itemid = $data->itemid;
				$Inv->userid = $data->userid;
				$Inv->desc = $data->desc;
				$Inv->datetimelogged = $data->datetimelogged;
			
				if($Inv->create_data()) {

					http_response_code(200); //500 service not avaible
					echo json_encode(
						array(
							"Status" => 1,
							"Message" => "Inventory Added"
						)
					);

				}
				else {
					http_response_code(404); //404 service not avaible
						echo json_encode(
						array(
							"Status" => 0,
							"Message" => "Failed to fetch data"
						)
					);
		        }
            
            
		}
		
	}

	else {
		http_response_code(500); //404 service not avaible
						echo json_encode(
						array(
							"Status" => 0,
							"Message" => "Server Error"
						)
					);
	}

?>