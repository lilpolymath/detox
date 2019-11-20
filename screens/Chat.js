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
        name: this.props.navigation.getParam('username'),
        userId: this.props.navigation.getParam('uid'),
      },
      currentUserId: '',
      username: '',
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
    this.setState({currentUserId: userId.uid});
    var users;

    firebase
      .database()
      .ref('users')
      .orderByKey()
      .equalTo(userId.uid)
      .on('child_added', function(snapshot) {
        users = snapshot.val();
      });
    this.setState({username: users.username});
    // this.setState({username: current.username});

    const userphoto = Math.floor(Math.random(0, 1) * 100);
    // https://ui-avatars.com/api/?background=d88413&color=FFF&name=$

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
          name: username,
          avatar: `https://randomuser.me/api/portraits/thumb/men/${userphoto}.jpg`,
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

    console.log(
      'https://randomuser.me/api/portraits/thumb/men/{userphoto}.jpg',
    );
  };

  handleChange = key => val => {
    this.setState({[key]: val});
  };

  sendMessage = (messages = []) => {
    // for (let i = 0; i < messages.length; i++) {
    const {text, user} = messages[0];
    const message = {
      message: text,
      from: user._id,
      time: firebase.database.ServerValue.TIMESTAMP,
      username: user.name,
    };
    console.log(user);
    let msgId = firebase
      .database()
      .ref('messages')
      .child(this.state.currentUserId)
      .child(this.state.person.userId)
      .push().key;
    let updates = {};
    updates[
      'messages/' +
        this.state.currentUserId +
        '/' +
        this.state.person.userId +
        '/' +
        msgId
    ] = message;
    updates[
      'messages/' +
        this.state.person.userId +
        '/' +
        this.state.currentUserId +
        '/' +
        msgId
    ] = message;
    firebase
      .database()
      .ref()
      .update(updates);
    // }
  };

  render() {
    return (
      <GiftedChat
        messages={this.state.messageList}
        onSend={this.sendMessage}
        user={{_id: this.state.currentUserId, name: this.state.username}}
        showAvatarForEveryMessage={false}
        showUserAvatar
      />
    );
  }
}

export default Chat;
