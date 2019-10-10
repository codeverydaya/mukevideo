/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import AppContainer from "./rnsrc/navigation/appcontainer";
AppRegistry.registerComponent(appName, () => AppContainer);
