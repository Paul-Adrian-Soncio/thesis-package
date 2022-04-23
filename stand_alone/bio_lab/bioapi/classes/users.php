<?php

class Users{


public $userid;
public $username;
public $userpass;
public $fname;
public $mname;
public $lname;
public $contactno;
public $email;
public $role;




private $conn;
private $table_name;

public function  __construct($db){
			$this->conn = $db;
			$this->table_name = "tblusers";

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

    public function check_user_login() {
       
       
       
        $query = 'SELECT * FROM ' .$this->table_name. ' where username = ? and userpass = ?';
        $obj = $this->conn->prepare($query);

        $this->userpass = md5($this->userpass);
        
       

        $obj->bind_param("ss" , $this->username, $this->userpass);



        if($obj->execute()){

            $data = $obj->get_result();
            return $data->fetch_assoc();
            
            
        }

        return array();
        


    }
    public function check_user_login_admin() {
       
       
       
        $query = 'SELECT * FROM ' .$this->table_name. ' where username = ? and userpass = ? and role = "Admin"';
        $obj = $this->conn->prepare($query);

        $this->userpass = md5($this->userpass);
        
       

        $obj->bind_param("ss" , $this->username, $this->userpass);



        if($obj->execute()){

            $data = $obj->get_result();
            return $data->fetch_assoc();
            
            
        }

        return array();
        


    }

    public function check_userbyID() {
       
       
        
        $query = 'SELECT * FROM ' .$this->table_name. ' where empid = ?';
        $obj = $this->conn->prepare($query);

        

        $obj->bind_param("i" , $this->empid);



        if($obj->execute()){

            $data = $obj->get_result();
            return $data->fetch_assoc();
            
            
        }

        return array();
        


    }



    










}
?>