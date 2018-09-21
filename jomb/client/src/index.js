import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/App";
import registerServiceWorker from "./registerServiceWorker";

// css in the order we want
import "./components/app/App.css";
import "./components/search/Search.css";
import "./components/booklist/BookList.css";
import "./components/bookTile/BookTile.css";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
