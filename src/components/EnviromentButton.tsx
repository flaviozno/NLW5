import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RectButton, RectButtonProps} from 'react-native-gesture-handler';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentButtonProps extends RectButtonProps{
    title: string;
    active?: boolean; //o ? mostra q n eh obrigatorio o campo
}

export function EnvironmentButton({title, active = false, ...rest} : EnvironmentButtonProps){
    return(
        <RectButton style={[styles.container, active && styles.containerAct]} { ...rest}>
            <Text style={[styles.text, active && styles.textAct]}>
                {title}
            </Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    text: {
        color: colors.heading,
        fontFamily: fonts.text,
    },
    textAct: {
        fontFamily: fonts.heading,
        color: colors.green_dark,
    },
    containerAct:{
        backgroundColor: colors.green_light
    },
    container: {
        marginRight: 5,
        backgroundColor: colors.shape,
        height: 40,
        width: 76,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    }

})