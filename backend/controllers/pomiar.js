//const pomiar = require('../models/pomiar');

// Main Controller
module.exports = (req, res) => {
    //res.send('Pomiar Controller: Hello World!');
    const pomiar = {
        "name": "Poznań 2 Ogród Botaniczny",
        "created": "2017-04-08T06:20:23.023150Z",
        "updated": "2017-04-08T06:20:23.023186Z",
        "position": {
            "type": "Point",
            "coordinates": [
                        16.87728889,
                        52.42031944
                    ]
        },
        "country": "Polska",
        "state": "Wielkopolska",
        "county": "krakowski",
        "community": "Kraków",
        "city": "Nowy Tomyśl",
        "district": "Kazmierz",
        "last_metering": {
            "pm25": 22,
            "pm01": 23,
            "pm10": 56
        }
    };


    //    pomiar.save(function (err, pomiarN) {
    //        if (err) return console.error(err);
    //        console.log(pomiarN);
    //    });


    res.status(200).type('json').send(pomiar);
};
