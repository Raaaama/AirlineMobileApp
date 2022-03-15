import React, { useState } from 'react';
import { StyleSheet, View, Image, TextInput, Text, Button, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Modal } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import {modalVisible} from '../App';
import {setModalVisible} from '../App';

export default function SelectFrom() {
    
  //const [modalVisible, setModalVisible] = useState(false);
  return (
    
      <Modal
        animationType="slide"
        visible={modalVisible}
        presentationStyle={'fullScreen'}>
        <View style={styles.selectContainer}>
          <View style={styles.searchContainer}>
            <TouchableOpacity 
              style={styles.closeBtn}
              onPress={() => setModalVisible(!modalVisible)}>
                {/*<Svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <Circle stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </Svg>*/}
                
                <Image
                  style={styles.closeBtnImg}
                  source={require('../assets/x.png')}
                />
            </TouchableOpacity>
            <TextInput
              autoFocus={true}
              placeholder='Departure'
              style={styles.searchInput}
            ></TextInput>
          </View>

          <TouchableOpacity 
            style={styles.chooseAirportContainer}
            onPress = {() => chooseAirportFrom("Moscow",0)}>
            <View style={styles.airportContainer}>
              <View style={styles.airportInfo}>
                <Text style={styles.city}>Moscow</Text>
                <Text style={styles.airportName}>Domodedovo International Airport</Text>
              </View>
              <View style={styles.apCodeContainer}>
                <Text style={styles.apCode}>DME</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.chooseAirportContainer}
            onPress = {() => chooseAirportFrom("Nur-Sultan",0)}>
            <View style={styles.airportContainer}>
              <View style={styles.airportInfo}>
                <Text style={styles.city}>Nur-Sultan</Text>
                <Text style={styles.airportName}>Nursultan Nazarbayev International Airport</Text>
              </View>
              <View style={styles.apCodeContainer}>
                <Text style={styles.apCode}>NQZ</Text>
              </View>
            </View>
          </TouchableOpacity>

        </View>
      </Modal>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001a2d',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectContainer: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#001a2d',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
    flex: 0,
  },
  chooseAirportContainer: {
    width: '100%',
    alignItems: 'center',
  },
  airportContainer: {
    flexDirection: 'row',
    minHeight: 80,
    //height: '10%',
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    marginTop: '2%'
  },
  airportInfo: {
    width: '70%',
    marginLeft: '5%',
  },
  city: {
    fontFamily: 'Manrope',
    fontSize: 25,
  },
  airportName: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
  },
  apCodeContainer: {
    width: '20%',
    alignItems: 'center',
  },
  apCode: {
    fontFamily: 'Manrope',
    fontSize: 25,
    color: 'black'
  },
  searchInput: {
    backgroundColor: 'white',
    fontSize: 25,
    fontFamily: 'Manrope',
    width: '100%',
  },
  closeBtn: {
    backgroundColor: 'white',
    height: 55,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnImg: {
    width: '40%',
    height: '40%',
  },
});