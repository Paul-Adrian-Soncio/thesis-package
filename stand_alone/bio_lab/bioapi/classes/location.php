<?php

class Location{



private $conn;
private $table_name;

public function  __construct($db){
			$this->conn = $db;
			$this->table_name = "tbl_location";

}

	

    //INSERT EMPLOYEES
	public function create_data(){

        $query = 'INSERT INTO '. $this->table_name.' SET username = ? , userpass = ? , fname = ?, mname = ? , lname = ?, contactno = ?,email = ?, role = ? ';

        // preapre sql
        $obj = $this->conn->prepare($query);


        // sanitize variables
        $this->username = htmlspecialchars(strip_tags($this->username));
        $this->userpass = md5(htmlspecialchars(strip_tags($this->userpass)));
        $this->fname = htmlspecialchars(strip_tags($this->fname));
        $this->mname = htmlspecialchars(strip_tags($this->mname));
        $this->lname = htmlspecialchars(strip_tags($this->lname));
        $this->contactno = htmlspecialchars(strip_tags($this->contactno));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->role = htmlspecialchars(strip_tags($this->role));


        // //binding parameterrs with prepare statement
        $obj->bind_param("ssssssss" ,  $this->username ,  $this->userpass, $this->fname ,  $this->mname ,  $this->lname, $this->contactno ,  $this->email , $this->role );



        if($obj->execute()) {

            return true;
        }
        return false;
	
    }  

    public function check_locations() {
       
       
       
        $query = 'SELECT locid, loc_name , if(location is null , 0 , location) as loc FROM tbl_location left join tblmaterials on locid = tblmaterials.location';
        // $query = 'SELECT * FROM ' .$this->table_name. ' where username = ? and userpass = ?';
        $obj = $this->conn->prepare($query);
        if($obj->execute()){

            $data = $obj->get_result();
            return $data->fetch_assoc();           
            
        }

        return array();
    }


    
    public function get_all() {
        $sql_query = "SELECT locid, loc_name , if(location is null , 0 , location) as loc FROM tbl_location left join tblmaterials on locid = tblmaterials.location where location is null" ;
        
        $std_obj = $this->conn->prepare($sql_query);


        $std_obj->execute();


        return $std_obj->get_result();
        
        
        // $data  = $std_obj->get_result();
        // return $data->fetch_assoc();
    }
    
    public function get_all1() {
        $sql_query = "SELECT locid, loc_name , if(location is null , 'white' , '#68AF69') as loc FROM tbl_location left join tblmaterials on locid = tblmaterials.location" ;
        
        $std_obj = $this->conn->prepare($sql_query);


        $std_obj->execute();


        return $std_obj->get_result();
        
        
        // $data  = $std_obj->get_result();
        // return $data->fetch_assoc();
    }


}
?>