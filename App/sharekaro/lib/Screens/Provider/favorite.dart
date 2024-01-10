import 'package:flutter/material.dart';

class FavoritesProvider extends ChangeNotifier {
  Set<String> _favoriteImages = {};

  Set<String> get favoriteImages => _favoriteImages;

  void addToFavorites(String imageUrl) {
    _favoriteImages.add(imageUrl);
    notifyListeners();
  }

  void removeFromFavorites(String imageUrl) {
    _favoriteImages.remove(imageUrl);
    notifyListeners();
  }

  isFavorite(String favoriteList) {
    return _favoriteImages.contains(favoriteList);
  }

  void removeFavorite(String favoriteList) {
    _favoriteImages.remove(favoriteList);
    notifyListeners();
  }
}
