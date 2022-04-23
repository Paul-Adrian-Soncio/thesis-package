import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/home';
import Inventory from '../screens/inventory';
import Header from '../shared/header';
import Edititem from '../screens/edititem';
import Inventorydetails from '../screens/inventorydetails';
import Scanner from '../screens/scanner';
import TemperatureScreen from '../screens/temperature';
import { ScreenStackHeaderCenterView } from 'react-native-screens';

const Stack = createStackNavigator();

export default function iventorystacks({navigation}) {

    return (
        <Stack.Navigator>
            <Stack.Screen name ="Home" component={Home}
                options = {{
                    headerTitle: () =>  <Header navigation={navigation} />
                     
                }}
              
            
             />
            <Stack.Screen name ="inventory" component={Inventory} options={{
                 title: 'Inventory' 

                 }}
                 
                
                 / >
                       <Stack.Screen name ="inventorydetails" component={Inventorydetails} options={{
                 title: 'Inventory' 

                 }}/ >
                <Stack.Screen name ="edititem" component={Edititem} options={{
                 title: 'Inventory' 

                 }}/ >
               <Stack.Screen name ="temperature" component={TemperatureScreen} options={{
                 title: 'Temperature' 

                 }}/ >
                     <Stack.Screen name ="QRCODE" component={Scanner} options={{
                 title: 'QRCODE Scanner' 

                 }}/ >


        </Stack.Navigator>

    )

}