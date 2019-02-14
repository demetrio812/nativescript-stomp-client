import {StompClientCallback, StompClientCommon} from './stomp-client.common';

// TODO generate types
declare var ua: any;
declare var io: any;

export class StompClient extends StompClientCommon {

    private mStompClient: any; /* ua.naiksoftware.stomp.StompClient() */

    private topicCallback: any; /* io.reactivex.functions.Consumer */
    private topicCallbackError: any; /* io.reactivex.functions.Consumer */
    private connectionEventsCallback: any; /* io.reactivex.functions.Consumer */
    private connectionEventsCallbackError: any; /* io.reactivex.functions.Consumer */
    private sendCallback: any; /* io.reactivex.functions.Action */
    private sendCallbackError: any; /* io.reactivex.functions.Consumer */

    constructor(callback: StompClientCallback = null) {
        super(callback);

        this.mStompClient = null;

        this.topicCallback = new io.reactivex.functions.Consumer({
            accept: function(topicMessage: any /*ua.naiksoftware.stomp.dto.StompMessage*/) {
                console.log(topicMessage.getStompCommand() + ' ' + topicMessage.getPayload());
                if (me.delegate) {
                    me.delegate.stompClientDidReceiveMessage(me, undefined, topicMessage.getPayload());
                }
            }
        });

        this.topicCallbackError = new io.reactivex.functions.Consumer({
            accept: function(throwable: any /*Throwable*/) {
                console.log('Error subscribing the topic' + throwable.getMessage());
                if (me.delegate) {
                    me.delegate.serverDidSendError(me, throwable.getMessage(), throwable.getMessage());
                }
            }
        });

        const me = this;
        this.connectionEventsCallback = new io.reactivex.functions.Consumer({
            accept: function(lifecycleEvent: any /*ua.naiksoftware.stomp.dto.LifecycleEvent*/) {
                console.log(`lifecycleEvent: ${lifecycleEvent.getType()}`);
                switch (lifecycleEvent.getType()) {
                    case ua.naiksoftware.stomp.dto.LifecycleEvent.Type.OPENED:
                        console.log('Stomp connection opened');
                        if (me.delegate) {
                            me.delegate.stompClientDidConnect(me);
                        }
                        break;
                    case ua.naiksoftware.stomp.dto.LifecycleEvent.Type.ERROR:
                        console.log('Error: ' + lifecycleEvent.getException());
                        if (me.delegate) {
                            me.delegate.serverDidSendError(me, lifecycleEvent.getException(), lifecycleEvent.getException());
                        }
                        break;
                    case ua.naiksoftware.stomp.dto.LifecycleEvent.Type.CLOSED:
                        console.log('Stomp connection closed');
                        if (me.delegate) {
                            me.delegate.stompClientDidDisconnect(me);
                        }
                        break;
                    default:
                        console.log('Case not found');
                }
            }
        });

        this.connectionEventsCallbackError = new io.reactivex.functions.Consumer({
            accept: function(throwable: any /*Throwable*/) {
                console.log('lifecycleEvent Error' + throwable.getMessage());
                if (me.delegate) {
                    me.delegate.serverDidSendError(me, throwable.getMessage(), throwable.getMessage());
                }
            }
        });


        this.sendCallback = new io.reactivex.functions.Action({
            run: function() {
                console.log('Message sent');
                if (me.delegate) {
                    me.delegate.serverDidSendReceipt(me, undefined);
                }
            }
        });

        this.sendCallbackError = new io.reactivex.functions.Consumer({
            accept: function(throwable: any /*Throwable*/) {
                console.log('Error sending the message' + throwable.getMessage());
                if (me.delegate) {
                    me.delegate.serverDidSendError(me, throwable.getMessage(), throwable.getMessage());
                }
            }
        });
    }

    openSocketWithURL(url: string) {
        console.log('openSocketWithURL');
        // Disconnect it if it's already connected
        if (this.mStompClient) {
            this.disconnect();
        }
        this.currentUrl = url;
        this.mStompClient = ua.naiksoftware.stomp.Stomp.over(ua.naiksoftware.stomp.Stomp.ConnectionProvider.OKHTTP, url);
        this.mStompClient.lifecycle().subscribe(this.connectionEventsCallback, this.connectionEventsCallbackError);
        this.mStompClient.connect();
    }

    subscribe(destination: string) {
        console.log('subscribe: ' + destination);
        this.mStompClient.topic(destination).subscribe(this.topicCallback, this.topicCallbackError);
    }

    disconnect() {
        console.log('disconnect');
        if (this.mStompClient) {
            this.currentUrl = null;
            this.mStompClient.disconnect();
            this.mStompClient = null;
        }
    }

    public sendMessage(message: string, toDestination: String, withHeaders?: Map<String, String>, withReceipt?: string) {
        console.log('sendMessage: ' + toDestination);
        if (this.mStompClient) {
            this.mStompClient.send(toDestination, message).subscribe(this.sendCallback, this.sendCallbackError);
        }
    }
}
