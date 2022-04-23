import React , {useState, useEffect} from 'react';
import {Text, View, Button, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import { VictoryChart, VictoryGroup , VictoryArea , VictoryAxis, VictoryLabel } from 'victory-native';
import DateTimePicker  from '@react-native-community/datetimepicker';
import { globalstyles } from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons';
import globalvar, { BASE_URL } from '../styles/globalvar'

import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';


import moment from 'moment';
export default function temperature ({navigation}) {

    const [date, setDate] = useState(new Date())
    const [show,setShow] = useState(false)
    const [showReport, setReport] =  useState(false)
    const [showButton , SetButton] = useState(true)

    const showDatePicker = () => {
        setShow(true);
    }


    const changeHandler = (event, selectedDate) => {
        const currentdate = selectedDate || date;

        setDate(currentdate)
        setReport(false)
      
        SetButton(true)
        setShow(false)
    }

    const showReportHandler = () => {
        setReport(true)
        SetButton(false)
    }
    
    var dd = {globalvar:BASE_URL}



    const [inv,setInv] =useState([])


    
    const folderName = 'DataSheetFolder';
    const fileName = 'temperature_data.csv';


    
    const [isWriteGranted, setIsWriteGranted] = useState(false);

    useEffect(() => {
        (async () => {
        const res = await MediaLibrary.requestPermissionsAsync();
        if (res.granted) {
            setIsWriteGranted(true);
        }
        })();
    }, []);



    React.useEffect(()=> {
      
     
                var ddate1 = moment(date).format('YYYY-MM-DD')
              
                var headers = {

                    'Accept':'application/json',
                    'Content-Type':'application.json'
                };
    
                var data1 = {
                    ddate: ddate1,
                    
                };
              // Screen was focused
              // Do something   
                fetch(dd.globalvar + "gettempdate.php",
                {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(data1)

                }


                
                ).then(
                    // console.log(data1)
                    (data2) => {
                    
                    data2.json().then((result)=> {
                    //    console.log(result.Data)
                        setInv(result.Data.map((i) => {
                          
                            i.z2 = moment(i.x, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
                            i.x1 = moment(i.x, 'YYYY-MM-DD HH:mm:ss').format('h:mm a');
                            i.x = moment(i.x, 'YYYY-MM-DD HH:mm:ss').format('h a');
                           
                        
                            return i;

                        }
                        
                        ));
                      
                    })
                    .catch((error) => {
                        setInv([]);
                        console.log('No data');
                    });


                  
                    }
                
                 )

    }, [navigation, date])


    const exportFile = () => {
       
        /* convert JSON to worksheet */
        const ws = XLSX.utils.json_to_sheet(inv);
    
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
    
    // console.log(inv)
    return (
        <View style={globalstyles.container}>
            <View style={styles.upperCont}>
                <View style={styles.upperCont2}>
                    <Text style={styles.txtsearch}>Search</Text>
                    <TouchableOpacity style= {styles.button} onPress={showDatePicker}>
                        <MaterialIcons name="search" size ={30} style={styles.icons}/>
                        <Text style={styles.textitem}>{moment(date).format('MM-DD-YYYY')} </Text>
                    </TouchableOpacity>
                    {/* <Button onPress={showDatePicker} title={'Show date'} /> */}
                </View>
            </View>
            
            {show && <DateTimePicker 
                testID = 'datetimepicker'
                value={date}
                mode='date'
                display='default'
                onChange={changeHandler}
                
            />}
            <View style = {styles.upperLowerCont}>
                 <VictoryChart 
                    height= {250}
                    padding={{left: 40, top: 5, right:22, bottom: 45}}
                    labels={{fontSize: 5}}
                    >
                    <VictoryArea 
                    
                    data = {inv} 
                    style ={
                    {
                        
                        data: {
                            fill: 'orange',
                        },
                        labels: {
                            fontSize: 2
                        }
                    }
                }

                 />
                  <VictoryAxis dependentAxis
                      style={
                        {tickLabels: { fontSize: 10}                                       
                        }                     
                        }
                    label = "Temperature"
                    />

                 <VictoryAxis 
                    style={
                        {tickLabels: {angle: 55 , fontSize: 10}                                       
                        }                     
                        }
                    tickComponent={<VictoryLabel style={{fontSize: '5px'}}/>}
                 />
                     
                </VictoryChart>

            </View>
        
        
                
            <View style= {styles.lowerContainer}>
                
                {showButton && 

                      
                <View style={styles.lowerUpper1}>
                    <TouchableOpacity style= {styles.button2} onPress={showReportHandler}>
                        <Text style={{color: '#ffff' , fontSize: 18}}>
                           Generate Report 
                        </Text>
                    </TouchableOpacity>
                </View>   
                }
                    



                {showReport && 
                    <View style={styles.lowerUpper2}>
                    <FlatList
                        data={inv}
                        keyExtractor={(item) => (item.tmpid.toString())}
                        scrollEnabled={true}
                        renderItem={
                            ({item}) =>  (
                                <View  style={styles.itemlist}>
                                <Text style={styles.textlist}>{item.x1}</Text>
                                <Text style={[styles.textlist , {color: '#2ECC71' , fontWeight: 'bold'}]}>{item.y} ºC</Text>
                                </View>

                            )  }
                        ListHeaderComponent={() => (
                                <View  style={styles.itemlist}>
                           
                                <Text style={styles.textlist}>Time</Text>
                                <Text style={styles.textlist}>Temp</Text>
                                </View>

                        )}
                        
                        
                         />
                         <TouchableOpacity style= {styles.button3} >
                    <Text style={{color: '#ffff' , fontSize: 18}} onPress={exportFile}>
                        
                      Download 
                    </Text>
                 </TouchableOpacity>
                    </View>
                    
                }
                
                
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
      
        padding: 5,
        width: '100%',
        flexWrap: 'wrap'
    },
    textlist : {
        flexBasis: '49.33%',
        textAlign: 'center'
    },
    txtsearch: {
    
      
        alignItems: 'flex-end',
        marginLeft: 30,
        fontSize: 18
      


    },

    upperCont : {
        flexDirection: "row",
      
        height: 60,
   
        alignItems: 'center'

    },
    upperCont2 : {
        flex: 1,
        flexDirection: "row",
        // justifyContent: 'space-around',
        height: 60,
        alignItems: 'center',
        marginHorizontal: 8,
        borderColor: '#3333',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius : 20,
    },
    //chart
    upperLowerCont: {
        
        flexDirection: "row",
        borderColor: '#3333',
        
        marginHorizontal: 8,
        borderWidth: 1,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    lowerContainer: {
        flex: 1,
        // borderWidth: 1,
        marginTop: 5,
        marginHorizontal: 8

    },
    lowerUpper1: {
        height: 40,

        marginHorizontal: 80
    },
    //container hide
    lowerUpper2: {
        flex: 1,
         
    },




    icons: {
        flexDirection: "row",
        position: 'absolute',
        left: 1,
        marginLeft: 8
    },
    button: {
        marginVertical: 10,
        marginHorizontal: 40,
        borderRadius: 8,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: '#FFFF',
        elevation: 2, // Android
        height: 35,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button2: {
       
        borderRadius: 12,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: '#2ECC71',
        elevation: 2, // Android
        height: "100%",
      
        justifyContent: 'center',
        alignItems: 'center',
    },
    button3: {
       
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