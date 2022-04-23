import React from 'react';
import  {createDrawerNavigator , DrawerContentScrollView, DrawerItemList, DrawerItem}  from '@react-navigation/drawer';
import { Button} from 'react-native';
import { NavigationContainer ,  DefaultTheme } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';


import InventoryStacks from '../stacks/inventorystacks';
// import LoginStacks from '../stacks/loginstacks';





const Drawer   =  createDrawerNavigator();

const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#FFF',
    },
  };


export default function drawerApp({navigation}) {
    const signout = () => {


        SecureStore.deleteItemAsync('BIOuserid').then(
  
            
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login1' }],
              })

         
          );



    }
    return (
     
        <NavigationContainer theme={MyTheme} independent={true} >

            <Drawer.Navigator initialRouteName = "Home" drawerContent={props => {
                    return (
                    <DrawerContentScrollView {...props}>
                        <DrawerItemList {...props} />
                        {/* <DrawerItem label="Logout" onPress={() => props.navigation.navigate("Login")} /> */}
                        <DrawerItem label="Sign Out" onPress={signout} />
                    </DrawerContentScrollView>
                    )
                }}>
                <Drawer.Screen name =  "Home" component={InventoryStacks} />
                {/* <Drawer.Screen name =  "Inventory" component={InventoryStacks} /> */}
            </Drawer.Navigator>

            
        </NavigationContainer>

    )
}