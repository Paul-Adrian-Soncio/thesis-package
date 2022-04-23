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


$Inv = new Temp($connection);



if($_SERVER['REQUEST_METHOD'] === "POST") {		
	$data2 = json_decode(file_get_contents("php://input"));
	$Inv->ddate = $data2->ddate;

	$data = $Inv->get_temp_date();	

	//check result
	if($data->num_rows > 0 ){

		$newInv["records"] = array();
		while($row = $data->fetch_assoc()){
			array_push($newInv["records"] , array(
				"y" => $row['y'],
				"x" => $row['x'],
				"tmpid" => $row['tmpid']
			));
			

		}

		http_response_code(200); //ok
		echo json_encode(array(
		"Status" => 1,
		"Data" => $newInv["records"]
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