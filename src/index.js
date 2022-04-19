import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ethers } from "ethers";
import { Web3ReactProvider } from "@web3-react/core";
import { SDKContext } from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));

function getLibrary(provider) {
  const gottenProvider = new ethers.providers.Web3Provider(provider, "any"); // this will vary according to whether you use e.g. ethers or web3.js
  return gottenProvider;
}

const MainAPP = () => {
  const [appConfig, setAppConfig] = useState({});
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async() => {
    async function getConfig() {
      const cfg = window.localStorage.getItem('EPNS_SDK_CONFIG');
      return cfg;
    }

    const cfg = await getConfig();
    setAppConfig(cfg);
  }, []);

  return (
    <React.StrictMode>
      <SDKContext.Provider value={appConfig}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <App />
        </Web3ReactProvider>
      </SDKContext.Provider>
    </React.StrictMode>
  );
};

root.render(MainAPP);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
