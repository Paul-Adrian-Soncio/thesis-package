<?php

class Temp{


public $tmpid;
public $temp;
public $ddate;


private $conn;
private $table_name;

public function  __construct($db){
			$this->conn = $db;
			$this->table_name = "tbltemperature";

}

	

    //INSERT EMPLOYEES
	public function create_data(){

        $query = 'INSERT INTO '. $this->table_name.' SET temp = ?';

        // preapre sql
        $obj = $this->conn->prepare($query);




        // //binding parameterrs with prepare statement
        $obj->bind_param("d" ,  $this->temp );



        if($obj->execute()) {

            return true;
        }
        return false;
	
    }  

    
    public function get_all() {
        $sql_query = "SELECT * FROM tbltemperature  " ;
        
        $std_obj = $this->conn->prepare($sql_query);


        $std_obj->execute();


        return $std_obj->get_result();
        
        
        // $data  = $std_obj->get_result();
        // return $data->fetch_assoc();
    }

     
    public function get_temp_date() {
        $sql_query = " SELECT temp as  y, timelogged as x, tmpid FROM tbltemperature where date(timelogged) = ?" ;
        
        $std_obj = $this->conn->prepare($sql_query);

        $std_obj->bind_param("s" ,  $this->ddate  );



        $std_obj->execute();


        return $std_obj->get_result();
        
        
        
    }




    










}
?>