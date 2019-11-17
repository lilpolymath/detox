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
    email: '',
    errorMessage: '',
  };

  handleChange = key => val => {
    this.setState({[key]: val});
  };

  submitForm = async () => {
    try {
      await firebase.auth().sendPasswordResetEmail(this.state.email);
      this.props.navigation.navigate('Login');
    } catch (error) {
      this.setState({errorMessage: error.message});
    }
  };

  render() {
    return (
      <ImageBackground style={styles.container} source={heavy}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Forgot Password?</Text>
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

        <TouchableOpacity onPress={this.submitForm} style={styles.recoveryBtn}>
          <Text style={styles.recoveryText}>Send Email</Text>
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
    marginBottom: 15,
  },
  logo: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '300',
    color: 'white',
  },
  infoContainer: {
    marginBottom: 15,
    justifyContent: 'center',
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
  recoveryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
  },
  recoveryBtn: {
    alignItems: 'center',
    width: WIDTH * 0.8,
    height: 45,
    borderRadius: 45,
    backgroundColor: 'rgba(0,0,0,0.35)',
    marginTop: 5,
  },
});
