import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import firebaseConfig from '../config';
import firebase from 'firebase';
import heavy from '../assets/snow.png';
import logo from '../assets/customer.png';

export class AuthLoadingScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Main' : 'Login');
    });
  }

  render() {
    return (
      <ImageBackground style={styles.container} source={heavy}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>
        <View>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      </ImageBackground>
    );
  }
}

export default AuthLoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: null,
    width: null,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
});
