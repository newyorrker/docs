export function callRelogin() {
  if (window.webkit != undefined) {
    if (window.webkit.messageHandlers.session != undefined) {
      window.webkit.messageHandlers.session.postMessage("refresh");
    }
  }
  if (window.session != undefined) {
    window.session.postMessage("");
  }
}
