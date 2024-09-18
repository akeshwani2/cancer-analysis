import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import {PrivyProvider} from "@privy-io/react-auth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <PrivyProvider
      appId="cm14g6u2807yseaq4e6f8ur5o"
      config={{
        appearance: {
          theme: 'dark',
        },
      }}
    >
      <Router>
        <App />
      </Router>
    </PrivyProvider>
);