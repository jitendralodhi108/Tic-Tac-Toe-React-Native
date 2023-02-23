import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Game from '../components/Game'
import Index from '../components/Index'

const Stack = createNativeStackNavigator();

const MyStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Index"
                component={Index}
            options={{ title: 'Welcome' }}
            />
            <Stack.Screen name="Game" component={Game} />
        </Stack.Navigator>
    );
};
export default MyStack;