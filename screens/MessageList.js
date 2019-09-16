import React from 'react';
import { FlatList, StyleSheet, Image,Text, TouchableOpacity, View } from 'react-native';
import 
import styles from '../styles';

const keyExtractor = item => item.id.toString();

export default class MessageList extends React.Component {
  renderMessageItem = ({ item }) => { };

  render() {
    const { messages } = this.props;

    return (
      <FlatList
        style={styles.container}
        inverted
        renderItem={this.renderMessageItem}
        data={messages}
        keyboardShouldPersistTaps="handled"
        keyExtractor={keyExtractor}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'visible'
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 4,
    marginLeft: 60,
    marginRight: 10,
  },
  messageBubble: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'rgb(16,135,255)',
    borderRadius: 20,
  },
  text: {
    fontSize: 18,
    color: 'white'
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 16
  },
  location: {
    width: 250,
    height: 250,
    borderRadius: 16
  }
})