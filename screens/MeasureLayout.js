import React, {Component} from 'react';
import {Platform, StyleSheet, View, NativeModules} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles';
const {StatusBarManager} = NativeModules;

export default class MeasureLayout extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  state = {
    layout: null,
  };

  handleLayout = event => {
    const {
      nativeEvent: {layout},
    } = event;

    this.setState({
      layout: {
        ...layout,
        y: layout.y + (Platform.OS === 'android' ? StatusBarManager.HEIGHT : 0),
      },
    });
  };

  render() {
    const {children} = this.props;
    const {layout} = this.state;

    if (!layout) {
      return <View onLayout={this.handleLayout} style={styling.container} />;
    }
  }
}

const styling = StyleSheet.create({
  container: {
    flex: 1,
  },
});
