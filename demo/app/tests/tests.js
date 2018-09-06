var StompClient = require("nativescript-stomp-client").StompClient;
var stompClient = new StompClient();

describe("greet function", function() {
    it("exists", function() {
        expect(stompClient.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(stompClient.greet()).toEqual("Hello, NS");
    });
});