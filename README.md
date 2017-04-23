# Smogly Data Visualizer

> Team nr 8 project created during hackathon Zdrowieton.js - a tool for visualising aggregated data from air quality monitoring service <a href="http://smogly.pl/" target="_blank" rel="help">smogly.pl</a>.

Backend  functionalities:
- Restful API - Provides access to a list of stations with the most important information about them and to any number of measurements dependent on a query which contains find, select, limit, and sort parameters.
- smoglyDataCollector - Stand-alone server-side module responsible for aggregating available air quality data assigned to the appropriate measurement station.

## How to get data from backend?
Data is stored in MongoDB, so it is required to run a database locally or to configure a connection to an external database in app.config.js.

<br>

Firstly call command to run the server-side application:
```
npm run dev
```

Now when everything works you can start sending requests to get:
- <a href="http://localhost:4848/stations" target="_blank" rel="help">http://localhost:4848/stations</a> - Array of stations objects
- <a href="http://localhost:4848/results?find=name:Smogly&select=name,country&limit=4&sort=last_metering.created:-1" target="_blank" rel="help">http://localhost:4848/results?find=name:Smogly&select=name,country&limit=4&sort=last_metering.created:-1</a> - Array of specified results objects

### Find:
Default: {} - Any object

Example query: ?find=name:Smogly,country:Polska - Parses to {name: 'Smogly', country: 'Polska'} - Only objects with Smogly as name property and Polska as country property

### Select:
Default: [] - All object properties

Example query: ?select=name,country - Parses to [name, country] - Only name and country object properties needed

### Limit:
Default: 5 - First five objects needed

Example query: ?limit=1000 - If available in array gonna be 1000 objects

### Sort:
Default: {'last_metering.created': -1} - In order from the latest

Example query: ?sort=created:1 - Parses to {created: 1} - In order from the oldest

<br>

If you get always empty array as response probably you forgot to run smoglyDataCollector. Simply run using a command:
```
npm run smoglyDataCollector
```

## License
<a href="https://github.com/WarMaxis/Zdrowieton.js_project_8/blob/master/LICENSE" target="_blank" rel="help">GNU General Public License v3.0</a>.