import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



import Login1 from './screens/login';
import Drawer1 from './routes/drawer';
import * as SecureStore from 'expo-secure-store';


// import Drawer from './routes/drawer';

const Stack = createStackNavigator();

const App = ({navigation}) => {
  const [haslogin , setHaslogin] = useState(false);

  // const initState = async () => {

    
  // }

  // initState()
  
  
  return (
    <View style={styles.container}>
      
    <NavigationContainer>
     <Stack.Navigator initialRouteName = "Login1">
    
          <Stack.Screen name ="Login1" component={Login1}
                options = {{ headerShown: false
           }} />
      

          <Stack.Screen name ="Drawer1" component={Drawer1}
                options = {{
                    headerShown: false ,
                    left: null
                }} />

      </Stack.Navigator>

    </NavigationContainer>

    </View> 
  )

}

export default App;

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Drawer1 />
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});
