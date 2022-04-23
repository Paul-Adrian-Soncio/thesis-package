import React , {useState, useEffect} from 'react';
import { FlatList, Text, View ,StyleSheet , TextInput , Alert, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { globalstyles } from '../styles/global';
import globalvar, { BASE_URL } from '../styles/globalvar'
import * as SecureStore from 'expo-secure-store';

import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';


export default function additem ({navigation , route}) {
    const {itemdata , dateentry , sampletype , source, collector, loc_name} = route.params;

    const [inventorylist, setInventory] = useState([]);

    const [qrcode,setQrcode] = useState('')
    const [itemName,setItemName] = useState('')
    const [desc,setDesc] = useState('')
    const [itemloc,setitemloc] = useState('')
    const [rolestate, setRolestate] = useState('')
    var dd = {globalvar:BASE_URL}
    
    const folderName = 'DataSheetFolder';
    const fileName = 'Inventory_logs.csv';

    const [isWriteGranted, setIsWriteGranted] = useState(false);

    useEffect(() => {
        (async () => {
        const res = await MediaLibrary.requestPermissionsAsync();
        if (res.granted) {
            setIsWriteGranted(true);
        }
        })();
    }, []);
    
    const exportFile = () => {
       
        /* convert JSON to worksheet */
        const ws = XLSX.utils.json_to_sheet(inventorylist);
    
        /* build new workbook */
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
    
        /* write file */
        const wbout = XLSX.write(wb, { type: 'string', bookType: 'csv' });
        const file = FileSystem.documentDirectory + fileName;
        FileSystem.writeAsStringAsync(file, wbout).then(async (res) => {
          alert('Report Generated', 'Exported to ' + file);
          /* once write is successful move it to the media library */
          const asset = await MediaLibrary.createAssetAsync(file);
          await MediaLibrary.createAlbumAsync(folderName, asset, false);
    
        }).catch((err) => { console.log('exportFile Error', err.message); });
      };

    const getRole = () => {
        return SecureStore.getItemAsync('BIOuserrole');
    };

    
  const deletehandler = () =>
  Alert.alert(
    "Confirmation",
    "Are you sure you want to Delete",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => deleteid() }
    ]
  );

    

  const deleteid = () => {
    
    var datafiles = {
    matID: itemdata

    };


    fetch(dd.globalvar + "deletematbyid.php",{
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





   


    const pressHandler = () => {

        navigation.goBack()


    }
    


    React.useEffect(()=> {
      
        
        const inventorydata = navigation.addListener('focus', () => {
          // Screen was focused
          // Do something   
          var headers = {
    
            'Accept':'application/json',
            'Content-Type':'application.json'
        };

        var data = {
            itemid: itemdata
           
        };
        
        var InsertApiUrl =  dd.globalvar + "getinventoryid.php";
        fetch(
            InsertApiUrl,{
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)

             }
        ).then((Response)=>Response.json())
        .then((Response)=>{
            if (Response.Status == '1') {
                // console.log(Response.Data)
                setInventory(Response.Data)
                // setUser(Response.fullname)
                // setUserID(Response.userid.toString())
                // setUserRole(Response.Role)

               
            }else{
                // console.log(Response.Message)
            }
        })
            
        });
            
    
         return inventorydata;
 


    }, [navigation])

    // console.log(inventorylist)
    getRole().then(rolestate=>setRolestate(rolestate) )
    
    return (
        <View style={globalstyles.container}>

            <View style={styles.upperContainer}>
            <MaterialIcons size={80} name="qr-code-scanner" >

            </MaterialIcons>

            </View>
        
        
            <View style={styles.lowerContainer}>
                <View style={styles.formBody}>
                    { rolestate === 'Admin' ?
                     <View style={{ flexDirection: 'row' , justifyContent: 'flex-end'}}>
                          

                            <TouchableOpacity onPress={()=>navigation.navigate('edititem', {eid : itemdata , edate: dateentry , esample : sampletype , ecollector: collector , eesource : source , elocation: loc_name})} style={{marginRight: 10 }}><Text style= {{ color: '#3333'}}>Edit</Text></TouchableOpacity>
                            <TouchableOpacity style={{marginRight: 30}} onPress={()=>deletehandler()}><Text style= {{ color: '#3333'}}>Delete</Text></TouchableOpacity>
                           
                     </View> 
                     :
                     <></>
                    
                    }
                     
                        <View style={styles.Textitem}>
                            <Text style={{fontSize: 15  , fontWeight: 'bold'}}>Material Description</Text>
                            <View style={{padding: 2}}>
                            <Text style={styles.Detailstext}> <Text style={[styles.Detailstext, {fontWeight: 'bold'} ]}> ID :</Text> {itemdata}</Text>
                            <Text style={styles.Detailstext}> <Text style={[styles.Detailstext, {fontWeight: 'bold'} ]}> Date :</Text> {dateentry}</Text>
                            <Text style={styles.Detailstext}> <Text style={[styles.Detailstext, {fontWeight: 'bold' , fontSize: 12} ]}> Type of Sample :</Text> {sampletype}</Text>
                            <Text style={styles.Detailstext}> <Text style={[styles.Detailstext, {fontWeight: 'bold'} ]}> Source :</Text> {source}</Text>
                            <Text style={styles.Detailstext}> <Text style={[styles.Detailstext, {fontWeight: 'bold', fontSize: 12} ]}> Name of Collector :</Text> {collector}</Text>
                            <Text style={styles.Detailstext}> <Text style={[styles.Detailstext, {fontWeight: 'bold'} ]}> Location :</Text> {loc_name}</Text>
                            </View>
                        </View>
                      
                      
                    { rolestate === 'Admin' 
                  
                    ? 
                    <View style={styles.Textlogs}>
                    <Text style={{fontSize: 15  , fontWeight: 'bold'}}>Logs</Text>
                            <View style={{padding: 2}}>
                            <FlatList
                                data={inventorylist}
                                keyExtractor={(item) => (item.inv.toString())}
                                scrollEnabled={true}
                                renderItem={
                                    ({item}) =>  (
                                        <View  style={styles.itemlist}>
                                       
                                        <Text style={[styles.textlist ,   {flexBasis: '10%'} ]}>{item.desc}</Text>
                                        <Text style={[styles.textlist ,   {flexBasis: '55%'}]}>{item.datetimelogged}</Text>
                                        <Text style={[styles.textlist ,   {flexBasis: '35%'} ]}>{item.name}</Text>
                                        </View>

                                    )  }
                                ListHeaderComponent={() => (
                                        <View  style={styles.itemlist}>
                                       
                                        <Text style={[styles.textlist ,   {flexBasis: '10%'} ]}></Text>
                                        <Text style={[styles.textlist ,   {flexBasis: '55%'} ]}>Date</Text>
                                        <Text style={[styles.textlist ,   {flexBasis: '35%'} ]}>Name</Text>
                                        </View>

                                )}
                                
                                
                            />
                            </View>
                            <TouchableOpacity style= {styles.button2} onPress={exportFile} >
                        <Text style={{color: '#ffff' , fontSize: 18}}>
                            
                            Generate Report 
                        </Text>
                    </TouchableOpacity>
                    </View>
                    
                    :
                    <View></View>

                    }
                  



                 
                </View>
                    
            </View>
        
        </View>



    )
}

const  styles = StyleSheet.create({
    itemlist: {
        flexGrow: 1,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: '#3333',
      
        padding: 10,
        width: '100%',
        flexWrap: 'wrap'
    },
    textlist : {
        
        textAlign: 'center'
    },
    icon : {
      
        width: 160,
        height: 160
    },
    upperContainer: {
       
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        height: 90

    },
    lowerContainer: {
        flex: 4,
    
        marginBottom: 5,
        paddingBottom: 5
        // height: '100%'
    },
    formBody: {
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'flex-start',
         
        marginHorizontal: 10
    },
    Textitem: {
        borderRadius: 15,
        padding: 7,
        // backgroundColor: 'green'
        backgroundColor: '#3333'
    },
    Textlogs: {
        flex: 1,
        flexDirection: 'column',
        // backgroundColor: 'orange',
        alignContent: 'flex-end',
        justifyContent: 'space-between',
        
        padding: 7,
        // backgroundColor: 'yellow',
        height: '50%'
    },
    TextInput: {
     
        justifyContent: 'flex-end',
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
    editcmd : {
        flex: 1,
        textAlign: 'right',
        backgroundColor: 'blue'
    }
    ,
    button: {
    
        backgroundColor: '#2ECC71',
        
        borderRadius: 8,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
      
        elevation: 2, // Android
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    Detailstext: {
        fontSize: 15,
        marginVertical: 2
    }
,
button2: {
       
    borderRadius: 12,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#2ECC71',
    elevation: 2, // Android
    margin: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
}




})