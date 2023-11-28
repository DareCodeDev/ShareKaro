import 'package:flutter/material.dart';
import 'package:sharekaro/Api/apimodel.dart';

class Search extends StatefulWidget {
  const Search({super.key});

  @override
  State<Search> createState() => _SearchState();
}

class _SearchState extends State<Search> {
  final TextEditingController _searchController = TextEditingController();
  final UnsplashService _unsplashService = UnsplashService();
  List<UnsplashImage> _images = [];

  void _searchImages() async {
    String query = _searchController.text.trim();
    if (query.isNotEmpty) {
      try {
        List<UnsplashImage> images = await _unsplashService.searchImages(query);
        setState(() {
          _images = images;
        });
      } catch (e) {
        print('Error: $e');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Text('Search'),
      ),
    );
  }
}
