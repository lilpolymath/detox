import React, {Component} from 'react';
import {
  ImageBackground,
  Image,
  TextInput,
  Text,
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';
import heavy from '../assets/snow.png';
import logo from '../assets/customer.png';
import Icon from 'react-native-vector-icons/Ionicons';

const {width: WIDTH} = Dimensions.get('window');

export class Signup extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    username: '',
    email: '',
    cPass: '',
    showPass: false,
    truthy: true,
    errorMessage: null,
    avatar: '',
  };

  writeUserData = (userId, name, email) => {
    firebase
      .database()
      .ref('users/' + userId)
      .set({
        username: name,
        email: email,
      })
      .then(() => this.props.navigation.navigate('Login'));
  };

  handleChange = key => val => {
    this.setState({[key]: val});
  };

  submitForm = async () => {
    if (this.state.email.length < 4) {
      Alert.alert('Error', 'Name too short..');
    } else {
      // Set multiple items into Asyncstorage
      await AsyncStorage.setItem('username', this.state.username);
      await AsyncStorage.setItem('phone', this.state.cPass);
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.cPass)
        .catch(error => this.setState({errorMessage: error.message}));
      // .database()
      // .ref('users/' + this.state.email)
      // .set({name: this.state.username})
      var userId = firebase.auth().currentUser;
      // userId.updateProfile({displayName: this.state.username});
      this.writeUserData(userId.uid, this.state.username, this.state.email);
    }
  };

  showPassword = () => {
    if (this.state.showPass === false) {
      this.setState({truthy: false, showPass: true});
    } else {
      this.setState({truthy: true, showPass: false});
    }
  };

  render() {
    return (
      <ImageBackground style={styles.container} source={heavy}>
        {this.state.errorMessage
          ? Alert.alert('Error', this.state.errorMessage)
          : null}
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.logoText}>DETOX</Text>
        </View>
        <View style={styles.inputContainer}>
          <Icon
            name="md-person"
            size={26}
            color={'rgba(255,255,255,0.6)'}
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Email Address"
            placeholderTextColor="white"
            style={styles.input}
            underlineColorAndroid="transparent"
            value={this.state.email}
            onChangeText={this.handleChange('email')}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon
            name="md-person"
            size={26}
            color={'rgba(255,255,255,0.6)'}
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Username"
            placeholderTextColor="white"
            style={styles.input}
            underlineColorAndroid="transparent"
            value={this.state.username}
            onChangeText={this.handleChange('username')}
          />
        </View>

        {/* Password */}
        <View style={styles.inputContainer}>
          <Icon
            name="md-lock"
            size={26}
            color={'rgba(255,255,255,0.6)'}
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="white"
            style={styles.input}
            underlineColorAndroid="transparent"
            keyboardType="number-pad"
            value={this.state.cPass}
            secureTextEntry={this.state.truthy}
            onChangeText={this.handleChange('cPass')}
          />
          <TouchableOpacity
            onPress={this.showPassword}
            style={styles.passwordIcon}>
            <Icon
              name={this.state.showPass === false ? 'md-eye' : 'md-eye-off'}
              size={26}
              color={'rgba(255,255,255,0.6)'}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={this.submitForm} style={styles.loginBtn}>
          <Text style={styles.loginText}>SIGN UP</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

export default Signup;

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
  logoText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'beige',
    marginTop: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.35)',
    color: 'white',
    width: WIDTH * 0.8,
    borderRadius: 25,
    paddingLeft: 50,
    marginBottom: 12,
  },
  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 20,
  },
  passwordIcon: {
    position: 'absolute',
    top: 9,
    right: 20,
  },
  loginText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    marginTop: 10,
  },
  loginBtn: {
    alignItems: 'center',
    width: WIDTH * 0.8,
    height: 45,
    borderRadius: 45,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
});
