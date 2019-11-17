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
import firebase from 'firebase';
import heavy from '../assets/snow.png';
import logo from '../assets/customer.png';
import Icon from 'react-native-vector-icons/Ionicons';

const {width: WIDTH} = Dimensions.get('window');

export class LoginNew extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    password: '',
    username: '',
    email: '',
    errorMessage: null,
    showPass: false,
    truthy: true,
  };

  handleChange = key => val => {
    this.setState({[key]: val});
  };

  submitForm = async () => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password);
      this.props.navigation.navigate('Main');
    } catch (error) {
      this.setState({errorMessage: error.message});
    }
  };

  // submitForm = async () => {
  //   firebase
  //     .auth()
  //     .signInWithEmailAndPassword(this.state.email, this.state.password)
  //     .catch(error => this.setState({errorMessage: error.message}));

  //   firebase.auth().onAuthStateChanged(function(user) {
  //     if (user) {
  //       this.props.navigation.navigate('Main');
  //     } else {
  //       return;
  //     }
  //   });
  // };

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
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>
        {this.state.errorMessage
          ? Alert.alert('Error', this.state.errorMessage)
          : null}
        <View style={styles.inputContainer}>
          <Icon
            name="md-person"
            size={26}
            color={'rgba(255,255,255,0.6)'}
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="white"
            style={styles.input}
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            value={this.state.email}
            onChangeText={this.handleChange('email')}
          />
        </View>

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
            value={this.state.password}
            secureTextEntry={this.state.truthy}
            onChangeText={this.handleChange('password')}
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
          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={() => this.props.navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={this.submitForm} style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Signup')}>
          <Text style={styles.loginText}>New User? Sign up</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

export default LoginNew;

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
  forgotPassword: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
  },

  forgotPasswordContainer: {
    position: 'absolute',
    right: 15,
    top: -20,
  },
  inputContainer: {
    marginBottom: 20,
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
    fontSize: 16,
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
