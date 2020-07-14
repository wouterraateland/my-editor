import "./index.scss";
import React from "react";
import ReactDOM from "react-dom";

import App from "containers/App";

const root = document.getElementById("root");
const Root = <App />;

ReactDOM.unstable_createRoot(root).render(Root);
