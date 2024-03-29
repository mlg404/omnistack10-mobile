import React, { useEffect, useState } from 'react';
import { Keyboard, TouchableOpacity, Image, Text, TextInput, View, SafeAreaView } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync }from 'expo-location';
import { MaterialIcons }from '@expo/vector-icons';

import styles from './Main.style';
import api from '../services/api';
import { connect, disconnect, subscriveToNewDevs } from '../services/socket';

function Main({ navigation }){
  const [devs, setDevs] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [techs, setTechs] = useState('');

  useEffect(()=> { 
    async function loadInitialPosition(){
      const { granted } = await requestPermissionsAsync();
    
      if(granted){
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: false,
        });

        const { latitude, longitude } = coords;
        
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        })      
      }
    }

    loadInitialPosition();
  }, [])

  useEffect(() => {
    subscriveToNewDevs(dev => setDevs([...devs, dev]));
  }, [devs])

  function setupWebsocket(){
    disconnect();

    const { latitude, longitude } = currentRegion;

    connect(
      latitude,
      longitude,
      techs
    );
  }

  async function loadDevs(){
    const { latitude, longitude } = currentRegion;
    
    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs
      }
    });

    setDevs(response.data.devs);
    setupWebsocket();
  }
  
  function handleRegionChanged(region){
    setCurrentRegion(region);
  }

  if(!currentRegion){
    return (
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.permission}>
        <Text style={styles.permissionText}> 📌 Encontrando localização... </Text>
      </View>
      </SafeAreaView>
    )
  }

  return (
    <>
      <MapView 
        onRegionChangeComplete={handleRegionChanged} 
        initialRegion={currentRegion} 
        style={styles.map}
      >
        {devs.map((dev) => (
          <Marker 
            key={dev._id}
            coordinate={{ 
              longitude: dev.location.coordinates[0],
              latitude: dev.location.coordinates[1], 
            }}
        >
          <Image 
            style={styles.avatar} 
            source={{ uri: dev.avatar_url}} 
          />
        
          <Callout  onPress={() => {
            navigation.navigate('Profile', { github_username: dev.github_username })
          }}>
            <View style={styles.callout}>
              <Text style={styles.devName}>{dev.name}</Text>
              <Text style={styles.devBio}>{dev.bio}</Text>
              <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
            </View>
          </Callout>
        </Marker>
        ))}
      </MapView>
      <View style={styles.searchForm}>
          <TextInput 
            style={styles.searchInput}
            placeholder="Buscar devs por techs..."
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value={techs}
            onChangeText={setTechs}
          />

          <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
            <MaterialIcons name="my-location" size={20} color="#FFF" />
          </TouchableOpacity>
      </View>
    </>
  );
}

export default Main;