import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import {Header} from '../components/Header';
import { EnvironmentButton } from '../components/EnviromentButton';
import api from '../services/api'

interface EnvironmentProps{
    key: string;
    title: string;
}

export function PlantSelect(){

    const [enviroment, setEnviroment] = useState<EnvironmentProps[]>([]);

    useEffect(() => {
        async function fetchEnviroment(){
            const {data} = await api.get('plants_environments');
            setEnviroment([{
                key: 'all',
                title: 'Todos',
            }, ...data]);
        }
        fetchEnviroment();
    },[])

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />
                <Text style={styles.title}>
                    Em qual ambiente
                </Text>
                <Text style={styles.subtitle}>
                você colocar sua planta?
                </Text>
            </View>
            <View>
                <FlatList data={enviroment} 
                renderItem={({item}) => (
                    <EnvironmentButton  
                        title={item.title}
                        />
                )} 
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.enviromentList}/>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 15,
        lineHeight: 20,
    },
    subtitle: {
        fontFamily: fonts.text,
        lineHeight: 20,
        color: colors.heading,
        fontSize: 17,
    },
    header: {
        paddingHorizontal: 30,
    },
    enviromentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32,
    }
})