import 'package:flutter/material.dart';

class Favorite extends StatelessWidget {
  final Set<String> favoriteImages;

  const Favorite({Key? key, required this.favoriteImages}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    List<String> favoriteList = favoriteImages.toList(); // Convert set to list

    return Scaffold(
      appBar: AppBar(title: Text('Favorites')),
      body: GridView.builder(
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: 8.0,
          mainAxisSpacing: 8.0,
        ),
        itemCount: favoriteList.length,
        itemBuilder: (context, index) {
          return Image.network(favoriteList[index]);
        },
      ),
    );
  }
}
