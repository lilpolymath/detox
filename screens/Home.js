import React, {Component} from 'react';
import {
  StyleSheet,
  FlatList,
  Alert,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';
import {ListItem} from 'react-native-elements';

export class Home extends Component {
  static navigationOptions = {
    title: 'Chats',
  };

  state = {
    name: '',
    email: '',
    users: [],
  };

  UNSAFE_componentWillMount() {
    AsyncStorage.getItem('username').then(val => {
      if (val) {
        this.setState({name: val});
      }
    });
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

  saySomething = () => {
    return Alert.alert('Users', this.state.users);
  };

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
        {/* {this.saySomething} */}
        <FlatList
          data={this.state.users}
          renderItem={this.renderRow}
          keyExtractor={item => item.uid}
        />
      </SafeAreaView>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
  },
});
