<?php




//include headers
header("Access-Control-Allow-Origin: *"); 
header("Content-type: application/json; charset: UTF-8");
header("Access-Control-Allow-Methods: POST");


//include database
include_once("../config/database.php");
//include users
include_once("../classes/users.php");




$db = new Database();

$connection = $db->connect();


$Users = new Users($connection);



if($_SERVER['REQUEST_METHOD'] === "POST") {

	$data = json_decode(file_get_contents("php://input"));


		if(!empty($data->username) && !empty($data->password)) {
				$Users->username = $data->username;
				$Users->userpass = $data->password;
				$Users->fname = $data->fname;
				
				$Users->mname = $data->mname;
				$Users->lname = $data->lname;
				$Users->contactno = $data->contactno;
				$Users->email = $data->email;
				$Users->role = $data->role;
				




				// print_r($Users->role); die;

				if($Users->create_data()) {

					http_response_code(200); //500 service not avaible
					echo json_encode(
						array(
							"Status" => 1,
							"Message" => "User Added"
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