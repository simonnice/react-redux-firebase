import { createStore, combineReducers, compose } from 'redux'
import firebase from 'firebase'
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer } from 'redux-firestore'

// Reducers
import notifyReducer from './reducers/notifyReducer'
import settingsReducer from './reducers/settingsReducer'

const firebaseConfig = {
  apiKey: "AIzaSyDcKb4gPVYgn-VWlMj2SglTokDDOvEWD_o",
  authDomain: "react-client-panel-27105.firebaseapp.com",
  databaseURL: "https://react-client-panel-27105.firebaseio.com",
  projectId: "react-client-panel-27105",
  storageBucket: "react-client-panel-27105.appspot.com",
  messagingSenderId: "155527239803",
  appId: "1:155527239803:web:ece04ae15465ad34"
}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
  // Firestore for Profile instead of Realtime DB
}

// Initialize firebase instance
firebase.initializeApp(firebaseConfig)

// Initialize firestore
const firestore = firebase.firestore

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase)
)(createStore)

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer
})

// Check for settings in localStorage
if (localStorage.getItem('settings') == null) {
  // Default
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  }

  // Set to localStorage
  localStorage.setItem('settings', JSON.stringify(defaultSettings))
}

// Create initial state
const initialState = {
  settings: JSON.parse(localStorage.getItem('settings'))
}

// Create store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
  reactReduxFirebase(firebase),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store

