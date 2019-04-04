# nativescript-stomp-client

A stomp client for Nativescript. iOS only for now.

See [nativescript-stomp-client](https://github.com/demetrio812/nativescript-stomp-client) demo for example code.

## Installation

```javascript
tns plugin add nativescript-stomp-client
```

## Usage 
	
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

## Android limitations
1. event `serverDidSendPing` is not yet implemented
2. `sendMessage`: parameters `withHeaders` and `withReceipt` are ignored
3. event `serverDidSendReceipt` doesn't contain the `receiptId` (it's always `undefined`)
4. `stompClientDidReceiveMessage`: parameter `destination` is not sent (it's always `undefined`)


## TODO

* Test with more servers
* Remove Android limitations
    
## License

Apache License Version 2.0, January 2004
