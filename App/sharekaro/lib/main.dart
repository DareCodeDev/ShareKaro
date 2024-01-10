import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:sharekaro/Screens/Provider/favorite.dart';
import 'package:sharekaro/Screens/homescreen.dart';
import 'package:sharekaro/Screens/loginscreen.dart';
import 'package:sharekaro/Screens/navbar.dart';
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
    return MultiProvider(
      providers: [
        ChangeNotifierProvider<FavoritesProvider>(
          create: (context) => FavoritesProvider(),
        ),
      ],
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        home: NavBar(),
      ),
    );
  }
}
