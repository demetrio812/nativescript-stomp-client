import {Observable} from 'tns-core-modules/data/observable';

export interface StompClientCallback {
    stompClientDidDisconnect(client: StompClientCommon)

    stompClientDidConnect(client: StompClientCommon)

    stompClientDidReceiveMessage(client: StompClientCommon, destination: string, jsonBody: string)

    serverDidSendReceipt(client: StompClientCommon, receiptId: string)

    serverDidSendError(client: StompClientCommon, description: string, message: string)

    serverDidSendPing();
}

export class StompClientCommon extends Observable {

    currentUrl: string = null;

    public delegate: StompClientCallback = null;

    constructor(callback: StompClientCallback = null) {
        super();
        this.delegate = callback;
    }

    public openSocketWithURL(url: string) {

    }

    public subscribe(destination: string) {

    }

    public disconnect() {

    }

    public sendMessage(message: string, toDestination: String, withHeaders?: Map<String, String>, withReceipt?: string) {

    }
}

export class Utils {
    /*public static SUCCESS_MSG(): string {
      let msg = `Your plugin is working on ${app.android ? 'Android' : 'iOS'}.`;

      setTimeout(() => {
        dialogs.alert(`${msg} For real. It's really working :)`).then(() => console.log(`Dialog closed.`));
      }, 2000);

      return msg;
    }*/
}
