import React , {useState, useEffect} from 'react';
import { Text, View ,StyleSheet , TextInput ,  TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { globalstyles } from '../styles/global';
import globalvar, { BASE_URL } from '../styles/globalvar'



export default function additem ({navigation , route}) {
    
    // const [ddate,setItemName] = useState('')
   
    const {eid, edate,esample,esource,ecollector,eesource,elocation}  = route.params  ;


    const [sample,setSample] = useState(esample)
    const [source,setSource] = useState(eesource)
    const [itemdate,setItemdate] = useState(edate)
    const [collector,setCollector] = useState(ecollector)

    // setSample(esample)
 
    var dd = {globalvar:BASE_URL}


    const pressHandler = () => {

        navigation.goBack()


    }
    const InsertRecord = () => {
        
        var sample1 = sample;
        var source1 = source;
        var itemdate1 = itemdate;
        var collector1 = collector;

        if( eid.length==0)
        {
            alert('Require');
        }
        else
        {
           var InsertApiUrl = dd.globalvar + 'editmaterialsbyid.php';

            var headers = {

                'Accept':'application/json',
                'Content-Type':'application.json'
            };

            var data = {
                matID: eid,
                dateentry: itemdate1,
                sampletype: sample1,
                source: source1,
                collector: collector1
                
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
                 
                    if (Response[0].Status == '1')
                    {
                        console.log('done');
                        // navigation.navigate('inventory')                }
                    }
                        else
                    {
                        alert("INCORRECT");
                    }

                }
            ).catch((error)=>{
                alert('Updated');
                navigation.navigate('inventory')
            })

        }



    }
    // console.log(route.params)
    return (
        <View style={globalstyles.container}>

            <View style={styles.upperContainer}>
            <MaterialIcons size={80} name="qr-code-scanner" >

            </MaterialIcons>

            </View>
        
        
            <View style={styles.lowerContainer}>
                <View style={styles.formBody}>
                  <View style={styles.Textitem}>
                  <Text>ID</Text>
                  <TextInput
                        editable = {false}
                        style={styles.TextInput}
                       value={eid.toString()}
                   />
                   <Text>Date</Text>
                  <TextInput
                        style={styles.TextInput}
                        onChangeText={itemdate=>setItemdate(itemdate)}
                       value={itemdate}
                   />
                   <Text>Type of Sample</Text>
                  <TextInput
                        style={styles.TextInput}
                        onChangeText={sample=>setSample(sample)}
                        value={sample}
                     
                   />
                    <Text>Source</Text>
                  <TextInput
                        style={styles.TextInput}
                        onChangeText={source=>setSource(source)}
                        value={source}
                    //    value={eesource.toString()}
                   />
                   <Text>Colector</Text>
                  <TextInput
                        style={styles.TextInput}
                        onChangeText={collector=>setCollector(collector)}
                       value={collector}
                   />
                  
                    
                    <TouchableOpacity style={styles.button} onPress={InsertRecord}>
                    <Text style={{color: '#fff', fontWeight: 'bold',  letterSpacing : 3 , fontSize: 18}}>Save</Text>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        height: 150

    },
    lowerContainer: {
        flex: 5,
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
        padding: 3,
        // backgroundColor: 'orange'

    },
    TextInput: {
        backgroundColor: '#77F2BB',
        justifyContent: 'flex-end',
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 7,
        paddingVertical: 7,
        marginVertical: 5,
        borderRadius: 6,
        fontSize: 15,
        borderRadius: 8,
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 2, // Android
      
    },
    button: {
    
        backgroundColor: '#2ECC71',
        marginTop: 10,
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