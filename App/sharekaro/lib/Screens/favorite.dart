import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'Provider/favorite.dart';

class Favorite extends StatefulWidget {
  @override
  State<Favorite> createState() => _FavoriteState();
}

class _FavoriteState extends State<Favorite> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Favorites'),
      ),
      body: Consumer<FavoritesProvider>(
        builder: (context, favoritesProvider, _) {
          List<String> favoriteList = favoritesProvider.favoriteImages.toList();

          return Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Add any widgets or options here
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Text(
                  'Options or Additional Widgets',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              Divider(), // A divider for separation
              Expanded(
                child: favoriteList.isEmpty
                    ? Center(
                        child: Text('No favorites yet!'),
                      )
                    : Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: GridView.builder(
                          gridDelegate:
                              SliverGridDelegateWithFixedCrossAxisCount(
                            crossAxisCount: 2,
                            crossAxisSpacing: 8.0,
                            mainAxisSpacing: 8.0,
                          ),
                          itemCount: favoriteList.length,
                          itemBuilder: (context, index) {
                            return GestureDetector(
                              onTap: () {
                                // Handle tapping on favorite image
                              },
                              child: Stack(
                                children: [
                                  Container(
                                    decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(8.0),
                                      image: DecorationImage(
                                        image:
                                            NetworkImage(favoriteList[index]),
                                        fit: BoxFit.cover,
                                      ),
                                    ),
                                  ),
                                  Positioned(
                                    top: 8.0,
                                    right: 8.0,
                                    child: Container(
                                      height: 40,
                                      width: 40,
                                      decoration: BoxDecoration(
                                        color: Colors.white,
                                        borderRadius:
                                            BorderRadius.circular(10.0),
                                      ),
                                      child: IconButton(
                                        iconSize: 20,
                                        onPressed: () {
                                          favoritesProvider.removeFavorite(
                                              favoriteList[index]);
                                        },
                                        icon: Icon(
                                          Icons.favorite,
                                          color: favoritesProvider.isFavorite(
                                                  favoriteList[index])
                                              ? Colors.red
                                              : Colors.grey,
                                        ),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            );
                          },
                        ),
                      ),
              ),
            ],
          );
        },
      ),
    );
  }
}
