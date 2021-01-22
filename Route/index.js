import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Splashscreen, Login, Logout, MenuA, MenuB, MenuC, MenuD, MenuE, MenuF } from '../Pages';
import BottomNavigator from '../Components/BottomNavigator';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = ({navigation, route}) => {
    return (
        <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
            <Tab.Screen
                name="MenuA"
                component={MenuA}
                initialParams={{"url":"menu-a", header_title:"Menu A" }}
                options={{ tabBarLabel: 'Menu A' }}
            />
            <Tab.Screen
                name="MenuB"
                component={MenuA}
                initialParams={{"url":"menu-b", header_title:"Menu B" }}
                options={{ tabBarLabel: 'Menu B' }}
            />
            <Tab.Screen
                name="MenuC"
                component={MenuA}
                initialParams={{"url":"menu-c", header_title:"Menu C" }}
                options={{ tabBarLabel: 'Menu C' }}
            />
            <Tab.Screen
                name="MenuF"
                component={MenuE}
                initialParams={{"url":"menu-e", header_title:"Menu E"}}
                options={{ tabBarLabel: 'Menu E' }}
            />
            <Tab.Screen
                name="MenuG"
                component={Logout}
                options={{ tabBarLabel: 'Logout', tabBarOnPress: () => { this.Logout() } }}
            />
        </Tab.Navigator>
    )
}

const Route = () => {
    return (
        <Stack.Navigator initialRouteName="Splashscreen">
            <Stack.Screen name="MainApp" component={MainApp} options={{ title: 'Survey Penduduk' }} />
            <Stack.Screen name="Splashscreen" component={Splashscreen} options={{headerShown: false}}/>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="MenuA" component={MenuA} options={{ title: 'Menu A' }}/>
            <Stack.Screen name="MenuB" component={MenuB} options={{ title: 'Menu B' }} />
            <Stack.Screen name="MenuC" component={MenuC} options={{ title: 'Menu C' }} />
            <Stack.Screen name="MenuD" component={MenuD} options={{ title: 'Menu D' }} />
            <Stack.Screen name="MenuE" component={MenuE} options={{ title: 'Menu E' }} />
            <Stack.Screen name="MenuF" component={MenuF} options={{ title: 'Menu F' }} />

            <Stack.Screen name="Logout" component={Logout} options={{ title: 'Logout' }} />
        </Stack.Navigator>
    )
}

export default Route;