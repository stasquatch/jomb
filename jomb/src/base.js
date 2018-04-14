import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCOENyDLFwQki2GxE8uQVExH_uSoRxC7nI",
  authDomain: "jomb-bd835.firebaseapp.com",
  databaseURL: "https://jomb-bd835.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;
