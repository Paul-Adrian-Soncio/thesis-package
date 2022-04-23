

<?php


class Database{

//variable declaration
	private $hostname;
	private $dbname;
	private $username;
	private $password;
	private $conn;

	public function connect() {

        $this->hostname = "localhost";
		$this->dbname = "bio_db";
		$this->username = "root";
		$this->password = "123";

        // echo $this->hostname;
        
        
		$this->conn = new mysqli($this->hostname,$this->username,$this->password,$this->dbname );

		if($this->conn->connect_errno) {

			print_r($this->conn->maxdb_connect_error);

			exit;
		}else
		{

			// print_r($this->conn);
				// echo "Connection established.";
			return $this->conn;
			

		}
	}



}



$db = new Database();


$db->connect();





?>

