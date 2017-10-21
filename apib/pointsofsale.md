FORMAT: 1A

# Points of Sale API
This document aims to help you understand and use the Points of Sale API

## Points of Sale description [/v1/pointsofsale]
A point of sale is majorly defined by a location and a coverage area.
The location is defined by the `GeoJSON Point` format and the coverage are by the `GeoJSON MultiPolygon` format.
You can find more information about both [clicking here](https://en.wikipedia.org/wiki/GeoJSON).

## Data Structures

### Coverage Area
+ type: MultiPolygon (string, required)
+ coordinates (array, required) - check the Point of Sale Model too understand better the coordinates data values and make sure to read about `GeoJSON MultiPolygon`

### Address
+ type: Point (string, required)
+ coordinates (array, required) - check the Point of Sale Model too understand better the coordinates data values and make sure to read about `GeoJSON Point`

### Point of Sale Object
+ id: 1 (number, required) - unique identifier
+ tradingName: Adega Osasco (string, required) - company display name
+ ownerName: Ze da Ambev (string, required)
+ document: 02.453.716/000170 (string, required) - the [Brazilian CNPJ document number](https://en.wikipedia.org/wiki/CNPJ)
+ coverageArea (object[Coverage Area], required)
+ address (object[Address], required)

## Point of Sale [/v1/pointsofsale]

+ Model (application/json)

    + Body

        {
            "id": "2",
            "tradingName": "Adega Pinheiros",
            "ownerName": "Ze da Silva",
            "document": "04.433.714/0001-44",
            "coverageArea": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                -49.36299,
                                -25.4515
                            ],
                            [
                                -49.35334,
                                -25.45065
                            ],
                            [
                                -49.33675,
                                -25.4429
                            ],
                            [
                                -49.32291,
                                -25.4398
                            ],
                            [
                                -49.3188,
                                -25.44089
                            ],
                            [
                                -49.31064,
                                -25.43903
                            ],
                            [
                                -49.29828,
                                -25.43391
                            ],
                            [
                                -49.29751,
                                -25.43377
                            ],
                            [
                                -49.29588,
                                -25.43322
                            ],
                            [
                                -49.29215,
                                -25.43189
                            ],
                            [
                                -49.28855,
                                -25.43043
                            ],
                            [
                                -49.28662,
                                -25.42958
                            ],
                            [
                                -49.28424,
                                -25.42865
                            ],
                            [
                                -49.25803,
                                -25.42853
                            ],
                            [
                                -49.25533,
                                -25.42279
                            ],
                            [
                                -49.25585,
                                -25.4169
                            ],
                            [
                                -49.25524,
                                -25.40981
                            ],
                            [
                                -49.25761,
                                -25.40403
                            ],
                            [
                                -49.25524,
                                -25.39787
                            ],
                            [
                                -49.26005,
                                -25.39178
                            ],
                            [
                                -49.26078,
                                -25.3819
                            ],
                            [
                                -49.26267,
                                -25.37348
                            ],
                            [
                                -49.25952,
                                -25.37003
                            ],
                            [
                                -49.25971,
                                -25.36597
                            ],
                            [
                                -49.26301,
                                -25.35774
                            ],
                            [
                                -49.26468,
                                -25.34742
                            ],
                            [
                                -49.30623,
                                -25.35119
                            ],
                            [
                                -49.36262,
                                -25.36639
                            ],
                            [
                                -49.37043,
                                -25.3798
                            ],
                            [
                                -49.36743,
                                -25.40593
                            ],
                            [
                                -49.36837,
                                -25.42578
                            ],
                            [
                                -49.36299,
                                -25.4515
                            ]
                        ]
                    ]
                ]
            },
            "address": {
                "type": "Point",
                "coordinates": [
                    -49.33425,
                    -25.380995
                ]
            }
        }

    + Schema

        {
          "$schema": "http://json-schema.org/draft-06/schema#",
          "definitions": {},
          "id": "/v1/pointsofsale",
          "properties": {
            "address": {
              "id": "/properties/address",
              "properties": {
                "coordinates": {
                  "id": "/properties/address/properties/coordinates",
                  "items": {
                    "default": -49.33425,
                    "description": "coordinates lat/lng.",
                    "examples": [
                      "-49.33425"
                    ],
                    "id": "/properties/address/properties/coordinates/items",
                    "title": "The 0 schema.",
                    "type": "number"
                  },
                  "type": "array"
                },
                "type": {
                  "default": "Point",
                  "description": "GeoJSON Point.",
                  "examples": [
                    "Point"
                  ],
                  "id": "/properties/address/properties/type",
                  "title": "The type schema.",
                  "type": "string"
                }
              },
              "required": [
                "type",
                "coordinates"
              ],
              "type": "object"
            },
            "coverageArea": {
              "id": "/properties/coverageArea",
              "properties": {
                "coordinates": {
                  "id": "/properties/coverageArea/properties/coordinates",
                  "items": {
                    "id": "/properties/coverageArea/properties/coordinates/items",
                    "items": {
                      "id": "/properties/coverageArea/properties/coordinates/items/items",
                      "items": {
                        "id": "/properties/coverageArea/properties/coordinates/items/items/items",
                        "items": {
                          "default": -49.36299,
                          "description": "coordinates lat/lng.",
                          "examples": [
                            "-49.36299"
                          ],
                          "id": "/properties/coverageArea/properties/coordinates/items/items/items/items",
                          "title": "The 0 schema.",
                          "type": "number"
                        },
                        "type": "array"
                      },
                      "type": "array"
                    },
                    "type": "array"
                  },
                  "type": "array"
                },
                "type": {
                  "default": "MultiPolygon",
                  "description": "GeoJSON MultiPolygon.",
                  "examples": [
                    "MultiPolygon"
                  ],
                  "id": "/properties/coverageArea/properties/type",
                  "title": "The type schema.",
                  "type": "string"
                }
              },
              "required": [
                "type",
                "coordinates"
              ],
              "type": "object"
            },
            "document": {
              "default": "04.433.714/0001-44",
              "description": "Brazilian CNPJ document number.",
              "examples": [
                "04.433.714/0001-44"
              ],
              "id": "/properties/document",
              "title": "The document schema.",
              "type": "string"
            },
            "id": {
              "default": "2",
              "description": "unique identifier of a point of sale.",
              "examples": [
                "2"
              ],
              "id": "/properties/id",
              "title": "The id schema.",
              "type": "string"
            },
            "ownerName": {
              "default": "Ze da Silva",
              "description": "owner name.",
              "examples": [
                "Ze da Silva"
              ],
              "id": "/properties/ownerName",
              "title": "The ownername schema.",
              "type": "string"
            },
            "tradingName": {
              "default": "Adega Pinheiros",
              "description": "company name.",
              "examples": [
                "Adega Pinheiros"
              ],
              "id": "/properties/tradingName",
              "title": "The tradingname schema.",
              "type": "string"
            }
          },
          "required": [
            "coverageArea",
            "tradingName",
            "ownerName",
            "address",
            "document",
            "id"
          ],
          "type": "object"
        }

### Retrieve a Point of Sale [GET]
Get a PoS (Point of Sale) by ID.
The ID is an unique identifier for the data in the database.

+ Response 200

    [Point of Sale][]

### Search a Point of Sale [GET]
Get a PoS by `lng` and `lat`.
The search will return the nearest PoS that provides services to the point you are querying (`lng` and `lat`), the `coverageArea` information in the database will be used to check that.

+ Response 200

    [Point of Sale][]

### Create a Point of Sale [POST]
It creates a registry in the database with PoS information.

+ Request

    + Attributes (object[Point of Sale Object])

    [Point of Sale][]

+ Response 201

    [Point of Sale][]
