import './App.css';
import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { utils, api } from "@epnsproject/frontend-sdk-staging";
import { DEFAULT_NOTIFICATIONS } from "./data";

import Helpers from './helpers';
import EmbedView from './components/EmbedView';


const PAGINATION_PARAMS = {
  page: 1,
  itemsPerPage: 20,
};

const BASE_URL = "https://backend-kovan.epns.io/apis";


function App() {
  const { active, account } = useWeb3React();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    Helpers.pusblishMsgToSDK(
      Helpers.createMsgPayload('EMBED APP LOADED...')
    );
  }, []);

  /**
   * Fetch notifications for the user
   */
    useEffect(() => {
      if (!active) return;
      // on page load, fetch all the notifications
      api
        .fetchNotifications(
          account,
          PAGINATION_PARAMS.itemsPerPage,
          PAGINATION_PARAMS.page,
          BASE_URL
        )
        .then((notificationsData) => {
          const { results } = notificationsData || {};
          const response = utils.parseApiResponse([
            ...results,
            ...DEFAULT_NOTIFICATIONS,
          ]);
          console.log({ unparsed: results });
          console.log({ parsed: response });
          setNotifications(response);
        });
    }, [active]);

  return (
    <EmbedView headerText="My custom header" notifications={notifications} />
  );
}

export default App;
