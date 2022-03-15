import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Image, TextInput, Text, TouchableOpacity, Modal } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
//import Svg, { Circle } from 'react-native-svg';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
//import SelectFrom from './components/selectFromContainer'
import {Calendar, CalendarList } from 'react-native-calendars';
//import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { RadioButton } from 'react-native-paper';
import ColorPropType from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType';

const fonts = () => Font.loadAsync({
  'Manrope': require('./assets/fonts/Manrope-Bold.ttf'),
  'Manrope-Medium': require('./assets/fonts/Manrope-Medium.ttf')
});

var radio_props = [
  {label: 'Econom', value: 0 },
  {label: 'Comfort', value: 1 },
  {label: 'Business', value: 2 },
  {label: 'First Class', value: 3 }
];

export default function App() {
  const [font, setFont] = useState(false);

  const [fromModalVisible, setFromModalVisible] = useState(false);
  const [toModalVisible, setToModalVisible] = useState(false);
  const [selectDateVisible, setSelectDateVisible] = useState(false);
  const [selectPassengerVisible, setSelectPassengerVisible] = useState(false);
  
  const [fromTxt, setFromText] = useState("From");
  const [defaultFromStyle, setDefaultFromStyle] = useState(true);

  const [toTxt, setToText] = useState("To");
  const [defaultToStyle, setDefaultToStyle] = useState(true);

  const [dateTxt, setDateTxt] = useState("Date");
  const [defaultDateStyle, setDefaultDateStyle] = useState(true);

  const [passengersTxt, setPassengersTxt] = useState("Passengers");
  const [defaultPassengersStyle, setDefaultPassengersStyle] = useState(true);

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  const [checked, setChecked] = React.useState('first');

  function chooseAirport(cityName, num) {
    if (num == 0) {
      setDefaultFromStyle(false);
      setFromModalVisible(!fromModalVisible);
      setFromText(cityName);
    }
    if (num == 1) {
      setDefaultToStyle(false);
      setToModalVisible(!toModalVisible);
      setToText(cityName);
    }
  }

  function chooseDate(day) {
    setDefaultDateStyle(false);
    setSelectDateVisible(!selectDateVisible);
    setDateTxt(day.day + ' ' + monthNames[day.month - 1]);
  }

  function getCurrentDate() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    date = date + 1;

    if (month.toString().length == 1) {
      month = '0' + month;
    }
    if (date.toString().length == 1) {
      date = '0' + date;
    }
    return(year + '-' + month + '-' + date);
  }

  function getMaxDate() {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    month = month + 6;

    if (month > 12) {
      month = month - 12;
      year = year + 1;
    }
    if (month.toString().length == 1) {
      month = '0' + month;
    }
    if (date.toString().length == 1) {
      date = '0' + date;
    }

    return(year + '-' + month + '-' + date);
  }

  const [markedDates, setMarkedDates] = useState({})
  const [current, setCurrent] = useState();

  if (font) {
  return (

    <View style={styles.container}>
      <Modal
        animationType="slide"
        visible={fromModalVisible}
        presentationStyle={'fullScreen'}
        onRequestClose={() => setFromModalVisible(!fromModalVisible)}>
        <View style={styles.selectContainer}>
          <View style={styles.searchContainer}>
            <TouchableOpacity 
              style={styles.closeBtn}
              onPress={() => setFromModalVisible(!fromModalVisible)}>
                <Image
                  style={styles.closeBtnImg}
                  source={require('./assets/x.png')}
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
            onPress = {() => chooseAirport("Moscow",0)}>
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
            onPress = {() => chooseAirport("Nur-Sultan",0)}>
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

      <Modal
        animationType="slide"
        visible={toModalVisible}
        presentationStyle={'fullScreen'}
        onRequestClose={() => setToModalVisible(!toModalVisible)}>
        <View style={styles.selectContainer}>
          <View style={styles.searchContainer}>
            <TouchableOpacity 
              style={styles.closeBtn}
              onPress={() => setToModalVisible(!toModalVisible)}>
                <Image
                  style={styles.closeBtnImg}
                  source={require('./assets/x.png')}
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
            onPress = {() => chooseAirport("Moscow",1)}>
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
            onPress = {() => chooseAirport("Nur-Sultan",1)}>
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

      <Modal
        animationType="slide"
        visible={selectDateVisible}
        //presentationStyle={'fullScreen'}
        transparent={true}
        onRequestClose={() => setSelectDateVisible(!selectDateVisible)}>
        <View
         style={{
          flex: 0,
          marginTop: 'auto',
          backgroundColor:'white',
        }}>
          <Calendar
            theme={{
              calendarBackground: 'white',
              textDayFontFamily: 'Manrope',
              textMonthFontFamily: 'Manrope',
              textDayHeaderFontFamily: 'Manrope',

              dayTextColor: 'black',
              textDisabledColor: '#9c9c9c',
              monthTextColor: 'black',
              textSectionTitleColor: 'black',
              dayTextColor: 'black',
              arrowColor: 'black',
              
              textSectionTitleDisabledColor: '#d9e1e8',
              selectedDayBackgroundColor: '#ff5e00',
              selectedDayTextColor: 'white',

              textDayFontSize: 16,
              textMonthFontSize: 20,
              textDayHeaderFontSize: 12
            }}
            onDayPress={day => {
              setMarkedDates({
                [day.dateString]: {
                  selected: true,
                  color: '#ff5e00'
                },
              })
              chooseDate(day);
              setCurrent(day.dateString)
            }}
            enableSwipeMonths={true}
            minDate={getCurrentDate()}
            maxDate={getMaxDate()}
            hideExtraDays={true}
            pastScrollRange={0}
            futureScrollRange={5}
            markedDates={markedDates}
            current={current}
          />
        </View>
      </Modal>

      <Modal
        animationType="slide"
        visible={selectPassengerVisible}
        //presentationStyle={'fullScreen'}
        transparent={true}
        onRequestClose={() => setSelectPassengerVisible(!selectPassengerVisible)}>
        <View
         style={{
          flex: 0,
          marginTop: 'auto',
          backgroundColor:'white',
        }}>
          <Text style={styles.pncHeader}>Passengers and class</Text>
          <Text style={styles.pncSectionHeader}>Passengers</Text>

          <View style={styles.passengerTypeSelection}>
            <View style={{marginLeft:'3%', width:'54%'}}>
              <Text style={styles.passengerType}>Adults</Text>
              <Text style={styles.passengerTypeInfo}>Over 12 years old</Text>
            </View>
            <View style={styles.pncButtons}>
              <TouchableOpacity style={styles.mpBtn}>
                <Text style={styles.mpBtnTxt}>-</Text>
              </TouchableOpacity>
              <Text style={styles.passengelKol}>0</Text>
              <TouchableOpacity style={styles.mpBtn}>
                <Text style={styles.mpBtnTxt}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.passengerTypeSelection}>
            <View style={{marginLeft:'3%', width:'54%'}}>
              <Text style={styles.passengerType}>Children</Text>
              <Text style={styles.passengerTypeInfo}>2-12 years old</Text>
            </View>
            <View style={styles.pncButtons}>
              <TouchableOpacity style={styles.mpBtn}>
                <Text style={styles.mpBtnTxt}>-</Text>
              </TouchableOpacity>
              <Text style={styles.passengelKol}>0</Text>
              <TouchableOpacity style={styles.mpBtn}>
                <Text style={styles.mpBtnTxt}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.passengerTypeSelection}>
            <View style={{marginLeft:'3%', width:'54%'}}>
              <Text style={styles.passengerType}>Infants</Text>
              <Text style={styles.passengerTypeInfo}>0-2 y.o., without a seat</Text>
            </View>
            <View style={styles.pncButtons}>
              <TouchableOpacity style={styles.mpBtn}>
                <Text style={styles.mpBtnTxt}>-</Text>
              </TouchableOpacity>
              <Text style={styles.passengelKol}>0</Text>
              <TouchableOpacity style={styles.mpBtn}>
                <Text style={styles.mpBtnTxt}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.pncSectionHeader}>Class</Text>
          {/* 
          <RadioForm
            radio_props={radio_props}
            initial={0}
            buttonColor={'#001a2d'}
            buttonOuterColor={'#001a2d'}
            //buttonInnerColor={'#001a2d'}
            buttonOuterColor={this.state.value3Index === i ? '#001a2d' : '#000'}
            onPress={(value) => {this.setState({value:value})}}
          />*/}

          <RadioButton
            value="first"
            status={ checked === 'first' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('first')
          }
        />
        </View>
      </Modal>

      <StatusBar style="light"/>
      <Image
        style={styles.logo}
        source={require('./assets/logo.png')}
      />

      <TouchableOpacity 
        style={[styles.input,{marginTop: '2%', borderTopLeftRadius: 10, borderTopRightRadius: 10}]}
        onPress={() => setFromModalVisible(!fromModalVisible)}
      >
        <Text 
          style={defaultFromStyle ? styles.inputStyle1 : styles.inputStyle2}>
          {fromTxt}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.input,{marginTop: '1%', borderBottomLeftRadius: 10, borderBottomRightRadius: 10}]}
        onPress={() => setToModalVisible(!fromModalVisible)}
      >
        <Text style={defaultToStyle ? styles.inputStyle1 : styles.inputStyle2}>
          {toTxt}
        </Text>
      </TouchableOpacity>      

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={[styles.btn,{borderTopLeftRadius: 10, borderBottomLeftRadius: 10}]}
          onPress={() => setSelectDateVisible(!selectDateVisible)}
        >
          <Text style={defaultDateStyle ? styles.txt : styles.txt2}>{dateTxt}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn,{borderTopRightRadius: 10, borderBottomRightRadius: 10}]}
          onPress={() => setSelectPassengerVisible(!selectPassengerVisible)}
        >
          <Text style={defaultPassengersStyle ? styles.txt : styles.txt2}>{passengersTxt}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.search}>
        <Text style={styles.searchTxt}>Search</Text>
      </TouchableOpacity>
    </View>
  );
  }
  else {
    return (
      <AppLoading 
        startAsync={fonts} 
        onFinish={() => setFont(true)}
        onError = {console.error}
      />
    );
  }
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
  logo: {
    marginTop: '12%',
    minHeight: 70,
    height: '7%',
    resizeMode: 'contain',
    alignItems: 'flex-start',
  },
  input: {
    minHeight: 50,
    height: '6%',
    width: '80%',
    backgroundColor: 'white',
    fontSize: 25,
    fontFamily: 'Manrope',

    justifyContent: 'center',
  },
  searchInput: {
    backgroundColor: 'white',
    fontSize: 25,
    fontFamily: 'Manrope',
    width: '100%',
  },
  btn: {
    backgroundColor: 'white',
    //borderRadius: 10,
    minHeight: 50,
    height: '70%',
    width: '39%',
    marginTop: '2%',
    marginBottom: '2%',
    justifyContent: 'center',
    margin: '1%'
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
  txt: {
    color: '#9c9c9c',
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'Manrope'
  },
  txt2: {
    color: 'black',
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'Manrope'
  },
  inputStyle1: {
    color: '#9c9c9c',
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'Manrope'
  },
  inputStyle2: {
    color: 'black',
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'Manrope'
  },
  search: {
    backgroundColor: '#ff5e00',
    borderRadius: 10,
    minHeight: 60,
    height: '7%',
    width: '80%',
    justifyContent: 'center',
  },
  searchTxt: {
    color: 'white',
    fontSize: 26,
    textAlign: 'center',
    fontFamily: 'Manrope',
  },
  withoutFeedback: {
    width: '100%',
    alignItems: 'center',
  },
  pncHeader: {
    color: 'black',
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Manrope',
    margin: '3%'
  },
  pncSectionHeader: {
    color: 'black',
    fontSize: 21,
    fontFamily: 'Manrope',
    margin: '3%'
  },
  passengerTypeSelection: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: '3%'
  },
  passengerType: {
    fontFamily: 'Manrope',
    fontSize: 18,
  },
  passengerTypeInfo: {
    fontFamily: 'Manrope',
    fontSize: 13,
    color: '#383838'
  },
  pncButtons: {
    flexDirection: 'row',
    marginRight: '1%',
    width:'40%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mpBtn: {
    //backgroundColor: '#ff5e00',
    backgroundColor: '#001a2d',
    height: 40,
    width: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mpBtnTxt: {
    fontFamily: 'Manrope',
    fontSize: 22,
    color: 'white',
  },
  passengelKol: {
    fontFamily: 'Manrope',
    fontSize: 20,
    color: 'black',
    marginHorizontal: '13%',
  }
});