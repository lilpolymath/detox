import React, {Component} from 'react';
import {StyleSheet, FlatList, SafeAreaView} from 'react-native';
import firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';
import {ListItem} from 'react-native-elements';

export class Home extends Component {
  static navigationOptions = {
    title: 'Chats',
  };

  state = {
    email: '',
    users: [],
  };

  componentDidMount() {
    let dbRef = firebase.database().ref('users');
    var userId = firebase.auth().currentUser;
    dbRef.on('child_added', val => {
      let person = val.val();
      person.uid = val.key;
      if (person.uid === userId.uid) {
        this.setState({email: userId.email});
      } else {
        this.setState(prevState => {
          return {users: [...prevState.users, person]};
        });
      }
    });
  }

  keyExtractor = (item, index) => index.toString();

  __logOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  renderRow = ({item}) => {
    return (
      <ListItem
        title={item.username}
        subtitle={item.subtitle}
        leftAvatar={{
          source: item.avatar_url && {uri: item.avatar_url},
          title: item.username[0],
        }}
        bottomDivider
        chevron
        onPress={() => this.props.navigation.navigate('Chat', item)}
      />
    );
  };

  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.state.users}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
        />
      </SafeAreaView>
    );
  }
}

export default Home;
