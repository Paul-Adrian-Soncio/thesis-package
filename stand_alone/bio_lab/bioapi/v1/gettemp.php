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


$Temp1 = new Temp($connection);



if($_SERVER['REQUEST_METHOD'] === "GET") {
	
					

	$data = $Temp1->get_all();
		
						
	//check result
	if($data->num_rows > 0 ){

		$newTemp["records"] = array();
		while($row = $data->fetch_assoc()){
			array_push($newTemp["records"] , array(
				"temp" => $row['temp'],
				"timelogged" => $row['timelogged']
			));
			

		}

		http_response_code(200); //ok
		echo json_encode(array(
		"Status" => 1,
		"Data" => $newTemp["records"]
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