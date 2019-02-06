class ChatMessagesPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <ion-content>
        <ion-list>
          <ion-item>
            <ion-label>João</ion-label>
            <ion-badge slot="end" color="success">5</ion-badge>
          </ion-item>
          <ion-item>
            <ion-label>Miguel</ion-label>
            <ion-badge slot="end" color="success">3</ion-badge>
          </ion-item>
          <ion-item>
            <ion-label>Santos</ion-label>
            <ion-badge slot="end" color="success">0</ion-badge>
          </ion-item>
        </ion-list>
      </ion-content>`
  }
}