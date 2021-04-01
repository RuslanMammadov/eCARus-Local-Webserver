//

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css"; //hinzugefügt, damit bootstrap funktioniert! nicht löschen"

ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.unregister();

//naja, generell nichts löschen
