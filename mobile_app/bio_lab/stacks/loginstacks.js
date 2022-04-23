import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/login';


const Stack = createStackNavigator();

export default function LoginStacks({navigation}) {

    return (
        <Stack.Navigator>
            <Stack.Screen name ="Login" component={Login} / >
         
        </Stack.Navigator>

    )

}