import {Observable} from 'tns-core-modules/data/observable';
import {StompClient} from 'nativescript-stomp-client';
import {StompClientCallback, StompClientCommon} from "../../src/stomp-client.common";

export class HelloWorldModel extends Observable implements StompClientCallback {
    private static url = 'ws://192.168.1.173:9999/websockets';
    private static topicReceive = '/app/receive';
    private static topicSend = '/topic/send';
    private stompClient: StompClient;

    constructor() {
        super();
        this.stompClient = new StompClient(this);
    }

    connect() {
        console.log('connecting...');
        this.stompClient.openSocketWithURL(HelloWorldModel.url);
    }

    disconnect() {
        console.log('disconnecting...');
        // this.stompClient.unsubscribe(topic);
        this.stompClient.disconnect();
    }

    sendMessage() {
        console.log('sendMessage');
        this.stompClient.sendMessage('Hello world!', HelloWorldModel.topicReceive)
    }

    serverDidSendError(client: StompClientCommon, description: string, message: string) {
        console.log(`serverDidSendError: ${description} - ${message}`);
    }

    serverDidSendPing() {
        console.log('serverDidSendPing');
    }

    serverDidSendReceipt(client: StompClientCommon, receiptId: string) {
        console.log(`serverDidSendReceipt: ${receiptId}`);
    }

    stompClientDidConnect(client: StompClientCommon) {
        console.log('stompClientDidConnect');
        this.stompClient.subscribe(HelloWorldModel.topicSend);
    }

    stompClientDidDisconnect(client: StompClientCommon) {
        console.log('stompClientDidDisconnect');
    }

    stompClientDidReceiveMessage(client: StompClientCommon, destination: string, jsonBody: string) {
        console.log(`stompClientDidReceiveMessage: ${destination} - ${jsonBody}`);
    }
}
