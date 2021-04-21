import React from 'react';
import { Text, Image, StyleSheet, View} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import userImg from '../assets/4x3.png';

export function Header(){
    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>Flávio</Text>
            </View>

            <Image source={userImg} style={styles.img} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
    },
    img: {
        width: 70,
        height: 70,
        borderRadius: 40,
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    userName: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40,
    }

})