<?php

ini_set('display_errors', 1);


//include headers
header("Access-Control-Allow-Origin: *"); 
header("Content-type: application/json; charset: UTF-8");
header("Access-Control-Allow-Methods: POST");


//include database
include_once("../config/database.php");
//include users
include_once("../classes/material.php");




$db = new Database();

$connection = $db->connect();


$Material = new Material($connection);



if($_SERVER['REQUEST_METHOD'] === "POST") {

	$data = json_decode(file_get_contents("php://input"));


		if(!empty($data->matID) ) {
				$Material->matID = $data->matID;
				$Material->dateentry = $data->dateentry;
				$Material->sampletype = $data->sampletype;
				$Material->source = $data->source;
				$Material->collector = $data->collector;
				
				$data = $Material->update_materials();
			
				if ($Material->update_materials()) {

					http_response_code(200); //500 service not avaible
					echo json_encode(
						array(
							"Status" => 1,
							"Message" => "Materials Data Updated"
						)
					);

				}
				else {
					
					http_response_code(200); //404 service not avaible
					// echo $Material->$php_errormsg;
					echo json_encode(
						array(
							
							"Status" => 1,
							"Message" => "Materials Data Updated"
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