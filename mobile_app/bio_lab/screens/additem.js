import React , {useState, useEffect} from 'react';
import { Text, View ,StyleSheet , TextInput ,  TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { globalstyles } from '../styles/global';
import globalvar, { BASE_URL } from '../styles/globalvar'



export default function additem ({navigation}) {
    
    const [qrcode,setQrcode] = useState('')
    const [itemName,setItemName] = useState('')
    const [desc,setDesc] = useState('')
    const [itemloc,setitemloc] = useState('')



    var dd = {globalvar:BASE_URL}


    const pressHandler = () => {

        navigation.goBack()


    }
    const InsertRecord = () => {

        var qrcode1 = qrcode;
        var itemName1 = itemName;
        var desc1 = desc;
        var itemloc1 = itemloc;




        if( qrcode1.length==0 || itemName1.length==0 )
        {
            alert('Require');
        }
        else
        {
           var InsertApiUrl = dd.globalvar + 'insertitem.php';

            var headers = {

                'Accept':'application/json',
                'Content-Type':'application.json'
            };

            var data = {
                qrcode: qrcode1,
                itemName: itemName1,
                desc: desc1,
                itemloc: itemloc1
                
            };
            fetch(
                InsertApiUrl,{
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(data)

                }
            )
            .then((Response)=>Response.json())
            .then((Response)=>
                {
                 
                    if (Response[0].Valid == '1')
                    {
                        
                        navigation.navigate('inventory')                }
                    else
                    {
                        alert("INCORRECT");
                    }

                }
            ).catch((error)=>{
                alert('Error fetch');
            })

        }



    }

    return (
        <View style={globalstyles.container}>

            <View style={styles.upperContainer}>
            <MaterialIcons size={80} name="qr-code-scanner" >

            </MaterialIcons>

            </View>
        
        
            <View style={styles.lowerContainer}>
                <View style={styles.formBody}>
                  <View style={styles.Textitem}>
                  <TextInput
                        style={styles.TextInput}
                       placeholder="QR Code"
                       onChangeText={qrcode=>setQrcode(qrcode)}
                   />
                    <TextInput
                        style={styles.TextInput}
                       placeholder="Item Name"
                       onChangeText={itemName=>setItemName(itemName)}
                   />
                    <TextInput
                        multiline={true}
                        style={styles.TextInput}
                        numberOfLines={3}
                       placeholder="Description"
                       onChangeText={desc=>setDesc(desc)}
                   />
                    <TextInput
                        style={styles.TextInput}
                       placeholder="Location"
                       onChangeText={itemloc=>setitemloc(itemloc)}
                   />
                    <TouchableOpacity style={styles.button} onPress={InsertRecord}>
                    <Text style={{color: '#fff', fontWeight: 'bold',  letterSpacing : 3 , fontSize: 18}}>Add Item</Text>
                  </TouchableOpacity>
                 
                  </View>
                 

                </View>
                    
            </View>
        
        </View>



    )
}

const  styles = StyleSheet.create({
    icon : {
      
        width: 200,
        height: 200
    },
    upperContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',

        height: 300

    },
    lowerContainer: {
        flex: 4,
        // backgroundColor: 'yellow',
        // height: '100%'
    },
    formBody: {
        flex: 1,
        backgroundColor: '#ffff',
        marginHorizontal: 10
    },
    Textitem: {
        flex: 1,
        padding: 5,
        // backgroundColor: 'orange'

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
        
    }




})