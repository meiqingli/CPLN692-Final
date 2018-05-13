# San Francisco Traffic Congestion Management Program Portal
Final Project for CPLN692 JavaScript Programming
#### Meiqing Li | MCP '18
#### Visit site at: https://meiqingli.github.io/CPLN692-Final/

## Features
This JavaScript application is an interactive tool that visualizes the historic congestion management program (CMP) data in San Francisco. It serves as a prototype for tools to rearrange and visualize SFCTA's big volume of traffic data within the same geographic scope of city, and road segments. It is also a handy public engagement tool to explore changes of traffic congestion between the years 1991 and 2017, all over the city as well as by street types.

The first page is an overview of all CMP segments in San Francisco. The segments can be filtered by street type (i.e. high speed, suburban, intermediate, urban, freeway). When hovering over each segment, there is a popup window showing the CMP name. There are two more pages showing LOS for each CMP segment.

## Data and Tools
#### Road features
The map incorporate mainly two sources of geographic features: all road segments in San Francisco, and CMP segments. The SF road segments come from TIGER/Line shapefile, and serves as the base layer. The CMP segments come from a subset of SF roads, from SFCTA data warehouse.

#### CMP monitoring data
The CMP traffic monitoring data come from SFCTA data warehouse, which includes 14 years' LOS data of each CMP segments between 1991 and 2017 (not every year's data are available). Data preprocessing includes joining CMP monitoring data to CMP segments, and convert to geojson format. Tools used for data processing include RStudio, CartoDB, and Github gist.

#### JavaScript Libraries
- Bootstrap
- Mapbox GL JS
- Leaflet
- jQuery

## Visualization
For creating web application, I primarily used HTML, CSS, and JavaScript that links different functions and events.

Special thanks to Yun Shi for solving my confusions throughout the project.
