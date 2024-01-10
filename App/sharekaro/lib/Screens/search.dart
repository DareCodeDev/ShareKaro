import 'package:flutter/material.dart';
import 'package:sharekaro/Api/apimodel.dart';

class Search extends StatefulWidget {
  final FocusNode focusNode; // FocusNode declaration
  final TextEditingController
      textController; // TextEditingController declaration

  const Search({required this.focusNode, required this.textController});

  @override
  State<Search> createState() => _SearchState();
}

class _SearchState extends State<Search> {
  final TextEditingController _searchController = TextEditingController();
  final UnsplashService _unsplashService = UnsplashService();
  List<UnsplashImage> _images = [];

  final FocusNode _searchFocusNode = FocusNode(); // FocusNode declaration

  @override
  void dispose() {
    _searchController.dispose();
    _searchFocusNode.dispose(); // Dispose the FocusNode
    super.dispose();
  }

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
        child: Column(
          children: [
            GestureDetector(
              onTap: () {
                FocusScope.of(context).requestFocus(widget.focusNode);
              },
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Container(
                  height: MediaQuery.of(context).size.height * 0.06,
                  width: MediaQuery.of(context).size.width * 0.95,
                  decoration: BoxDecoration(
                    color: Colors.grey[200],
                    borderRadius: BorderRadius.circular(25.0),
                  ),
                  child: Row(
                    children: [
                      Expanded(
                        child: Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 16.0),
                          child: TextField(
                            controller: widget.textController,
                            focusNode: widget.focusNode,
                            decoration: InputDecoration(
                              hintText: 'Search Images...',
                              border: InputBorder.none,
                            ),
                          ),
                        ),
                      ),
                      IconButton(
                        icon: Icon(Icons.search),
                        onPressed: () {
                          _searchFocusNode.requestFocus(); // Set focus
                        },
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
