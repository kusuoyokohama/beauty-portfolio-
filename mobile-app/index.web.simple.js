import { AppRegistry } from 'react-native';
import App from './snack-app';

AppRegistry.registerComponent('atelierSixApp', () => App);
AppRegistry.runApplication('atelierSixApp', {
  rootTag: document.getElementById('root'),
});
