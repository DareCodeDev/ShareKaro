import 'dart:async';
import 'dart:io';
import 'package:dio/dio.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:image_gallery_saver/image_gallery_saver.dart';
import 'package:path_provider/path_provider.dart';
import 'package:sharekaro/Api/apimodel.dart';
import 'package:url_launcher/url_launcher.dart';

class ImageScreen extends StatefulWidget {
  final UnsplashImage image;

  const ImageScreen({Key? key, required this.image}) : super(key: key);

  @override
  _ImageScreenState createState() => _ImageScreenState();
}

class _ImageScreenState extends State<ImageScreen> {
  bool isFavorite = false;
  final Dio _dio = Dio();

  Future<void> _downloadImage() async {
    try {
      final response = await _dio.get(
        widget.image.imageUrl,
        options: Options(responseType: ResponseType.bytes),
      );

      final directory = await getApplicationDocumentsDirectory();
      final folderName =
          'ShareKaro'; // Replace 'YourFolderName' with your desired folder name
      final folderDirectory = Directory('${directory.path}/$folderName');

      if (!(await folderDirectory.exists())) {
        folderDirectory.create(recursive: true);
      }

      final file = File('${folderDirectory.path}/image.jpg');
      await file.writeAsBytes(response.data as List<int>);

      // Save the image to the gallery
      final result = await ImageGallerySaver.saveFile(file.path);

      if (result != null && result['isSuccess'] == true) {
        final snackBar = SnackBar(
          content: Text('Image downloaded and saved to gallery'),
          duration: Duration(seconds: 2),
        );
        ScaffoldMessenger.of(context).showSnackBar(snackBar);
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Failed to save image to gallery'),
            duration: Duration(seconds: 2),
          ),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Failed to download image: $e'),
          duration: Duration(seconds: 2),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF272829),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Stack(
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  LayoutBuilder(
                    builder: (context, constraints) {
                      return FutureBuilder(
                        future: _getImageSize(widget.image.imageUrl),
                        builder: (context, snapshot) {
                          if (snapshot.connectionState ==
                              ConnectionState.waiting) {
                            return Center(child: CircularProgressIndicator());
                          } else if (snapshot.hasError) {
                            return Center(child: Text('Error loading image'));
                          } else if (snapshot.hasData) {
                            Size imageSize = snapshot.data as Size;
                            double containerWidth = constraints.maxWidth;
                            double containerHeight = containerWidth *
                                (imageSize.height / imageSize.width);
                            return ClipRRect(
                              borderRadius: BorderRadius.only(
                                bottomLeft: Radius.circular(30.0),
                                bottomRight: Radius.circular(30.0),
                              ),
                              child: Container(
                                width: containerWidth,
                                height: containerHeight,
                                child: Image.network(
                                  widget.image.imageUrl,
                                  fit: BoxFit.cover,
                                ),
                              ),
                            );
                          } else {
                            return Container();
                          }
                        },
                      );
                    },
                  ),
                  SizedBox(
                    height: MediaQuery.of(context).size.height * 0.02,
                  ),
                  Container(
                    height: MediaQuery.of(context).size.height * 0.08,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Container(
                          height: MediaQuery.of(context).size.height * 0.07,
                          width: MediaQuery.of(context).size.width * 0.25,
                          decoration: BoxDecoration(
                            color: Color(0xFFB31312),
                            borderRadius: BorderRadius.circular(50),
                            border: Border.all(
                              color: Color.fromARGB(255, 255, 255, 255),
                              width: 2.5,
                            ),
                          ),
                          child: Center(
                            child: Text(
                              'Favorite',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 15,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ),
                        GestureDetector(
                          onTap: () async {
                            await _downloadImage();
                          },
                          child: Container(
                            height: 40,
                            width: 40,
                            decoration: BoxDecoration(
                              color: Color(0xFFB31312),
                              borderRadius: BorderRadius.circular(50),
                              border: Border.all(
                                color: Color.fromARGB(255, 255, 255, 255),
                                width: 2.5,
                              ),
                            ),
                            child: Center(
                              child: Text(
                                'Download',
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 15,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    padding: EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          widget.image.description ??
                              'No description available',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 20.0,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              Positioned(
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: GestureDetector(
                    onTap: () {
                      Navigator.pop(context);
                    },
                    child: Container(
                        height: 40,
                        width: 40,
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(15),
                          border: Border.all(
                            color: const Color.fromARGB(255, 0, 0, 0),
                            width: 2.5,
                          ),
                        ),
                        child: Center(
                          child: Icon(Icons.arrow_back),
                        )),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<Size> _getImageSize(String imageUrl) async {
    Image image = Image.network(imageUrl);
    Completer<Size> completer = Completer();
    image.image.resolve(ImageConfiguration()).addListener(
      ImageStreamListener((ImageInfo info, bool _) {
        completer.complete(Size(
          info.image.width.toDouble(),
          info.image.height.toDouble(),
        ));
      }),
    );
    return completer.future;
  }
}
