import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MenuA, MenuB, MenuC, MenuD, MenuE, MenuF } from '../Pages';
import BottomNavigator from '../Components/BottomNavigator';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = ({navigation, route}) => {
    return (
        <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
            <Tab.Screen
                name="MenuA"
                component={MenuA}
                options={{ tabBarLabel: 'Menu A' }}
            />
            <Tab.Screen
                name="MenuB"
                component={MenuB}
                initialParams={{"url":"menu-b", header_title:"Menu B" }}
                options={{ tabBarLabel: 'Menu B' }}
            />
            <Tab.Screen
                name="MenuC"
                component={MenuC}
                options={{ tabBarLabel: 'Menu C' }}
            />
            <Tab.Screen
                name="MenuD"
                component={MenuD}
                initialParams={{"url":"menu-d", header_title:"Menu D"}}
                options={{ tabBarLabel: 'Menu D' }}
            />
            <Tab.Screen
                name="MenuE"
                component={MenuE}
                options={{ tabBarLabel: 'Menu E' }}
            />
        </Tab.Navigator>
    )
}

const Route = () => {
    return (
        <Stack.Navigator initialRouteName="MainApp">
            <Stack.Screen name="MainApp" component={MainApp} options={{ title: 'SWG - Sistem Informasi Desa' }} />
            <Stack.Screen name="MenuA" component={MenuA} options={{ title: 'Menu A' }} />
            <Stack.Screen name="MenuB" component={MenuB} options={{ title: 'Menu B' }} />
            <Stack.Screen name="MenuC" component={MenuC} options={{ title: 'Menu C' }} />
            <Stack.Screen name="MenuD" component={MenuD} options={{ title: 'Menu D' }} />
            <Stack.Screen name="MenuE" component={MenuE} options={{ title: 'Menu E' }} />
            <Stack.Screen name="MenuF" component={MenuF} options={{ title: 'Menu F' }} />
        </Stack.Navigator>
    )
}

export default Route;