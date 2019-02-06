document.addEventListener('deviceready', onDeviceReady);

function onDeviceReady() {
  console.log('aa');
}

customElements.define('chat-messages-page', ChatMessagesPage);
customElements.define('config-page', ConfigPage);