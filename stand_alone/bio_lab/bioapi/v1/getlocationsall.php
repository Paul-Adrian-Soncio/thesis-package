<?php




//include headers
header("Access-Control-Allow-Origin: *"); 
header("Content-type: application/json; charset: UTF-8");
header("Access-Control-Allow-Methods: GET");


//include database
include_once("../config/database.php");
//include users
include_once("../classes/location.php");


$db = new Database();

$connection = $db->connect();


$Loc = new Location($connection);



if($_SERVER['REQUEST_METHOD'] === "GET") {					
	$data = $Loc->get_all1();						
	//check result
	if($data->num_rows > 0 ){

		$newLoc["records"] = array();
		while($row = $data->fetch_assoc()){
			array_push($newLoc["records"] , array(
				"locid" => $row['locid'],
				"loc_name" => $row['loc_name'],
				"loc" => $row['loc']
			));
			

		}

		http_response_code(200); //ok
		echo json_encode(array(
		"Status" => 1,
		"Data" => $newLoc["records"]
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