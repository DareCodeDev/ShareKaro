import 'dart:convert';
import 'package:http/http.dart' as http;

class UnsplashImage {
  final String id;
  final String description;
  final String imageUrl;

  var photographerId;

  var photographerUrl;

  var photographer;

  UnsplashImage({
    required this.id,
    required this.description,
    required this.imageUrl,
  });

  factory UnsplashImage.fromJson(Map<String, dynamic> json) {
    return UnsplashImage(
      id: json['id'] ?? '',
      description: json['description'] ?? 'No description',
      imageUrl: json['urls']['regular'] ?? '',
    );
  }
}

class UnsplashService {
  static const String _baseUrl = 'https://api.unsplash.com';
  static const String _apiKey =
      '1vylW6wUMK3VOEaNu7wy_7DjHIABnVj2dnCUcL11URs'; // Replace with your actual API key

  Future<List<UnsplashImage>> searchImages(String query) async {
    final response = await http.get(
      Uri.parse('$_baseUrl/search/photos?query=$query'),
      headers: {'Authorization': 'Client-ID $_apiKey'},
    );

    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body)['results'];
      return data.map((json) => UnsplashImage.fromJson(json)).toList();
    } else {
      throw Exception('Failed to load images');
    }
  }

  Future<List<UnsplashImage>> fetchTrendingImages() async {
    try {
      final response = await http.get(
        Uri.parse(
            '$_baseUrl/photos?per_page=20&order_by=popular'), // Example URL for trending images
        headers: {'Authorization': 'Client-ID $_apiKey'},
      );

      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        return data.map((json) => UnsplashImage.fromJson(json)).toList();
      } else {
        throw Exception('Failed to load trending images');
      }
    } catch (e) {
      throw Exception('Error: $e');
    }
  }

  fetchPopularImages() {}
}
