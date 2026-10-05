import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/app";
// @ts-expect-error: CSS is handled by the bundler at runtime.
import "./styles/index.css";
ReactDOM.createRoot(document.getElementById("root")).render(<React.StrictMode>
    <App />
  </React.StrictMode>);
export default App;
