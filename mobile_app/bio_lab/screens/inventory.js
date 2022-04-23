import React , {useState, useEffect} from 'react';
import {FlatList, Text, View ,StyleSheet , TextInput , Alert, ImageBackground, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { globalstyles } from '../styles/global';
import globalvar, { BASE_URL } from '../styles/globalvar'
import { jsonToCSV  } from 'react-native-csv'

import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

// import { writeFile, readFile } from 'react-native-fs';
// import XLSX from 'xlsx';


export default function inventory({navigation}) {

    
    const [inventorylist, setInventory] = useState([]);
    const [arrayholder,setArrayholder] =useState([])

   
    var dd = {globalvar:BASE_URL}
    
    


    const folderName = 'DataSheetFolder';
    const fileName = 'Inventory_list.csv';

    // const results = jsonToCSV(inventorylist);

    // console.log(results)

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
      
     
            const inventorydata = navigation.addListener('focus', () => {
              // Screen was focused
              // Do something   
                fetch( dd.globalvar + "getmaterials.php").then((data) => {
                    data.json().then((result)=> {
                        setInventory(result.Data)
                        setArrayholder(result.Data)
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                })

                
            });
        
            return inventorydata;
     


    }, [navigation])

    const searchHandler = (x) => {
   

        const newData = arrayholder.filter(item => {
            const itemData = item.sampletype.toUpperCase();
            const textData = x.toUpperCase();
            return itemData.indexOf(textData) > -1
          });
      
          setInventory(newData)
    }

    
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



    return (
        <TouchableWithoutFeedback onPress={()=> { Keyboard.dismiss()}} >
        <View style={globalstyles.container}>
            <View style={styles.searchbar} >
         
                <TextInput 
                    placeholder={'Search'}
                    style = {styles.TextInput}
                    onChangeText={(x) => {searchHandler(x)}}
                />
                  
            </View>
        
            <View style = {styles.upperContainer} >
                <ImageBackground source={require('../assets/bg2.png')} style={styles.bg2}> 
                </ImageBackground>
            </View>
            <View style = {styles.lowercontainer}>
                 <View style = {styles.lowercontainer1}>
                        <FlatList
                        data={inventorylist}
                        keyExtractor={(item) => (item.matid.toString())}
                        scrollEnabled={true}
                        renderItem={
                            ({item}) =>  (
                                <TouchableOpacity  onPress={()=>navigation.navigate('inventorydetails' , {itemdata:item.matid, dateentry: item.dateentry , sampletype: item.sampletype , source : item.source , collector: item.collector , loc_name: item.loc_name})} style={styles.itemlist}>
                                <Text style={styles.textlist}>{item.matid}</Text>
                                <Text style={styles.textlist}>{item.dateentry}</Text>
                                <Text style={styles.textlist}>{item.sampletype}</Text>
                                </TouchableOpacity>

                            )  }
                        ListHeaderComponent={() => (
                                <View  style={styles.itemlist}>
                                <Text style={styles.textlist}>ID</Text>
                                <Text style={styles.textlist}>Date</Text>
                                <Text style={styles.textlist}>Sample</Text>
                                </View>

                        )}
                        
                        
                         />

                </View>
                <View style = {styles.lowercontainer2}>
                
                  <TouchableOpacity style= {styles.button2} onPress={exportFile} >
                        <Text style={{color: '#ffff' , fontSize: 18}}>
                            
                           Generate Report 
                        </Text>
                    </TouchableOpacity>
                
                </View>
                {/* <View> */}
                 

                
            </View>
       
        </View>
        </TouchableWithoutFeedback>
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
        flexBasis: '33.33%',
       
        textAlign: 'center'
    },
    lowercontainer1: {
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: '#FFF',
        borderRadius: 5,
        marginBottom: 15
    },
    lowercontainer2: {
      
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    
    },
    searchbar: {
        flexDirection: "row",
        justifyContent: "center",
        width: '100%',
        height: 60,
        padding: 10,
        marginBottom: 3
      


    },
    upperContainer: {
        
        height: 100,
        alignItems: 'center',
   
     
    },
    lowercontainer: { 


        
      
        flex: 1,
        backgroundColor: '#2ECC71',
        paddingTop: 10,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
       
        paddingBottom: 2
    },
    bg2: {
    alignItems: 'center',
    width: 120,
    height: 110,

    },
    icons: {
        padding: 10,
    },
    TextInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 8,
        width: 320,
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
 
        borderRadius: 8,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: '#FFFF',
        elevation: 1, // Android
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
     
    },
    button2: {
       
        borderRadius: 12,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: '#2ED571',
        elevation: 2, // Android
        marginBottom: 20,
        width: '95%',
        margin: 10,
        
      height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    }
})