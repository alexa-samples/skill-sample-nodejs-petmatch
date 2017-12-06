function randomInt(n) {
    return parseInt(n + Math.random() * n);
}

var animals = [
    'dog',
    'cat'
]

var sizeRes = [
    'large',
    'small',
    'tiny',
    'medium'
]

var size = [
    'large',
    'small',
    'tiny',
    'medium',
    'average',
    'huge',
    'truck',
    'gigantic',
    'scary big',
    'ginormous',
    'ride',
    'waist height',
    'bigger than a cat',
    'on the bed',
    'up to my knees',
    'average',
    'little',
    'take on an airplane',
    'cheap to feed',
    'teacup',
    'pocket',
    'memo sized',
    'yippy',
    'carry in my purse',
    'put in my pocket',
    'itty bitty'
]

var temperamentRes = [
    "family",
    "guard",
    "watch"
]

var temperament = [
    'calm',
    'active',
    'relaxed',
    'chilled',
    'adult',
    'barks at people',
    'to protect me',
    'protective',
    'is kid friendly',
    'good with kids',
    'family friends',
    'gentle with kids',
    'family',
    'guard',
    'watch'
]

var energyRes = [
    'low',
    'med',
    'high'
];

var energy = [
    'high',
    'medium',
    'low',
    'to cuddle with',
    'to watch netflix with',
    'lazy',
    'for my apartment',
    'fun to play with',
    'tug of war',
    'plays tug of war',
    'that I can run with',
    'play frisbee',
    'run',
    'hike',
    'go hiking',
    'play fetch',
    'energetic',
    'high energy'
]

var bool = [
    0,
    1
]



function randFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}


function genRandomAnalytics(n) {
    let array = [];
    while (n--) {
        array.push({
            PutRequest: {
                Item: {
                    request_id: 'requestid' + randomInt(10000000000),
                    user_id: 'user' + randomInt(10000000000),
                    api_execution_time: randomInt(100),
                    slot_value_animal_resolved: randFromArray(animals),
                    slot_value_animal_synonym: randFromArray(animals),
                    slot_value_animal_is_valid: randFromArray(bool),
                    slot_value_size_resolved: randFromArray(sizeRes),
                    slot_value_size_synonym: randFromArray(size),
                    slot_value_size_is_valid: randFromArray(bool),
                    slot_value_temperament_resolved: randFromArray(temperamentRes),
                    slot_value_temperament_synonym: randFromArray(temperament),
                    slot_value_temperament_is_valid: randFromArray(bool),
                    slot_value_energy_resolved: randFromArray(energyRes),
                    slot_value_energy_synonym: randFromArray(energy),
                    slot_value_energy_is_valid: randFromArray(bool)
                }
            }
        });
    }

    return array;
}


exports.handler = (event, context, callback) => {

    var params = {
        RequestItems: {
            "pet-match-analytics": genRandomAnalytics(25) // adds dummy data in batches of 25 (max batch rate)
        }
    };

    console.log(params.RequestItems["pet-match-analytics"][0]);

    if (event.test) {
        context.succeed('testing...');
        return;
    }

    const AWS = require('aws-sdk');
    AWS.config.update({ region: 'eu-west-1' }); // change this to your region

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    dynamodb.batchWrite(params, function (err, data) {
        if (err) context.fail(err);
        else context.succeed('Successfully saved analytics');
    });

};