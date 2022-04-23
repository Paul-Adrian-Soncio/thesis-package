import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, TextInput, Touchable, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { globalstyles } from '../styles/global';
import globalvar, { BASE_URL } from '../styles/globalvar';
import * as SecureStore from 'expo-secure-store';

 
export default function App({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [qr, setQR] = useState('');
  const [qr1, setQr1] = useState(null);
  const [useridstate, setUserid] = useState('')

  const [matstatus, setmatstatus] = useState(false)
  
  var ddd = {globalvar:BASE_URL};

  const getID = () => {
    return SecureStore.getItemAsync('BIOuserid');
  };

  useEffect(()=> {

    if(qr1) {

        var headers = {

          'Accept':'application/json',
          'Content-Type':'application.json'
      };

      var mat = {
        itemid: qr1,
          
      };
      fetch(ddd.globalvar + "getlastinve.php",
      {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(mat)
      }

      ).then(
        (data2) => {
                    
          data2.json().then((result)=> {
            // setMaterials(result.Data)
            // changestatus(result.desc)
            // setmatstatus(result.desc)
            if(result.desc == 'IN')
            {
              setmatstatus(true)
            }else{
              setmatstatus(false)
            }
          })
          .catch((error) => {
              console.log(result.Status);
          });
          }

      )
      }
    // console.log(materials)


  }, [qr1])


  useEffect(()=> {

    if(qr1) {

        var headers = {

          'Accept':'application/json',
          'Content-Type':'application.json'
      };

      var mat = {
          matid: qr1,
          
      };
      fetch(ddd.globalvar + "getmaterialid.php",
      {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(mat)
      }

      ).then(
        (data2) => {
                    
          data2.json().then((result)=> {
            setMaterials(result.Data)
           

            
          })
          .catch((error) => {
              console.log(result.Status);
          });
          }

      )
      }
    // console.log(materials)


  }, [qr1])


  useEffect(()=> { 


  },[matstatus])



  getID().then(useridstate=>setUserid(useridstate) )


  
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  var dd = ''
  
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    dd = `${data}`
    setQR(dd)
    setQr1(dd)
    // getdata(dd)
   
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const loadinalert = () =>
  Alert.alert(
    "Confirmation",
    "Are you sure you want to Load IN",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => insertloadin("IN") }
    ]
  );

  const loadoutalert = () =>
  Alert.alert(
    "Confirmation",
    "Are you sure you want to Load OUT",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => insertloadin("OUT") }
    ]
  );

  

  const insertloadin = (des) => {
    
			var date = new Date();
			var dd = date.toISOString().split('T')[0]+' '+date.toTimeString().split(' ')[0];

    var datafiles = {
      itemid: qr1,
      userid: useridstate,
      desc: des,
      datetimelogged: dd
      
      };


      fetch(ddd.globalvar + "createInventory.php",{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(datafiles)
    }).then(response => {
        // console.log(datafiles)
          return response.json();
          }).then(data1 => {


          if (data1.Status === 1) 

          {
            
            navigation.goBack()
          }
          else{
            console.log('wala')
          }

          })
  }
  

  return (
    <View style={globalstyles.container}>
      {!scanned  && 
        <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      }

      <View  style={styles.containerinside}>
        
      {scanned &&  <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
     
     
      </View>

      {scanned && 
      <View style = {styles.containerBox}>
           <View style = {styles.items}>
                <Text style={{ fontWeight: 'bold' , color: '#2ECC71'}}>QRCODE:</Text>
                  <Text style={styles.TextInput} >{materials?.[0]?.matid}</Text>
                </View>
                <View style = {styles.items}>
                <Text style={{fontWeight: 'bold' , color: '#2ECC71'}}>Sample:</Text>
                    <Text style={styles.TextInput} >{materials?.[0]?.sampletype}</Text>
                </View>
                <View style = {styles.items}>
                <Text  style={{ fontWeight: 'bold' , color: '#2ECC71' }}>Date:</Text>
                    <Text style={styles.TextInput} >{materials?.[0]?.dateentry} </Text>
                </View>
                <View style = {styles.items}>
                <Text  style={{ fontWeight: 'bold' , color: '#2ECC71' }}>Source:</Text>
                    <Text style={styles.TextInput}> {materials?.[0]?.source} </Text>
                </View>
                <View style = {styles.items}>
                <Text  style={{ fontWeight: 'bold' , color: '#2ECC71' }}>Collector:</Text>
                    <Text style={styles.TextInput}> {materials?.[0]?.collector}</Text>
                </View>
                <View style = {styles.items}>
                <Text  style={{ fontWeight: 'bold' , color: '#2ECC71' }}>Location:</Text>
                    <Text style={styles.TextInput}> {materials?.[0]?.loc_name} </Text>
                </View>
           <View style={styles.bottomCointaner} >
           {matstatus == false
            ?
           <TouchableOpacity style={styles.button} onPress = {()=> loadinalert()} ><Text style={{color : '#fff'}}>LOAD IN</Text></TouchableOpacity>
           :
           <TouchableOpacity style={styles.button}  onPress = {()=> loadoutalert()} ><Text style={{color : '#fff'}}>LOAD OUT</Text></TouchableOpacity>
            }
           </View>
            
           

         
      
      
      </View>
      }
    
    
    
    
    </View>
  );
}

const styles = StyleSheet.create({
    
    containerinside : {
        
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: 20
        

    },
    bottomCointaner: {
        flex: 1,
     
        justifyContent: 'flex-end',
        width: '100%',
     
    },
    items : {
        
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
       

    },
    textstyle: {
        
    },
    containerBox: {
        margin: 5,
        padding: 10,
    
        // justifyContent: 'center',
        flex: 2,
        alignItems: 'center',
       

    },  TextInput: {
     
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 8,
        marginVertical: 5,
        borderRadius: 6,
        fontSize: 15,
        borderRadius: 8,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 2, // Android
        backgroundColor: '#FFFF',
      
    },
    button: {
    
        backgroundColor: '#2ECC71',
        borderRadius: 8,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        marginVertical: 5,
        elevation: 2, // Android
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        
    }




    
        
}); 