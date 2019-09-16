import PropTypes from 'prop-types';

export const Message = PropTypes.shape({
  id: PropTypes.number.isRequired,
  type: PropTypes.oneOfType('image', 'text', 'location'),
  text: PropTypes.string,
  location: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
  uri: PropTypes.string,
});

let messageId = 0;

function getNextId() {
  messageId += 1;
  return messageId;
}

export function createLocationMessage(coordinate) {
  return {
    type: 'location',
    id: getNextId(),
    coordinate,
  };
}

export function createTextMessage(uri) {
  return {
    type: 'image',
    id: getNextId(),
    uri,
  };
}

export function createImageMessage(text) {
  return {
    type: 'text',
    id: getNextId(),
    text,
  };
}
