import React from 'react';
import { createDrawerNavigator} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';


import InventoryStacks from '../stacks/inventorystacks';
import LoginStacks from '../stacks/loginstacks';
const Drawer   =  createDrawerNavigator();
export default function drawerApp() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName = "Home">
                <Drawer.Screen name =  "Home" component={InventoryStacks} />
                <Drawer.Screen name =  "Login" component={LoginStacks} />
            </Drawer.Navigator>
        </NavigationContainer>

    )
}