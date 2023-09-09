import * as React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Button } from "@react-native-material/core";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ColorfulTabBar } from 'react-navigation-tabbar-collection';
import Toast from 'react-native-toast-message';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFileLines, faWifi, faPencil, faRightFromBracket, faBars } from '@fortawesome/free-solid-svg-icons';

import SetDataScreen from './src/screens/SetDataScreen';
import RunConfigurationScreen from './src/screens/RunConfigurationScreen';
import EditScreen from './src/screens/EditScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import ShowMACScreen from './src/screens/ShowMACScreen';
import { logOut, userIsLogged } from './src/functions/permissions';


const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function BottomTabsNavigator({ navigation }) {
  return (
    <>
    <View style={{height: 20}} />
    <View style={style.container_row_title}>
      <Image
        source={require('./assets/img/uned.jpg')}
        resizeMode='contain'
        style={style.image}
      />
      <Button
        title={props => <FontAwesomeIcon icon={ faRightFromBracket } {...props} color={'black'} size={20} />}
        onPress={() => logOut()}
        style={style.button_sidebar}
      />
      <Button
        title={props => <FontAwesomeIcon icon={ faBars } {...props} color={'black'} size={20} />}
        onPress={() => navigation.openDrawer()}
        style={style.button_sidebar}
      />
    </View>
    <Tab.Navigator
        initialRouteName="SetDataScreen"
        tabBar={(props) => <ColorfulTabBar {...props} height={70} darkMode={false} />}
    >
      <Tab.Screen
          name="SetDataScreen"
          component={SetDataScreen}
          options={{
            tabBarLabel: 'Set data',
            icon: ({ color, size }) => (
                <FontAwesomeIcon icon={faFileLines} size={size} color={color} />
            ),
            color: 'info',
            headerShown: false,
            unmountOnBlur: true
          }}
        />
      <Tab.Screen
            name="RunConfigurationScreen"
            component={RunConfigurationScreen}
            options={{
              tabBarLabel: 'Configure',
              icon: ({ color, size }) => (
                  <FontAwesomeIcon icon={faWifi} size={size} color={color} />
              ),
              color: 'info',
              headerShown: false,
              unmountOnBlur: true
            }}
          />
      <Tab.Screen
          name="EditScreen"
          component={EditScreen}
          options={{
            tabBarLabel: 'Edit',
            icon: ({ color, size }) => (
                <FontAwesomeIcon icon={faPencil} size={size} color={color} />
            ),
            color: 'info',
            headerShown: false,
            unmountOnBlur: true
          }}
        />
      </Tab.Navigator>
      </>
    )
}

const App = () => {

  const logged = userIsLogged();
  return (
    logged && (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName={'Main functions'}>
          <Drawer.Screen name={'Main functions'} component={ BottomTabsNavigator } options={{ headerShown: false }} />
          <Drawer.Screen name={'Show mac addresses'} component={ ShowMACScreen } options={{ headerShown: false, unmountOnBlur: true }} />
        </Drawer.Navigator>
        <Toast refs={(refs) => Toast.setRef(refs)} />
      </NavigationContainer>
    ) || !logged && (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName='onboarding'>
          <Drawer.Screen name='onboarding' component={ OnboardingScreen }  options={{ headerShown: false, unmountOnBlur: true }} />
          <Drawer.Screen name='login' component={ LoginScreen }  options={{ headerShown: false, unmountOnBlur: true }} />
          <Drawer.Screen name='register' component={ RegisterScreen }  options={{ headerShown: false, unmountOnBlur: true }} />
        </Drawer.Navigator>
      </NavigationContainer>
    )
  );
};
export default App;

const style = StyleSheet.create({
  container_row_title: {
    padding: 5,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: '10%'
  },
  image: {
    width: 206,
    height: 66,
    marginTop: 0,
    alignSelf: 'center',
  },
  small_image: {
    width: 35,
    height: 35
  },
  small_image_qr: {
    width: 28,
    height: 28
  },
  button_sidebar: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    elevation: 10,
    height: 40,
    width: 40,
  },
})