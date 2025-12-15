# The Triangulator

A web-based tool to quickly triangulate the relative position of any feature using Google Street View imagery.

## Description

This project utilizes geographic position data (lattitude, longitude, and heading) from Google Street View to calculate the intersection of two rays on a sphere.  The user simply needs to enter Google Street View and set two different postions while looking at the same object in order for it to calculate the triangulated point.  This is in fulfillment of the Code:You Capstone Project for the Web Development May 2025 class.  Features which this tool incorporates are:

* Create a function that accepts two or more input parameters and returns a value that is calculated or determined by the inputs.  Basic math functions don’t count (e.g. addition, etc).
* Create a node.js web server using Express.js.
* Create an API that implements HTTP requests for GET and POST. Data can be stored in a JSON file on the back-end.

## Getting Started

### Dependencies

* VS Code
* Google Chrome

### Installing

* This repo can be cloned from https://github.com/ethansherer/Triangulator.git
* A Google Javascript API Key is necessary in order to use this tool.  Sign up for one at https://developers.google.com/maps/documentation/javascript

### Executing program

* Create 'key.js' file in the js/ folder containing a single line for your Google API key. (ie. const API_KEY="1234567890abcdefghijklmnop")
* Install the express and cors packages using npm:
```
npm install express
npm install cors
```
* From the terminal window, start your local API server for triangulation:
```
node api/triangulate.js
```
* You may now 'Go Live' with start.html.

## Help

Google imagery sometimes relies on 3rd party sources, which do not have great location/position data. For best results, try to only use Google-sponsored images.

## Authors

Ethan Sherer

## Version History

* 0.1
    * Initial Release


