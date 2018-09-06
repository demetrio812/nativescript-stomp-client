import {StompClientCallback, StompClientCommon} from './stomp-client.common';
export declare class StompClient extends StompClientCommon {
    private socketClient;
    constructor(callback?: StompClientCallback);
    openSocketWithURL(url: string): void;
    subscribe(destination: string): void;
    disconnect(): void;
}
