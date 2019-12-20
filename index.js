/**
 * @format
 */

import {AppRegistry} from 'react-native';
import AppClass from './App';
import {name as appName} from './app.json';
import LoginPage  from './login.js';
AppRegistry.registerComponent(appName, () => AppClass);
