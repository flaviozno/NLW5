import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import {Header} from '../components/Header';
import { EnvironmentButton } from '../components/EnviromentButton';
import api from '../services/api'
import { PlantCardPrimary } from './../components/PlantCardPrimary';
import {Load} from '../components/Load';
import { useNavigation } from '@react-navigation/native';
interface EnvironmentProps{
    key: string;
    title: string;
}

interface PlantProps{
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

export function PlantSelect(){

    const [enviroment, setEnviroment] = useState<EnvironmentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredplants, setFilteredplants] = useState<PlantProps[]>([]);
    const [enviromentSelected, setenviromentSelected] = useState('all');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(true);
    const navigation = useNavigation();

    function handleEnviromentSelected(enviroment: string){
        setenviromentSelected(enviroment);

        if(enviroment =='all')
            return setFilteredplants(plants);
        
        const filtered = plants.filter(plants => plants.environments.includes(enviroment));
        setFilteredplants(filtered);
    }

    async function fetchPlants(){
        const {data} = await api.get(`plants?_sort=name&order=asc&_page=${page}&_limit=8`);
        if(!data) 
            return setLoading(true);
        if(page>1){
            setPlants(oldValue =>[...oldValue, ...data])
            setFilteredplants(oldValue =>[...oldValue, ...data])
        }else{
            setPlants(data);
            setFilteredplants(data);
        }
        setLoadingMore(false);
        setLoading(false)
    }

    function handleFetchMore(distance: number){
        if(distance < 1)
            return;
        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);
        fetchPlants();
    }

    function handlePlantSelect(plants: PlantProps){
        navigation.navigate('PlantSave', {plants});
    }
    useEffect(() => {
        async function fetchEnviroment(){
            const {data} = await api.get('plants_environments?_sort=title&order=asc');
            setEnviroment([{
                key: 'all',
                title: 'Todos',
            }, ...data]);
        }
        fetchEnviroment();
    },[])

    useEffect(() => {
        fetchPlants();
    },[])

    if(loading)
        return <Load />
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
                keyExtractor={(item) => String(item.key)}
                renderItem={({item}) => (
                    <EnvironmentButton  
                        title={item.title}
                        active={item.key == enviromentSelected}
                        onPress={() => handleEnviromentSelected(item.key)}
                        />
                )} 
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.enviromentList}/>
            </View>
            <View style={styles.plants}>
                    <FlatList data={filteredplants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({item}) => (
                        <PlantCardPrimary 
                        data={item}
                       onPress={() => handlePlantSelect(item)}/>
                    )} 
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({distanceFromEnd})=> handleFetchMore(distanceFromEnd)}
                    ListFooterComponent={
                        loadingMore
                        ? <ActivityIndicator color={colors.green} />
                        : <></>
                    }
                    />
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
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center',
    }
})