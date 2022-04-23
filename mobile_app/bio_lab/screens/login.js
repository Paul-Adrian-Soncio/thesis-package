import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, Text, TouchableOpacity, TextInput } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import globalvar, { BASE_URL } from '../styles/globalvar';





export default function login({navigation}) {
    
    const [userName,setUsername] = useState('')
    const [passwd,setPasswd] = useState('')

    var dd = {globalvar:BASE_URL};

    
    const setUser = (user) => {
        return SecureStore.setItemAsync('BIOuser', user);
    };

    const setUserID = (userid) => {
        return SecureStore.setItemAsync('BIOuserid', userid);
    };
    const setUserRole = (userrole) => {
        return SecureStore.setItemAsync('BIOuserrole', userrole);
    };

    const insertRecord = () => {
        if (userName.length == 0 || passwd.length == 0 ) {
            alert('All fields are required')
        }
        else 
        {
           
            var headers = {
    
                'Accept':'application/json',
                'Content-Type':'application.json'
            };

            var data = {
                username: userName,
                password: passwd
            };
            
            var InsertApiUrl =  dd.globalvar + "checkLogin.php";
            // console.log(InsertApiUrl)
            fetch(
                InsertApiUrl,{
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(data)

                 }
            ).then((Response)=>Response.json())
            .then((Response)=>{
                if (Response.Status == '1') {
                    // console.log(Response.Message)

                    setUser(Response.fullname)
                    setUserID(Response.userid.toString())
                    setUserRole(Response.Role)

                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Drawer1' }],
                      });

                }else{
                    console.log('error')
                }
            })


        }
    }


    return (
    <View style={styles.mainCont}>
            {/* <View style={styles.topCont}>
                <ImageBackground  style={styles.bg1} />



            </View> */}
            <View style={styles.botCont}>
           
                <View style={styles.botTopCurve}>
                </View>
                <View style={styles.botbotCurve}>
                
                    <View style={styles.botForm}>
                    
                    

                        <Text style={{ fontSize: 20, marginBottom: 10 }}>BIOLAB</Text>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Username"
                            autoCorrect={false}
                            onChangeText={user => setUsername(user)}
                        />
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Password"
                            secureTextEntry={true}
                            autoCorrect={false}
                            onChangeText={pass => setPasswd(pass)}
                        />

                       
<TouchableOpacity onPress = {insertRecord} style={styles.button} >
                            <Text style={{ color: '#fff', fontWeight: 'bold', letterSpacing: 3, fontSize: 18 }}>LOGIN</Text>
                    </TouchableOpacity>
                    </View>
                  
                    <ImageBackground source={require('../assets/login.jpg')} style={{
                       flex: 1,
                        backgroundColor: 'red',
                        width: '100%', // applied to Image
                        height: 600,
                        marginBottom: 20,
                        marginTop: 20
                        
                        }}
                        imageStyle={{
                        resizeMode: 'cover' 
                        }}
                    >
                    
                    </ImageBackground>




                </View>

            </View>

        </View>
    )
}



const styles = StyleSheet.create({
    

    mainCont: {

        paddingTop: 26,
        padding: 0,
        flex: 1
    },

    topCont: {
        flex: 1,
        backgroundColor: 'red'
    },
   
    botCont: {

        flex: 1,
         backgroundColor: '#95C69E',
        // backgroundColor: 'yellow',
        paddingBottom: 10
    },

    botTopCurve: {

        backgroundColor: '#95C69E',
        height: 20,
        marginTop: 8,
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        marginHorizontal: 8,
        borderColor: '#81320b'
    },

    botbotCurve: {


        backgroundColor: '#95C69E',
        flex: 1,

        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        marginHorizontal: 8,
        borderColor: '#81320b'
       


    },

    botForm: {

       
        flex: 1,
        paddingTop: 5,
        height: '25%',
        alignItems: 'center',
       

    },



    bg1: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        height: '100%',
     
    },

    TextInput: {
        textAlign: 'center',
        borderWidth: 1,
        width: '90%',
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 6,
        fontSize: 15,
        borderRadius: 15,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 2, // Android
        backgroundColor: '#FFFF',
        marginVertical: 5

    },
    button: {

        backgroundColor: '#3498db',
        borderRadius: 13,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        marginTop: 15,
        elevation: 2, // Android
        marginHorizontal: 10,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%'
    },

})