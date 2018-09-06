# nativescript-stomp-client

A stomp client for Nativescript. iOS only for now.

See [nativescript-stomp-client](https://github.com/demetrio812/nativescript-stomp-client) demo for example code.

## Installation

```javascript
tns plugin add nativescript-stomp-client
```

## Usage 

Describe any usage specifics for your plugin. Give examples for Android, iOS, Angular if needed. See [nativescript-drop-down](https://www.npmjs.com/package/nativescript-drop-down) for example.
	
```typescript
	// Create the instance
	let aDelegate: StompClientCallback = <your delegate>;
    let stompClient = new StompClient(aDelegate);
    
	// connect
	stompClient.openSocketWithURL('ws://<hostname>/<path>'); 
    ```)
    
	// subscribe to a topic
	let topic = "/topic/<my-topic>";
    stompClient.subscribe(topic);
    
	// disconnect
	stompClient.disconnect();
```

## API

```typescript
export interface StompClientCallback {
    stompClientDidDisconnect(client: StompClientCommon)

    stompClientDidConnect(client: StompClientCommon)

    stompClientDidReceiveMessage(client: StompClientCommon, destination: string, jsonBody: string)

    serverDidSendReceipt(client: StompClientCommon, receiptId: string)

    serverDidSendError(client: StompClientCommon, description: string, message: string)

    serverDidSendPing();
}
```

## TODO

* Android version
* Add more methods to the interface (only tested for receiving messages, not sending)
* Test sending messages
    
## License

Apache License Version 2.0, January 2004
