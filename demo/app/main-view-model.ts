import {Observable} from 'tns-core-modules/data/observable';
import {StompClient} from 'nativescript-stomp-client';
import {StompClientCallback, StompClientCommon} from "../../src/stomp-client.common";

export class HelloWorldModel extends Observable implements StompClientCallback {
    private stompClient: StompClient;

    constructor() {
        super();
        this.stompClient = new StompClient(this);
    }

    connect() {
        console.log('connecting...');
        this.stompClient.openSocketWithURL('ws://192.168.1.199:8983/ws');
    }

    disconnect() {
        console.log('disconnecting...');
        // this.stompClient.unsubscribe(topic);
        this.stompClient.disconnect();
    }

    serverDidSendError(client: StompClientCommon, description: string, message: string) {
        console.log("serverDidSendError: " + description + " - " + message);
    }

    serverDidSendPing() {
        console.log("serverDidSendPing");
    }

    serverDidSendReceipt(client: StompClientCommon, receiptId: string) {
        console.log("serverDidSendReceipt: " + receiptId);
    }

    stompClientDidConnect(client: StompClientCommon) {
        console.log("11stompClientDidConnect");
        let topic = "/topic/greetings";
        this.stompClient.subscribe(topic);
    }

    stompClientDidDisconnect(client: StompClientCommon) {
        console.log("stompClientDidDisconnect");
    }

    stompClientDidReceiveMessage(client: StompClientCommon, destination: string, jsonBody: string) {
        console.log("stompClientDidReceiveMessage: " + destination + " - " + jsonBody);
    }
}
