<?php

class Inventory{


public $inv;
public $itemid;
public $userid;
public $desc;
public $datetimelogged;


private $conn;
private $table_name;

public function  __construct($db){
			$this->conn = $db;
			$this->table_name = "tblinventorydata";

}

	

    //INSERT inventory
	public function create_data(){
        $query = 'INSERT INTO '. $this->table_name.' SET itemid = ? , userid= ? , `desc` = ? , datetimelogged = ? ';
        // preapre sql
        $obj = $this->conn->prepare($query);
        // //binding parameterrs with prepare statement
        $obj->bind_param("iiss" ,  $this->itemid , $this->userid ,  $this->desc ,   $this->datetimelogged  );



        if($obj->execute()) {

            return true;
        }
        return false;
	
    }  

    
    public function get_all() {
        $sql_query = "SELECT inv, sampletype,`desc`,datetimelogged ,concat(lname,', ',fname) as name FROM tblinventorydata inner join tblmaterials on matid = itemid inner join tblusers on tblmaterials.userid = tblusers.userid" ;
        
        $std_obj = $this->conn->prepare($sql_query);


        $std_obj->execute();


        return $std_obj->get_result();
        
        
        // $data  = $std_obj->get_result();
        // return $data->fetch_assoc();
    }
    public function get_all_byid() {
        
      
        $sql_query = "SELECT inv, itemid, sampletype,`desc`,datetimelogged ,concat(lname,', ',fname) as name FROM tblinventorydata inner join tblmaterials on matid = itemid inner join tblusers on tblinventorydata.userid = tblusers.userid where itemid = ? " ;
        
        $std_obj = $this->conn->prepare($sql_query);
        

        $std_obj->bind_param("i",  $this->itemid  );
        // $obj->bind_param("sssssi" ,  $this->dateentry , $this->sampletype ,  $this->source ,   $this->collector , $this->location ,  $this->userid );

        // print_r($obj) ; die;
        $std_obj->execute();


        return $std_obj->get_result();
        
        
        // $data  = $std_obj->get_result();
        // return $data->fetch_assoc();
    }

    
    public function getlastinve() {
        $sql_query = 'select inv, `desc` from tblinventorydata where itemid = ? order by inv desc limit 1';
        
        $std_obj = $this->conn->prepare($sql_query);

        $std_obj->bind_param("i",  $this->itemid  );
        $std_obj->execute();


        return $std_obj->get_result();
        
        
        // $data  = $std_obj->get_result();
        // return $data->fetch_assoc();
    }
    



}
?>