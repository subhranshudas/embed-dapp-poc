const Helpers = {
  createMsgPayload(msg) {
    return {
        msg,
        timestamp: Date.now(),
        msgCode: 'EPNS_SDK_IFRAME_TO_PARENT_MSG' // this has to be picked from the SDK
    };
  },
  pusblishMsgToSDK(msgPayload) {
    try {
        window.top.postMessage(JSON.stringify(msgPayload), '*');
    } catch (error) {
        console.warn('[embed-dapp] something went wrong while passing msg to SDK');
    }
  }
}

export default Helpers;