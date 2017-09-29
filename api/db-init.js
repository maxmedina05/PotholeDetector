db.users.insert([
    {
        "firstName": "Max",
        "lastName": "Medina",
        "email": "mmedina@example.com",
        "password": "1234"
    }, {
        "firstName": "Jose",
        "lastName": "Perez",
        "email": "jperez@example.com",
        "password": "1234"
    }
]);

db.streetdefects.insert([
    {
        "location": {
            "coordinates": [
                -69.931229, 18.464950
            ],
            "type": "Point"
        }
    }, {
        "location": {
            "coordinates": [
                -69.928690, 18.460497
            ],
            "type": "Point"
        }, {
            "location": {
                "coordinates": [
                    -69.9371673, 18.4697177
                ],
                "type": "Point"
            }
        }
    }
]
