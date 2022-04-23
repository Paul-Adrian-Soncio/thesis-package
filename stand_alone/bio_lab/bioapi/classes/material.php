<?php

class Material{


public $matID;
public $dateentry;
public $sampletype;
public $source;
public $collector;
public $location;
public $userid;
public $timelogged;


private $conn;
private $table_name;

public function  __construct($db){
			$this->conn = $db;
			$this->table_name = "tblmaterials";

}

	

    //INSERT materials
	public function create_data(){

        $query = 'INSERT INTO '. $this->table_name.' SET dateentry = ? , sampletype= ? , source = ? , collector = ? , location = ? , userid = ?';

        // preapre sql
        $obj = $this->conn->prepare($query);




        // //binding parameterrs with prepare statement
        $obj->bind_param("sssssi" ,  $this->dateentry , $this->sampletype ,  $this->source ,   $this->collector , $this->location ,  $this->userid );



        if($obj->execute()) {

            return true;
        }
        return false;
	
    }  

    
    public function get_lastid() {
        $sql_query = 'CALL procGetLastID()';
        
        $std_obj = $this->conn->prepare($sql_query);


        $std_obj->execute();


        return $std_obj->get_result();
        
        
        // $data  = $std_obj->get_result();
        // return $data->fetch_assoc();
    }

    
    public function deletebyid() {
        $sql_query = 'delete from tblmaterials where matID = ?';
        
        $std_obj = $this->conn->prepare($sql_query);

        $std_obj->bind_param("i",  $this->matID  );
        $std_obj->execute();


        return $std_obj->get_result();
        
        
        // $data  = $std_obj->get_result();
        // return $data->fetch_assoc();
    }


    
    public function get_all() {
        $sql_query = "SELECT matID, dateentry, sampletype, source, collector , loc_name  FROM tblmaterials inner join tbl_location on tbl_location.locid = tblmaterials.location" ;
        
        $std_obj = $this->conn->prepare($sql_query);


        $std_obj->execute();


        return $std_obj->get_result();
      
    }
    public function get_all_byid() {
        $sql_query = "SELECT matID, dateentry, sampletype, source, collector , loc_name  FROM tblmaterials inner join tbl_location on tbl_location.locid = tblmaterials.location where matID = ?" ;
        
        $std_obj = $this->conn->prepare($sql_query);

        $std_obj->bind_param("i",  $this->matID  );

        $std_obj->execute();


        return $std_obj->get_result();
      
    }


    public function update_materials() {
        $sql_query = "Update tblmaterials SET dateentry= ? , sampletype = ?, source = ?, collector = ? where matID = ?" ;
        
        $std_obj = $this->conn->prepare($sql_query);

        $std_obj->bind_param("ssssi",   $this->dateentry ,  $this->sampletype ,  $this->source , $this->collector ,   $this->matID  );

        $status = $std_obj->execute() or die ($std_obj->error);

        

        return $std_obj->get_result();
    //  print_r($std_obj->error);
    }



}
?>