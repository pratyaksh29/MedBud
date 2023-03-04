import 'package:flutter/material.dart';
import 'package:telephony/telephony.dart';
import 'dart:async';


Future<dynamic> _handleIncomingMessageInBackground(SmsMessage message) async {
  return Future.value(true);
}

void main() => runApp(MyApp());

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  String _lastMessage = '';
  String _receiveAt = '+919811312590';

  Future<String> processMessage(String message) async {
    String response = '';
    if (message.toLowerCase() == 'hi') {
      response = 'Hello';
    } else {
      response = "I am currently not configured to provide any response. Please try again later.";
    }
    return response;
  }

  Future<void> sendMessage(String message) async {
    final telephony = Telephony.instance;
    await telephony.sendSms(to: _receiveAt, message: message);
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Text('Last Message Received:'),
              Text(_lastMessage),
              ElevatedButton(
                child: Text('Send Message'),
                onPressed: () async {
                  String response = await processMessage('hi');
                  await sendMessage(response);
                },
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _startListeningForIncomingMessages() async {
    final telephony = Telephony.instance;
    await telephony.requestSmsPermissions;
    telephony.listenIncomingSms(
      onBackgroundMessage: _handleIncomingMessageInBackground,
      onNewMessage: _handleIncomingMessage,
    );
  }



  void _handleIncomingMessage(SmsMessage message) async {
    if (message.address == _receiveAt) {
      String response = await processMessage(message.body!);
      await sendMessage(response);
      setState(() {
        _lastMessage = message.body ?? '';
      });
    }
  }

  @override
  void initState() {
    super.initState();
    _startListeningForIncomingMessages();
  }
}
