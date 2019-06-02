import React from "react";
import ReactDOM from "react-dom";
import Container from "./components/container/Container";
import registerServiceWorker from "./registerServiceWorker";

// css in the order we want
import "./components/app/App.css";
import "./components/inlineInputGroup/InlineInputGroup.css";
import "./components/booklist/BookList.css";
import "./components/bookDetail/BookDetail.css";
import "./components/changeHistory/ChangeHistory.css";
import "./components/tagList/TagList.css";

ReactDOM.render(<Container />, document.getElementById("root"));
registerServiceWorker();
