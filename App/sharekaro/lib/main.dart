import 'package:flutter/material.dart';
import 'package:sharekaro/Screens/homescreen.dart';
import 'package:sharekaro/Screens/loginscreen.dart';
import 'package:sharekaro/Screens/onboarding.dart';

void main() async {
  runApp(
    const MyApp(),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: LoginScreen(),
    );
  }
}
