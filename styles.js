import {StyleSheet, Dimensions} from 'react-native';

let {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fdfdfd',
  },
  imageContainer: {
    flex: 1,
    height: null,
    width: null,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageBox: {
    padding: 10,
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 13,
  },
  sendBtnText: {
    color: 'blue',
    fontSize: 20,
    alignSelf: 'center',
  },
  send: {
    paddingBottom: 10,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  messageBubble: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'rgb(16,135,255)',
    borderRadius: 20,
    width: '60%',
  },
  flatList: {
    padding: 10,
    height: height * 0.8,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  map: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
  messageList: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default styles;
