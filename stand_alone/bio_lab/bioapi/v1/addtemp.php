<?php




//include headers
header("Access-Control-Allow-Origin: *"); 
header("Content-type: application/json; charset: UTF-8");
header("Access-Control-Allow-Methods: POST");


//include database
include_once("../config/database.php");
//include users
include_once("../classes/temp.php");




$db = new Database();

$connection = $db->connect();


$Temp = new Temp($connection);



if($_SERVER['REQUEST_METHOD'] === "POST") {

	$data = json_decode(file_get_contents("php://input"));


		if(!empty($data->temp) ) {
				$Temp->temp = $data->temp;
			



				// print_r($Users->role); die;

				if($Temp->create_data()) {

					http_response_code(200); //500 service not avaible
					echo json_encode(
						array(
							"Status" => 1,
							"Message" => "Temperature Data Added"
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