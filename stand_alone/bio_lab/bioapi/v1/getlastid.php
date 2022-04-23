<?php




//include headers
header("Access-Control-Allow-Origin: *"); 
header("Content-type: application/json; charset: UTF-8");
header("Access-Control-Allow-Methods: GET");


//include database
include_once("../config/database.php");
//include users
include_once("../classes/material.php");


$db = new Database();

$connection = $db->connect();


$Material = new Material($connection);



if($_SERVER['REQUEST_METHOD'] === "GET") {
	
					

	$data = $Material->get_lastid();
		
						
	//check result
	if($data->num_rows > 0 ){

		// $newMat["records"] = array();
		// while($row = $data->fetch_assoc()){
		// 	array_push($newMat["records"] , array(
		// 		"id" => $row['new_num']
		// 	));
			

		// }
		$row  = $data->fetch_assoc();

		http_response_code(200); //ok
		echo json_encode(array(
		"Status" => 1,
		"id" => $row['new_num']
		));

	}
	else
	{
		http_response_code(404); //404 service not avaible
			echo json_encode(
			array(
				"Status" => 0,
				"Message" => "Failed to fetch data"
			)
		);

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