import { useEffect } from 'react';
import './App.css';
import Helpers from './helpers';
import EmbedView from './components/EmbedView';

function App() {
  useEffect(() => {
    Helpers.pusblishMsgToSDK(
      Helpers.createMsgPayload('EMBED APP LOADED...')
    );
  }, []);

  return (
    <EmbedView />
  );
}

export default App;
