import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, TextInput, Text, TouchableOpacity, Modal, Alert, ActivityIndicator } from 'react-native';
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

  const [passengersTxt, setPassengersTxt] = useState("1, economy");
  //const [defaultPassengersStyle, setDefaultPassengersStyle] = useState(true);

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  const [defaultEconomyStyle, setDefaultEconomyStyle] = useState(false);
  const [defaultComfortStyle, setDefaultComfortStyle] = useState(true);
  const [defaultBusinessStyle, setDefaultBusinessStyle] = useState(true);
  const [defaultFirstClassStyle, setDefaultFirstClassStyle] = useState(true);

  const [adultsNum, setAdultsNum] = useState(1);
  const [childrenNum, setChildrenNum] = useState(0);
  const [infantsNum, setInfantsNum] = useState(0);

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
    //setSelectDateVisible(!selectDateVisible);
    setDateTxt(day.day + ' ' + monthNames[day.month - 1]);
  }

  function chooseCls(cls) {
    setDefaultEconomyStyle(true)
    setDefaultComfortStyle(true)
    setDefaultBusinessStyle(true)
    setDefaultFirstClassStyle(true)

    if (cls == 0) {
      setDefaultEconomyStyle(false)
    }
    else if (cls == 1) {
      setDefaultComfortStyle(false)
    }
    else if (cls == 2) {
      setDefaultBusinessStyle(false)
    }
    else {
      setDefaultFirstClassStyle(false)
    }
  }

  function changePassengersNum(change, type) {
    if (change == 0) {
      if (type == 0) {
        if (adultsNum > 1)
          setAdultsNum(adultsNum - 1)
      }
      else if (type == 1) {
        if (childrenNum != 0)
          setChildrenNum(childrenNum - 1)
      } 
      else if (type == 2) {
        if (infantsNum != 0)
          setInfantsNum(infantsNum - 1)
      } 
    }
    else if (change == 1) {
      if (adultsNum + childrenNum + infantsNum < 9) {
        if (type == 0) {
          setAdultsNum(adultsNum + 1)
        }
        else if (type == 1) {
          setChildrenNum(childrenNum + 1)
        } 
        else if (type == 2) {
          if (infantsNum < adultsNum)
            setInfantsNum(infantsNum + 1)
          else {
            Alert.alert("Warning","Number of infants on laps cannot be more than number of adults")
          }
        }
      }
    }
  }

  function pncDone() {
    setSelectPassengerVisible(!selectPassengerVisible);
    if (defaultEconomyStyle == false) {
      setPassengersTxt(adultsNum + childrenNum + infantsNum + ', economy')
    }
    else if (defaultComfortStyle == false) {
      setPassengersTxt(adultsNum + childrenNum + infantsNum + ', comfort')
    }
    else if (defaultBusinessStyle == false) {
      setPassengersTxt(adultsNum + childrenNum + infantsNum + ', business')
    }
    else {
      setPassengersTxt(adultsNum + childrenNum + infantsNum + ', first class')
    }
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

  //const [isLoading, setLoading] = useState(true);
  const [airports, setAirports] = useState([]);

  const getAirports = async () => {
    try {
      //const response = await fetch('http://192.168.1.64:4545/airports');
      const response = await fetch('http://192.168.155.29:4545/airports');
      const json = await response.json();
      setAirports(json);
      //console.log(json);
    } 
    catch (error) {
      console.error(error);
    }
    finally {
      //setLoading(false);
      /*
      for (var i = 0; i < airports.length; i++) {
        airports[i].shown = 1;
      }*/
    }
  }

  useEffect(() => {
    getAirports();
    //setAirports(airports);
  }, []);

  function filterAirports(text) {
    text = text.toLowerCase();
    for (var i = 0; i < airports.length; i++) {
      if (airports[i].city.toLowerCase().search(text) == -1 && airports[i].apName.toLowerCase().search(text) == -1 && airports[i].apCode.toLowerCase().search(text) == -1) {
        airports[i].shown = 0;
      }
      else {
        airports[i].shown = 1;
      }
    }
    console.log(airports);
  }


  if (font) {
  return (

    <View style={styles.container}>
      <Modal
        animationType="slide"
        visible={fromModalVisible}
        presentationStyle={'fullScreen'}
        onRequestClose={() => setFromModalVisible(!fromModalVisible)}>
      {/*{isLoading ? <ActivityIndicator/> : ( */}
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
              onChangeText={(text) => filterAirports(text)}
            ></TextInput>
          </View>

          {airports.map((apInfo) => {
          return (
            <TouchableOpacity 
              style={apInfo.shown ? styles.chooseAirportContainer : {backgroundColor: 'black'}}
              onPress = {() => chooseAirport(apInfo.city,0)}
              key={apInfo.id}>
              <View style={styles.airportContainer}>
                <View style={styles.airportInfo}>
                  <Text style={styles.city}>{apInfo.city}</Text>
                  <Text style={styles.airportName}>{apInfo.apName}</Text>
                </View>
                <View style={styles.apCodeContainer}>
                  <Text style={styles.apCode}>{apInfo.apCode}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
          })}

        </View>
      {/*})} */}
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

          {airports.map((apInfo) => {
          return (
              <TouchableOpacity 
                style={styles.chooseAirportContainer}
                onPress = {() => chooseAirport(apInfo.city,1)}
                key={apInfo.id}>
                <View style={styles.airportContainer}>
                  <View style={styles.airportInfo}>
                    <Text style={styles.city}>{apInfo.city}</Text>
                    <Text style={styles.airportName}>{apInfo.apName}</Text>
                  </View>
                  <View style={styles.apCodeContainer}>
                    <Text style={styles.apCode}>{apInfo.apCode}</Text>
                  </View>
                </View>
              </TouchableOpacity>
           
          );})}

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
          borderTopColor: 'black',
          borderTopWidth: 1,
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
          <TouchableOpacity 
          style={styles.doneBtn}
          onPress={() => setSelectDateVisible(!selectDateVisible)}>
            <Text style={styles.doneTxt}>Done</Text>
          </TouchableOpacity>
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
          borderTopColor: 'black',
          borderTopWidth: 1,
        }}>
          <Text style={styles.pncHeader}>Passengers and class</Text>
          <Text style={styles.pncSectionHeader}>Passengers</Text>

          <View style={styles.passengerTypeSelection}>
            <View style={{marginLeft:'3%', width:'54%'}}>
              <Text style={styles.passengerType}>Adults</Text>
              <Text style={styles.passengerTypeInfo}>Over 12 years old</Text>
            </View>
            <View style={styles.pncButtons}>
              <TouchableOpacity 
              onPress={() => changePassengersNum(0,0)}
              style={styles.mpBtn}>
                <Text style={styles.mpBtnTxt}>-</Text>
              </TouchableOpacity>
              <View style={styles.passengelKolContainer}>
                <Text style={styles.passengelKol}>{adultsNum}</Text>
              </View>
              <TouchableOpacity 
              onPress={() => changePassengersNum(1,0)}
              style={styles.mpBtn}>
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
              <TouchableOpacity 
              onPress={() => changePassengersNum(0,1)}
              style={styles.mpBtn}>
                <Text style={styles.mpBtnTxt}>-</Text>
              </TouchableOpacity>
              <View style={styles.passengelKolContainer}>
                <Text style={styles.passengelKol}>{childrenNum}</Text>
              </View>
              <TouchableOpacity 
              onPress={() => changePassengersNum(1,1)}
              style={styles.mpBtn}>
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
              <TouchableOpacity 
              onPress={() => changePassengersNum(0,2)}
              style={styles.mpBtn}>
                <Text style={styles.mpBtnTxt}>-</Text>
              </TouchableOpacity>
              <View style={styles.passengelKolContainer}>
                <Text style={styles.passengelKol}>{infantsNum}</Text>
              </View>
              <TouchableOpacity 
              onPress={() => changePassengersNum(1,2)}
              style={styles.mpBtn}>
                <Text style={styles.mpBtnTxt}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.pncSectionHeader}>Class</Text>
          <View style={styles.selectClass}>
            <TouchableOpacity 
            onPress={() => chooseCls(0)}
            style={defaultEconomyStyle ? [styles.cls, {borderTopLeftRadius: 10, borderBottomLeftRadius: 10}] : [styles.chosenCls, {borderTopLeftRadius: 10, borderBottomLeftRadius: 10}]}>
              <Text 
              style={defaultEconomyStyle ? styles.clsTxt : [styles.clsTxt, {color: 'white'}]}>Economy</Text></TouchableOpacity>
            <TouchableOpacity 
            onPress={() => chooseCls(1)}
            style={defaultComfortStyle ? styles.cls : styles.chosenCls}>
              <Text 
              style={defaultComfortStyle ? styles.clsTxt : [styles.clsTxt, {color: 'white'}]}>Comfort</Text></TouchableOpacity>
            <TouchableOpacity 
            onPress={() => chooseCls(2)}
            style={defaultBusinessStyle ? styles.cls : styles.chosenCls}>
              <Text 
              style={defaultBusinessStyle ? styles.clsTxt : [styles.clsTxt, {color: 'white'}]}>Business</Text></TouchableOpacity>
            <TouchableOpacity 
            onPress={() => chooseCls(3)}
            style={defaultFirstClassStyle ? [styles.cls, {borderTopRightRadius: 10, borderBottomRightRadius: 10}] : [styles.chosenCls, {borderTopRightRadius: 10, borderBottomRightRadius: 10}]}>
              <Text 
              style={defaultFirstClassStyle ? styles.clsTxt : [styles.clsTxt, {color: 'white'}]}>First Class</Text></TouchableOpacity>
          </View>
          <TouchableOpacity 
          style={styles.doneBtn}
          onPress={() => pncDone()}>
            <Text style={styles.doneTxt}>Done</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <StatusBar style="light"/>
      <Image
        style={styles.logo}
        source={require('./assets/logo.png')}
      />

      <TouchableOpacity 
        style={[styles.input,{marginTop: '2%', borderTopLeftRadius: 10, borderTopRightRadius: 10}]}
        onPress={() => setFromModalVisible(!fromModalVisible)}>
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
          <Text style={styles.txt2}>{passengersTxt}</Text>
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
    marginTop: '1%'
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
  doneBtn: {
    height: 60,
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: 'black',
    borderTopWidth: 1,
  },
  doneTxt: {
    fontFamily: 'Manrope',
    fontSize: 20,
    color: 'black',
  },
  pncHeader: {
    color: 'black',
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Manrope',
    margin: '3%',
    
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
  passengelKolContainer: {
    width: 55,
    alignItems: 'center',
    justifyContent: 'center'
  },
  passengelKol: {
    fontFamily: 'Manrope',
    fontSize: 20,
    color: 'black',
    marginHorizontal: '13%',
    //alignItems: 'center'
  },
  selectClass: {
    //backgroundColor: 'black',
    alignSelf: 'center',
    
    flexDirection: 'row',
    width: '95%',
    marginBottom: 15

    /*
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
    height: 40,
    */
  },
  cls: {
    backgroundColor: '#e6e6e6',
    height: 40,
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',

    //borderColor: 'black',
    //borderWidth: 1
  },
  chosenCls: {
    backgroundColor: '#001a2d',
    color: 'white',
    height: 40,
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clsTxt: {
    fontFamily: 'Manrope',
    fontSize: 17,
    color: 'black'
  }
});