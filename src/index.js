import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ethers } from "ethers";
import { Web3ReactProvider } from "@web3-react/core";
import { SDKContext } from './context';
import Helpers from './helpers';

const root = ReactDOM.createRoot(document.getElementById('root'));

function getLibrary(provider) {
  const gottenProvider = new ethers.providers.Web3Provider(provider, "any"); // this will vary according to whether you use e.g. ethers or web3.js
  return gottenProvider;
}

const MainAPP = () => {
  const [appConfig, setAppConfig] = useState({});

  function onMessageEventListener(evt) {
    try {
      if (typeof evt.data === 'string') {
        const publishedMessage = JSON.parse(evt.data);
        if (publishedMessage && publishedMessage.msgCode === 'EPNS_SDK_PARENT_TO_IFRAME_MSG') {
          if (publishedMessage.msgType === 'SDK_CONFIG_INIT') {
            console.warn("SDK_CONFIG_INIT in app: ", publishedMessage.msg);
            setAppConfig(publishedMessage.msg);
          }
        }
      }
    } catch (err) {
      console.error('something went wrong parsing IFRAME message to the APP.')
    }
  }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async() => {
    window.addEventListener('message', onMessageEventListener, false);

    Helpers.pusblishMsgToSDK(
      Helpers.createMsgPayload({ msg: ' IFRAME sAPP loaded', msgType: 'IFRAME_APP_LOADED' })
    );      

    return () => {
      window.removeEventListener('message', onMessageEventListener, false);
    }
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

root.render(<MainAPP />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
