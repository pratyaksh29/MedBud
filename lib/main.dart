import 'package:flutter/material.dart';
import 'package:telephony/telephony.dart';
import 'dart:async';
import 'package:http/http.dart' as http;
import 'dart:convert';

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
  String _receiveAt = '(NUMBER)';

  final _promptController = TextEditingController();

  Future<void> sendMessage(List<String> messages, {String? to}) async {
    final telephony = Telephony.instance;
    print(messages.length);
    for (var i = 0; i < messages.length; i++) {
      final message = messages[i];
      print('Sending message ${i + 1}/${messages.length}: $message');
      await telephony.sendSms(to: to ?? _receiveAt, message: message);
      print('Message ${i + 1} sent successfully!');
    }
  }





  Future<List<String>> processMessage(String message) async {
    List<String> responses = [];
    var url;
    var headers = {'Content-Type': 'application/json'};
    var body;

    String sms = message;
    final splitted = sms.split(' ');
    bool isEmergency = false;
    bool isMother = false;

    for (final word in splitted) {
      if (word == "emergency") {
        isEmergency = true;
        break;
      }
    }


    for (final word in splitted) {
      if (word == "mother") {
        isMother = true;
        break;
      }
    }

    if (isEmergency) {
      url = Uri.parse('https://ba37-136-233-9-98.in.ngrok.io/query/emergency');
      body = json.encode({
        "phNumber": "(NUMBER)",
      });
      await http.post(url, body: body);

      url = Uri.parse('https://ba37-136-233-9-98.in.ngrok.io/query');
      body = json.encode({
        "phNumber": "(NUMBER)",
        "prompt": message,
        "location": "VIT Vellore",
      });
    }
    else if(isMother){
      url = Uri.parse('https://ba37-136-233-9-98.in.ngrok.io/mother/addmother');
      body = json.encode({
        "phNumber": "(NUMBER)",
        "natalSupport": false ,
      });
      await http.post(url, body: body);

      // url = Uri.parse('https://ba37-136-233-9-98.in.ngrok.io/query');
      // body = json.encode({
      //   "phNumber": "(NUMBER)",
      //   "prompt": message,
      //   "location": "VIT Vellore",
      // });
    }

    else {
      url = Uri.parse('https://ba37-136-233-9-98.in.ngrok.io/query');
      body = json.encode({
        "phNumber": "(NUMBER)",
        "prompt": message,
        "location": "VIT Vellore",
      });
    }


    var apiResponse = await http.post(url, headers: headers, body: body);
    if (apiResponse.statusCode == 200) {
      Map<String, dynamic> jsonResponse = json.decode(apiResponse.body);
      String translatedText = jsonResponse["translatedText"];
      responses = translatedText.split('\n').where((line) => line.trim().isNotEmpty).toList();
    } else {
      responses = ['Error: ${apiResponse.statusCode}'];
    }

    print(responses);
    return responses;
  }






  // Future<List<String>> processMessage(String message) async {
  //   List<String> responses = [];
  //   var url = Uri.parse('https://ba37-136-233-9-98.in.ngrok.io/query');
  //   var headers = {'Content-Type': 'application/json'};
  //   var body = json.encode({
  //     "phNumber": "(NUMBER)",
  //     "prompt": message,
  //     "location": "asd",
  //   });
  //   var apiResponse = await http.post(url, headers: headers, body: body);
  //   if (apiResponse.statusCode == 200) {
  //     Map<String, dynamic> jsonResponse = json.decode(apiResponse.body);
  //     String translatedText = jsonResponse["translatedText"];
  //     responses = translatedText.split('\n').where((line) => line.trim().isNotEmpty).toList(); // split response into separate messages
  //   } else {
  //     responses = ['Error: ${apiResponse.statusCode}'];
  //   }
  //
  //   print(responses);
  //   return responses;
  // }


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
              TextField(
                controller: _promptController,
                decoration: InputDecoration(
                  hintText: 'Enter prompt',
                ),
              ),

              ElevatedButton(
                child: Text('Send Message'),
                onPressed: () async {
                  String prompt = _promptController.text;
                  List<String> responses = await processMessage(prompt);
                  await sendMessage(responses);
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
      List<String> responses = await processMessage(message.body!);
      for (String response in responses) {
        await sendMessage(responses);
      }

      print(message);
      setState(() {
        _lastMessage = message.body!;
      });
    }
  }



  @override
  void initState() {
    super.initState();
    _startListeningForIncomingMessages();
  }
}
