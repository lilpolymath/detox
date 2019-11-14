import React, {Component} from 'react';
import firebase from 'firebase';
import snow from '../assets/snow.png';
import {GiftedChat} from 'react-native-gifted-chat';

export class Chat extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('username'),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      person: {
        name: this.props.navigation.getParam('email'),
        userId: this.props.navigation.getParam('uid'),
      },
      name: '',
      phone: '',
      messageList: [],
    };
  }

  UNSAFE_componentWillMount() {
    var userId = firebase.auth().currentUser;
    this.setState({name: userId.uid});
    this.loadMessages();
  }

  componentWillUnmount() {
    firebase
      .database()
      .ref('messages')
      .off();
  }

  loadMessages = () => {
    var userId = firebase.auth().currentUser;
    this.setState({name: userId.uid});
    firebase
      .database()
      .ref('messages')
      .child(userId.uid)
      .child(this.state.person.userId)
      .limitToLast(20)
      .on('child_added', snapshot => {
        const {from, message, time, username} = snapshot.val();
        const {key: _id} = snapshot;
        const user = {
          _id: from,
          avatar: `https://ui-avatars.com/api/?background=d88413&color=FFF&name=${username}`,
        };
        const parsed = {
          _id,
          text: message,
          createdAt: new Date(time),
          user,
        };
        this.setState(prevState => ({
          messageList: GiftedChat.append(prevState.messageList, parsed),
        }));
      });
  };

  handleChange = key => val => {
    this.setState({[key]: val});
  };

  sendMessage = messages => {
    for (let i = 0; i < messages.length; i++) {
      const {text, user} = messages[i];
      const message = {
        message: text,
        from: user._id,
        time: firebase.database.ServerValue.TIMESTAMP,
      };
      let msgId = firebase
        .database()
        .ref('messages')
        .child(this.state.name)
        .child(this.state.person.userId)
        .push().key;
      let updates = {};
      updates[
        'messages/' +
          this.state.name +
          '/' +
          this.state.person.userId +
          '/' +
          msgId
      ] = message;
      updates[
        'messages/' +
          this.state.person.userId +
          '/' +
          this.state.name +
          '/' +
          msgId
      ] = message;
      firebase
        .database()
        .ref()
        .update(updates);
    }
  };

  render() {
    return (
      <GiftedChat
        messages={this.state.messageList}
        onSend={this.sendMessage}
        user={{_id: this.state.name}}
      />
    );
  }
}

export default Chat;
