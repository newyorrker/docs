import MobileAppChangeButtonMessage from '@/models/MobileAppChangeButtonMessage';

const changeButtons = (messages: MobileAppChangeButtonMessage[]) => {
  const stringifiedMessages = JSON.stringify(messages);
  if (window.webkit !== undefined) {
    if (window.webkit.messageHandlers.changeButtons !== undefined) {
      window.webkit.messageHandlers.changeButtons.postMessage(stringifiedMessages); // iOS way
    }
  }

  if (window.actor !== undefined) {
    window.actor.changeButtons(stringifiedMessages); // Android way
  }
};

const closeActor = () => {
  if (window.webkit != undefined) {
    if (window.webkit.messageHandlers.actor != undefined) {
      window.webkit.messageHandlers.actor.postMessage('close'); // iOS way
    }
  }
  if (window.actor != undefined) {
    window.actor.postMessage('close'); // Android way
  }
};

const reloadPage = () => {
  if (window.webkit != undefined) {
    if (window.webkit.messageHandlers.actor != undefined) {
      document.location.reload(); // iOS way
    }
  }
  if (window.actor != undefined) {
    window.appercode.reloadPage(); // Android way
  }
};

const refreshSession = () => {
  if (window.webkit != undefined) {
    if (window.webkit.messageHandlers.session != undefined) {
      window.webkit.messageHandlers.session.postMessage('refresh');
    }
  }
  if (window.session != undefined) {
    window.session.postMessage('refresh');
  }
};

export { changeButtons, closeActor, refreshSession, reloadPage };
