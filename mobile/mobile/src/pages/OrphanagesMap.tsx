import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect} from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import mapMarker from '../images/map-marker.png';

import api from '../services/api';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    const navigation = useNavigation();

    useFocusEffect(() => {
      api.get('orphanages').then(response => {
        setOrphanages(response.data);
      });
    });

    function handleNavigateToOrphanageDetails(id: number){
        navigation.navigate('OrphanageDetails', { id });
    }
    
    function handleNavigateToCreateOrphanage(){
      navigation.navigate('SelectMapPosition');
  }

    return (
        <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} 
        style={styles.map} 
        initialRegion={{
          latitude: -23.5715367,
          longitude: -46.6968327,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }} 
      >
        {orphanages.map(orphanage => {
          return (
            <Marker
              key={orphanage.id} 
              icon={mapMarker}
              calloutAnchor={{
                x: 2.9,
                y: 0.9,
              }}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
            >
              <Callout tooltip={true} onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{orphanage.name}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{orphanages.length} Orfanatos encontrados</Text>

          <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage} >
            <Feather name="plus" size={20} color="#FFF" />
          </RectButton>
        </View>

    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height, 
    },
  
    calloutContainer: {
      width: 170,
      height: 50,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 28,
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    calloutText: {
      color: '#0089a5',
      fontSize: 14,
      fontWeight: 'bold',
      
    },
  
    footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: '#FFF',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 4,
    },
  
    footerText: {
      color: '#8fa7b3',
      fontFamily: 'Nunito_700Bold',
    },
  
    createOrphanageButton: {
      width: 60,
      height: 60,
      borderRadius: 22,
      backgroundColor: '#15c3d6', 
  
      justifyContent: 'center',
      alignItems: 'center',

    
    },

  });