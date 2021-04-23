import React, {useState} from 'react';
import {Alert, StyleSheet, View, Platform, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import {SvgFromUri} from 'react-native-svg'
import waterdrop from '../assets/waterdrop.png'
import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import {useRoute} from '@react-navigation/core'; //recuperar valores passados pela rota
import DateTimePicker, {Event} from '@react-native-community/datetimepicker';
import { isBefore } from 'date-fns';
import { format } from 'date-fns/esm';

interface Params{
    plants: {
        id: string;
        name: string;
        about: string;
        water_tips: string;
        photo: string;
        environments: [string];
        frequency: {
        times: number;
        repeat_every: string;
        }
    }
}

export function PlantSave(){
    const [selectedDateTime, setselectedDateTime] = useState(new Date());
    const [showDatePicker, setshowDatePicker] = useState(Platform.OS == 'ios');
    const Routes = useRoute();
    const {plants} = Routes.params as Params;

    function handleChangeTime(event: Event, dateTime: Date | undefined){
        if(Platform.OS == 'android'){
            setshowDatePicker(oldState => !oldState);
        }
        if(dateTime && isBefore(dateTime, new Date())){
            setselectedDateTime(new Date());
            return Alert.alert("Escolha uma data no futuro! ⏰")
        }
        if(dateTime)
            setselectedDateTime(dateTime);
    }
    
    function handleOpenDateTimePickerForAndroid(){
        setshowDatePicker(oldState => !oldState);
    }

    return(
        <View style={styles.container}>
            <View style={styles.plantsInfo}>
                <SvgFromUri uri={plants.photo} height={150} width={150}/>
                <Text style={styles.plantsName}>
                    {plants.name}
                </Text>
                <Text style={styles.plantsAbout}>
                   {plants.about}
                </Text>
            </View>
            <View style={styles.controllers}>
                <View style={styles.tipContainer}>
                    <Image source={waterdrop} style={styles.tipImage}/>
                    <Text style={styles.tipText}>
                        {plants.water_tips}
                    </Text>
                </View>
                <Text style={styles.alertLabel}>
                    Escolha o melhor horário para ser lembrado:
                </Text>
              {showDatePicker && 
                (<DateTimePicker value={selectedDateTime} mode='time' display='spinner'
                        onChange={handleChangeTime}/>)
                }
                {
                   Platform.OS =='android' && (
                       <TouchableOpacity style={styles.datetimepickerButton} onPress={handleOpenDateTimePickerForAndroid}>
                        <Text style={styles.datetimepickerText}>
                               {` Mudar ${format(selectedDateTime, 'HH:mm')}`}
                        </Text>
                       </TouchableOpacity>
                   )
                }
                <Button title="Cadastrar planta" onPress={() => {}} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape,
    },
    plantsInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape,
    },
    controllers:{
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20,
    },
    plantsName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15,
    },
    plantsAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60,
    },
    tipImage: {
        width: 56,
        height: 56,
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify',
    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5,
    },
    datetimepickerText: {
        color: colors.heading,
        fontFamily: fonts.text,
        fontSize: 24,
    },
    datetimepickerButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,
    }

})