import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/App";
import registerServiceWorker from "./registerServiceWorker";

// css in the order we want
import "./components/app/App.css";
import "./components/inlineInputGroup/InlineInputGroup.css";
import "./components/booklist/BookList.css";
import "./components/bookTile/BookTile.css";
import "./components/bookDetail/BookDetail.css";
import "./components/changeHistory/ChangeHistory.css";
import "./components/tagList/TagList.css";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
