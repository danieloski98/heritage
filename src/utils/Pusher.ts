import Pusher from 'pusher-js/react-native';

Pusher.logToConsole = true;

var pusher = new Pusher('8b7a3aa9d2c977813906', {
    cluster: 'eu'
});

export default pusher;