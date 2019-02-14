import { StompClientCallback, StompClientCommon } from './stomp-client.common';

/*declare class StompClientLib {
    fun openSocketWithURL()
}*/

// TODO generate types
declare var StompClientLib: any;
export declare class StompClientLibDelegate {}

export class StompClientLibDelegateImpl extends NSObject
  implements StompClientLibDelegate {
  public static ObjCProtocols = [StompClientLibDelegate];

  static new(): StompClientLibDelegateImpl {
    return <StompClientLibDelegateImpl>super.new();
  }

  private owner: StompClientCommon;

  public setOwner(owner: StompClientCommon): StompClientLibDelegateImpl {
    this.owner = owner;
    return this;
  }

  stompClientWithClientDidReceiveMessageWithJSONBodyWithHeaderWithDestination(
    client: any,
    jsonBody: any, // NSDictionary
    header: any, // NSDictionary
    destination: any // string
  ) {
    // console.log('stompClientWithClientDidReceiveMessageWithJSONBodyWithHeaderWithDestination');
    // console.log('destination = ' + destination);
    // console.log('jsonBody = ' + jsonBody);
    if (this.owner && this.owner.delegate) {
      this.owner.delegate.stompClientDidReceiveMessage(this.owner, destination, jsonBody);
    }
  }

  stompClientDidConnectWithClient(client: any) {
    // console.log('stompClientDidConnectWithClient');
    if (this.owner && this.owner.delegate) {
      this.owner.delegate.stompClientDidConnect(this.owner);
    }
  }

  stompClientDidDisconnectWithClient(client: any) {
    // console.log('stompClientDidDisconnectWithClient');
    if (this.owner && this.owner.delegate) {
      this.owner.delegate.stompClientDidDisconnect(this.owner);
    }
  }

  serverDidSendReceiptWithClientWithReceiptId(client: any, receiptId: string) {
    // console.log('serverDidSendReceiptWithClientWithReceiptId');
    if (this.owner && this.owner.delegate) {
      this.owner.delegate.serverDidSendReceipt(this.owner, receiptId);
    }
  }

  serverDidSendErrorWithClientWithErrorMessageDetailedErrorMessage(
    client: any,
    errorMessage: string,
    detailedErrorMessage: string
  ) {
    console.log('Error!! ' + errorMessage);
    if (this.owner && this.owner.delegate) {
      this.owner.delegate.serverDidSendError(this.owner, errorMessage, detailedErrorMessage);
    }
  }

  serverDidSendPing() {
    // console.log('serverDidSendPing');
    if (this.owner && this.owner.delegate) {
      this.owner.delegate.serverDidSendPing();
    }
  }
}

export class StompClient extends StompClientCommon {
  private socketClient: any = null;

  private iosDelegate: any = null;

  constructor(callback: StompClientCallback = null) {
    super(callback);
    this.iosDelegate = StompClientLibDelegateImpl.new().setOwner(this);
    this.socketClient = StompClientLib.new();

    console.log(this.socketClient);
    // let properties = Object.keys(this.socketClient);
    // console.log(properties.join(', ')); // test

    // console.log(JSON.stringify(this.socketClient));
  }

  public openSocketWithURL(url: string) {
    // this.socketClient.delegate = null;
    // this.socketClient.urlRequest = NSURLRequest.requestWithURL(NSURL.URLWithString(url));
    // this.socketClient.openSocket();
    this.currentUrl = url;
    this.socketClient.openSocketWithURLRequestWithRequestDelegate(
      NSURLRequest.requestWithURL(NSURL.URLWithString(url)),
      this.iosDelegate
    );
  }

  public subscribe(destination: string) {
    this.socketClient.subscribeWithDestination(destination);
  }

  public disconnect() {
    this.currentUrl = null;
    this.socketClient.disconnect();
  }

  public sendMessage(message: string, toDestination: String, withHeaders?: Map<String, String>, withReceipt?: string) {
    this.socketClient.sendMessageWithMessageToDestinationWithHeadersWithReceipt(message, toDestination, withHeaders, withReceipt);
  }
}
