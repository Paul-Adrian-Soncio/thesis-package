import React, { useState, useEffect } from 'react';
import {Text, View , TouchableOpacity, ImageBackground, StyleSheet} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { globalstyles } from '../styles/global';
import * as SecureStore from 'expo-secure-store';

export default function home({navigation}) {
    
    const [userstate, setUserstate] = useState('')
    const [useridstate, setUserid] = useState('')
    const [rolestate, setRolestate] = useState('')
    
    const getUser = () => {
        return SecureStore.getItemAsync('BIOuser');
    };

    const getID = () => {
        return SecureStore.getItemAsync('BIOuserid');
    };

    const getRole = () => {
        return SecureStore.getItemAsync('BIOuserrole');
    };

    
    getUser().then(userstate=>setUserstate(userstate) )
    getRole().then(rolestate=>setRolestate(rolestate) )





    return (

        <View style={globalstyles.container}>
       
          
            <View style={styles.upperCointainer}>
                <Text style={styles.headertext}>
                    <Text>What are we looking for today?</Text>
                    
                </Text>
                <Text style={{textAlign: 'center' , fontSize: 20}}>{userstate}</Text>
                <ImageBackground source={require('../assets/bg1.png')} style={styles.bg1}>
               
                </ImageBackground>
         
         
            </View>
            <View style={styles.lowerCointainer}>
                <View style={styles.insidecontainer}>
                    
                   
                        <TouchableOpacity style= {styles.button} onPress={()=> navigation.navigate('inventory')}>
                            <MaterialIcons name="graphic-eq" size ={30} style={styles.icons}/>
                            <Text style={styles.textitem}>Inventory</Text>
                        </TouchableOpacity>
                  
                    
                        <TouchableOpacity style= {styles.button}  onPress={()=> navigation.navigate('temperature')}>
                            <MaterialIcons name="device-thermostat" size ={30} style={styles.icons} />
                            <Text style={styles.textitem}>Temperature Data</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style= {styles.button} onPress={()=> navigation.navigate('QRCODE')}>
                            <MaterialIcons name="qr-code-scanner" size ={30} style={styles.icons}/>
                            <Text style={styles.textitem}>QR Scanner</Text>
                        </TouchableOpacity>
                    

                </View>
               
            </View>

        </View>
    )
}

const  styles = StyleSheet.create({
  
    icons: {
        flexDirection: "row",
    
        position: 'absolute',
        left: 1,
        marginLeft: 8
    },


    upperCointainer: {
        backgroundColor: '#FFF',
        marginBottom: 10,
        alignItems: 'center',
        height: '60%'
    },

    lowerCointainer: {
        backgroundColor: '#ffff',
        height: '40%'
    },
    insidecontainer: {
        flex: 1,
        backgroundColor: '#2ECC71',
        paddingTop: 10,
   
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    
    textitem: {
        flexDirection: "row",
        color: "#17202A",
        fontSize: 18,
      
    },
    button: {
        marginVertical: 5,
        marginHorizontal: 40,
        borderRadius: 8,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: '#FFFF',
        elevation: 2, // Android
        height: 60,
      
        justifyContent: 'center',
        alignItems: 'center',
     
    }, bg1: {
        alignItems: 'center',
        width: 300,
        height: 340, marginBottom: 5
    },

    headertext: {
        
        flexDirection: "row",
        fontSize: 20,
        fontWeight: "bold",
        color: "#333"

        
        

    }


})