import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import mapMarker from '../images/map-marker.png';

export default function OrphanagesMap() {
    const navigation = useNavigation();

    function handleNavigateToOrphanageDetails(){
        navigation.navigate('OrphanageDetails');
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
        <Marker 
          icon={mapMarker}
          calloutAnchor={{
            x: 2.9,
            y: 0.9,
          }}
          coordinate={{
            latitude: -23.5715367,
            longitude: -46.6968327,
          }}
        >
          <Callout tooltip={true} onPress={handleNavigateToOrphanageDetails}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>Lar das Meninas</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

        <View style={styles.footer}>
          <Text style={styles.footerText}>2 Orfanatos encontrados</Text>

          <TouchableOpacity style={styles.createOrphanageButton} onPress={() => {}} >
            <Feather name="plus" size={20} color="#FFF" />
          </TouchableOpacity>
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