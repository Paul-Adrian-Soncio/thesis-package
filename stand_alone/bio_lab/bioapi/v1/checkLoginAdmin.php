<?php

ini_set("diplay_errors", 1);


//include headers
// header("Access-Control-Allow-Origin: *"); 

header("Content-type: application/json; charset: UTF-8");
header("Access-Control-Allow-Methods: POST");


//include database
include_once("../config/database.php");
//include Annoucement
include_once("../classes/users.php");




$db = new Database();

$connection = $db->connect();


$Users = new Users($connection);



if($_SERVER['REQUEST_METHOD'] === "POST") {

	$data = json_decode(file_get_contents("php://input"));


		if(!empty($data->username) && !empty($data->password)   )    {

				$Users->username = $data->username;
				$Users->userpass = $data->password;
				

				$userdata = $Users->check_user_login_admin();

				if(!empty($userdata)) {
					//verified
					


					http_response_code(200); //200 means ok
					echo json_encode(
					array(
					"Status" => 1,
					"Role" => $userdata["role"],
					"User" => $userdata["username"],
					"userid" => $userdata["userid"],
					"fullname" => $userdata["fname"],
					"Message" => "Log in successful"
					
				));

				}else {
					http_response_code(404); //500 internal server error
					echo json_encode(
					array(
					"Status" => 0,
					"Message" => "Invalid Credentials"
				));
		        }
		}else {
			http_response_code(404); //500 internal server error
			echo json_encode(
				array(
					"Status" => 0,
					"Message" => "Values Missing"
				)
			);
		}	
}
else {
	http_response_code(500); //500 internal server error
	echo json_encode(
		array(
			"Status" => 0,
			"Message" => "Server Error"
		)
	);
	}

?>