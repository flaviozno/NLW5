import React, {useState} from 'react';
import {StyleSheet, SafeAreaView,View, Text, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import {Button} from '../components/Button'
import { useNavigation } from '@react-navigation/native';

export function UserIdentification(){
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();
    const navigation = useNavigation();

    function handleInputBlur(){
        setIsFocused(false);
        setIsFilled(!!name);
    }
    function handleInputFocus(){
        setIsFocused(true);
    }
    function handleInputChange(value: string){
        setIsFilled(!!value);
        setName(value);
    }

    async function handleSubmit(){ //tem q ser async pq tem o storage
            if(!name)
                return Alert.alert("Me diga como chamar você 😢")
            await AsyncStorage.setItem('@plantmanager:user', name); //o @ é um padrao para deixar mais organizado
            navigation.navigate('Confirmation');
    }

    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                    {isFilled ? '😉' : '😀'}
                                </Text>
                                <Text style={styles.title}>
                                    Como podemos {'\n'}chamar você?
                                </Text>
                            </View>
                            <TextInput  style={[
                                styles.input,
                                (isFocused || isFilled) && {borderColor: colors.green}
                            ]} 
                                        placeholder="Digite um nome"
                                        onBlur={handleInputBlur}
                                        onFocus={handleInputFocus}
                                        onChangeText={handleInputChange}/>
                            <View style={styles.footer}>
                                <Button 
                                title="Confirmar"
                                onPress={handleSubmit}/>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    content: {
       flex: 1,
       width: '100%',
    },
    form:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 54,
    },
    emoji:{
        fontSize: 44,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center',
    },
    title: {
        marginTop: 20,
        fontSize: 24,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 32,
    },
    footer:{
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 20,
    },
    header: {
        alignItems: 'center',
    }
})