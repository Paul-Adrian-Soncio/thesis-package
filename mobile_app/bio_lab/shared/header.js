import * as React from 'react';
import { Text, View ,  StyleSheet} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';


export default function Header({navigation}) {


    const openmenu = () => {
        navigation.dispatch(DrawerActions.openDrawer());

    }
    return (
        <View>
            <MaterialIcons name="menu" size={28} style={styles.icons} onPress={openmenu}/>
            <View style={styles.headertext}>
            <Text style={styles.textitem} > Home</Text>
            </View>
           
        </View>

    )
}

const  styles = StyleSheet.create({ 
    icons: {

        position : 'absolute',
        left: 1,
        marginLeft: 20

    },
    headertext : {
        flexDirection: 'row',
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
 
       
    
    },

    textitem : {
        fontSize: 20,
        fontWeight: 'bold'
    }

})