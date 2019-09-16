import React, {Component} from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Text,
  View,
  FlatList,
  Dimensions,
} from 'react-native';
import firebase from 'firebase';
import styles from '../styles';
import User from '../constants';
import KeyboardState from './KeyboardState';
import MeasureLayout from './MeasureLayout';
import MessageContainer, {INPUT_METHOD} from './MessageContainer';

export class Chat extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('name', null),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      person: {
        name: this.props.navigation.getParam('name'),
        phone: this.props.navigation.getParam('phone'),
      },
      messages: '',
      messageList: [],
      inputMethod: INPUT_METHOD.NONE,
    };
  }

  componentWillMount() {
    firebase
      .database()
      .ref('messages')
      .child(User.phoneNum)
      .child(this.state.person.phone)
      .on('child_added', value => {
        this.setState(prevState => {
          return {
            messageList: [...prevState.messageList, value.val()],
          };
        });
      });
  }

  handleChangeInputMethod = inputMethod => {
    this.setState({inputMethod});
  };

  handleChange = key => val => {
    this.setState({[key]: val});
  };

  sendMessage = () => {
    if (this.state.messages.length > 0) {
      let msgId = firebase
        .database()
        .ref('messages')
        .child(User.phoneNum)
        .child(this.state.person.phone)
        .push().key;
      let updates = {};
      let message = {
        message: this.state.messages,
        time: firebase.database.ServerValue.TIMESTAMP,
        from: User.phoneNum,
      };
      updates[
        'messages/' +
          User.phoneNum +
          '/' +
          this.state.person.phone +
          '/' +
          msgId
      ] = message;
      updates[
        'messages/' +
          this.state.person.phone +
          '/' +
          User.phoneNum +
          '/' +
          msgId
      ] = message;
      firebase
        .database()
        .ref()
        .update(updates);
      this.setState({messages: ''});
    }
  };

  convertTime = time => {
    let d = new Date(time);
    let c = new Date();
    let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
    result += d.getMinutes() < 10 ? '0' : '' + d.getMinutes();
    if (c.getDay() !== d.getDay()) {
      result += d.getDay() + ' ' + d.getMonth() + ' ' + result;
    }
    return result;
  };

  renderRow = ({item}) => {
    return (
      <View
        style={{
          paddingVertical: 5,
          paddingHorizontal: 10,
          backgroundColor: 'rgb(16,135,255)',
          borderRadius: 20,
          flexDirection: 'row',
          width: '60%',
          alignSelf: item.from === User.phoneNum ? 'flex-end' : 'flex-start',
          backgroundColor: item.from === User.phoneNum ? 'blue' : 'red',
          marginBottom: 10,
        }}>
        <Text style={{color: '#fff', padding: 7, fontSize: 16}}>
          {item.message}
        </Text>
        <Text style={{color: '#eee', padding: 5, fontSize: 12}}>
          {this.convertTime(item.time)}
        </Text>
      </View>
    );
  };

  render() {
    const {inputMethod} = this.state;
    let {height, width} = Dimensions.get('window');
    return (
      <SafeAreaView>
        <MeasureLayout>
          {layout => (
            <KeyboardState layout={layout}>
              {keyboardInfo => (
                <MessageContainer
                  {...keyboardInfo}
                  inputMethod={inputMethod}
                  onChangeInputMethod={this.handleChangeInputMethod}
                  // renderInputMethodEditor={this.renderInputMethodEditor}
                >
                  <FlatList
                    style={{padding: 10, height: height * 0.8}}
                    data={this.state.messageList}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                  />

                  <View style={styles.bottomContainer}>
                    <TextInput
                      style={styles.messageBox}
                      value={this.state.messages}
                      onChangeText={this.handleChange('messages')}
                      placeholder="Send a message..."
                    />
                    <TouchableOpacity
                      onPress={this.sendMessage}
                      style={styles.send}>
                      <Text style={styles.sendBtnText}>Send</Text>
                    </TouchableOpacity>
                  </View>
                </MessageContainer>
              )}
            </KeyboardState>
          )}
        </MeasureLayout>
      </SafeAreaView>
    );
  }
}

export default Chat;
