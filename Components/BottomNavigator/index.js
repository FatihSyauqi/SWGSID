import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { ICONHome, ICONAirplane, ICCar, ICONScan, ICONMenu } from '../../Assets';

const TabItem = ({title, active, onPress, onLongPress}) => {
    const Icon = () => {
        if(title === 'Menu A'){
            return active ? <ICONHome /> : <ICONHome />;
        }
        if(title === 'Menu B'){
            return active ? <ICONAirplane /> : <ICONAirplane />;
        }
        if(title === 'Menu C'){
            return active ? <ICCar /> : <ICCar />;
        }
        if(title === 'Menu D'){
            return active ? <ICONScan /> : <ICONScan />;
        }
        if(title === 'Menu E'){
            return active ? <ICONMenu /> : <ICONMenu />;
        }
        return <ICONHome />;
    }
    return (
        <TouchableOpacity style={styles.containerIcon} onPress={onPress} onLongPress={onLongPress}>
            <Icon/>
            <Text style={styles.text(active)}>{title}</Text>
        </TouchableOpacity>
    )
}


const BottomNavigator = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        
                        if(route.params != undefined){
                            navigation.navigate(route.name,route.params)
                        } else {
                            navigation.navigate(route.name);
                        }
                        
                        
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };
                return (
                    <TabItem
                        key={index}
                        title={label}
                        active={isFocused}
                        onPress={onPress}
                        onLongPress={onLongPress}
                    />
                );
            })}
        </View>
    )
}

export default BottomNavigator

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        paddingVertical: 10,
        backgroundColor: 'white',
        borderWidth: 0.6,
        borderColor: '#dcdcdc'
    },
    containerIcon: {
        alignItems: 'center',
    },
    text: (active) => ({
        fontSize : 11,
        color: active ? "tomato" : "gray",
        marginTop: 5
    }),
})