'use strict';
const Alexa = require("alexa-sdk");
const http = require('https');

// For detailed tutorial on how to make an Alexa skill,
// please visit us at http://alexa.design/build

var handlers = {
    'NewSession': function() {
        console.log("in NewSession");
        this.attributes['startSessionTime'] = getCurrentTimestamp();
        // when you have a new session,
        // this is where you'll
        // optionally initialize

        // after initializing, continue on
        routeToIntent.call(this);
    },
    'LaunchRequest': function () {
        console.log("in LaunchRequest");
        this.response.speak('Welcome to pet match. I can help you find the best dog for you. What are two things you are looking for in a dog?');
        this.response.listen('What size and temperament are you looking for in a dog?');
        this.emit(':responseReady');
    },
    'PetMatchIntent' : function () {
        // delegate to Alexa to collect all the required slots
        let isTestingWithSimulator = true; //autofill slots when using simulator, dialog management is only supported with a device

        let filledSlots = delegateSlotCollection.call(this, isTestingWithSimulator);

        if (!filledSlots) { 
            return; 
        }
        
        // at this point, we know that all required slots are filled.
        let slotValues = getSlotValues(filledSlots);
        // synonym the person said - slotValues.synonym
        // what that resolved to - slotValues.resolved
        // and if it's a word that is in your slot values - slotValues.isValidated

        // If the user asks for an animal that doesn't exist, we can use entity
        // resolution to make them all map to mythical_creatures.
        // if the user gave us a mythical_creature then we respond with a random
        // funny phrase and then exit the skill.

        /*
            request_id : '',
            user_id : '',
            api_execution_time : '',
            slot_value_animal_resolved: '',
            slot_value_animal_raw: '',
            slot_value_size_resolved: '',
            slot_value_size_raw: '',
            slot_value_temperament_resolved: '',
            slot_value_temperament_raw: '',
            slot_value_energy_resolved: '',
            slot_value_energy_raw: ''
        */

        // We create the analytics object that will be logged to DynamoDB
        let analyticsPayload = {
            request_id : this.event.request.requestId,
            user_id : this.event.session.user.userId,
            api_execution_time: null,
            slot_value_animal_resolved: slotValues.animal.resolved,
            slot_value_animal_raw: slotValues.animal.synonym,
            slot_value_size_resolved: slotValues.size.resolved,
            slot_value_size_raw: slotValues.size.resolved,
            slot_value_temperament_resolved: slotValues.temperament.resolved,
            slot_value_temperament_raw: slotValues.temperament.resolved,
            slot_value_energy_resolved: slotValues.energy.resolved,
            slot_value_energy_raw: slotValues.energy.resolved
        }

        const time = process.hrtime();

        if (slotValues.animal.resolved == 'mythical_creatures') {

            let speechOutput = randomPhrase(slotsMeta.animal.invalid_responses).replace('{0}', slotValues.animal.synonym);
            this.response.speak(speechOutput);
            this.emit(':responseReady');
        }

        //Call the pet match API
        let petMatchOptions = buildPetMatchOptions(slotValues);
        const self = this;
        
        httpGet(petMatchOptions).then(
            response => {
                console.log("PETMATCH RESULTS: ", JSON.stringify(response));

                saveValue.call(this, {data: response, fieldName: 'past_matches', prefix: '', append: true});
                // this.response.cardRenderer('Your pet match is ...', `A ${response.result.animal.name}`,
                //                            response.result.animal.images);

                const diff = process.hrtime(time);
                const perf = hrtimeToMilliseconds(diff);

                let start = this.attributes['startSessionTime'];
                if (!isNaN(start)) {
                    this.attributes['totalSessionTime'] = getCurrentTimestamp() - start;
                    this.attributes['startSessionTime'] = null;
                }

                analyticsPayload.api_execution_time = perf
                analyticsPayload.session_time = this.attributes.totalSessionTime

                const AWS = require('aws-sdk');
                AWS.config.update({ region: 'eu-west-1' });
                const dynamodb = new AWS.DynamoDB.DocumentClient();

                const TABLE_NAME = "pet-match-analytics";

                console.log('analyticsPayload >>>> ', analyticsPayload)

                dynamodb.put({
                    "TableName": TABLE_NAME,
                    "Item": analyticsPayload
                }, function (err, data) {
                    if (err) {
                        console.log(err);
                    }

                    self.response.speak("So a "
                        + slotValues.size.resolved + " "
                        + slotValues.temperament.resolved + " "
                        + slotValues.energy.resolved
                        + " energy dog sounds good for you. Consider a "
                        + response.result[0].breed);
                    console.log('great success: ' + JSON.stringify(data, null, '  '));
                });

            }
        ).catch( error => {
            console.log(error);
            this.response.speak("I'm really sorry. I'm unable to access part of my memory. Please try again later.");
            // Part 3: Extra Credit 2: save all the slots and create an 
            // utterance so the user can pick up where they left off
            // HINT 1: You can use saveValue to save the slot values.
            // HINT 2: You can automate the recovery the next time the user 
            // invokes your skill, you can check if there was an error and skip 
            // right to the look up.

        }).then(() => {
            // after we get a result, have Alexa speak.
                this.emit(':responseReady');
            }
        );
    },
    'SessionEndedRequest' : function() {
        console.log('Session ended with reason: ' + this.event.request.reason);
    },
    'AMAZON.StopIntent' : function() {
        this.response.speak('Bye');
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent' : function() {
        this.response.speak("This is pet match. I can help you find the perfect pet for you. " +
             "You can say, I want a dog.");
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent' : function() {
        this.response.speak('Bye');
        this.emit(':responseReady');
    },
    'Unhandled' : function() {
        this.response.speak("Sorry, I didn't get that. You can try: 'alexa, tell pet match" +
            " I want a dog.'");
    }
};

exports.handler = function(event, context) {

    // Each time your lambda function is triggered from your skill,
    // the event's JSON will be logged. Check Cloud Watch to see the event.
    // You can copy the log from Cloud Watch and use it for testing.
    console.log("====================");
    console.log("REQUEST: " + JSON.stringify(event));
    console.log("====================");
    var alexa = Alexa.handler(event, context);

    // Part 3: Task 4
    // alexa.dynamoDBTableName = 'petMatchTable';
    alexa.registerHandlers(handlers);
    alexa.execute();
};

// The hostname for the for the pet match api.
const PET_MATCH_API = {
    HOSTNAME: 'c2r6yzsay9.execute-api.us-east-1.amazonaws.com',
    PETS: '/Test/pets'
}


// if you want to provide custom error messages for invalid slot types,
// you can add them here.
const slotsMeta = {
    'animal': {
        'invalid_responses': [
            "I'm sorry, but I'm not qualified to match you with {0}.",
            "Ah yes, {0} are splendid creatures, but unfortunately owning one as a pet is outlawed.",
            "I'm sorry I can't match you with {0}."
        ],
        'error_default': "I'm sorry I can't match you with {0}."
    }
}

// This data is for testing purposes.
// When process.env.mode is set 'test' (note: it defaults to 'test')
// The slots will be auto loaded with this default data.
// Set the process.env.mode environment variable to anything other
// than 'test' after setting the slots to 'required' in the skill builder
const defaultData = [
    {
        "name": "animal",
        "value": "pooch",
        "ERCode": "ER_SUCCESS_MATCH",
        "ERValues": [
            { "value": "dog" }
        ]
    },
    {
        "name": "energy",
        "value": "play fetch with",
        "ERCode": "ER_SUCCESS_MATCH",
        "ERValues": [
            { "value": "high" },
        ]
    },
    {
        "name": "size",
        "value": "mini",
        "ERCode": "ER_SUCCESS_MATCH",
        "ERValues": [
            { "value": "small" },
            { "value": "tiny" }
        ]
    },
    {
        "name": "temperament",
        "value": "guard",
        "ERCode": "ER_SUCCESS_NO_MATCH",
    },
];


function buildPetMatchParams(slotValues) {   
    let params = [
        [ "size-energy-temperament", 
            `canine-${slotValues.energy.resolved}-no-${slotValues.size.resolved}-${slotValues.temperament.resolved}`]
    ];
    return params;
}



function buildPetMatchOptions(slotValues) {
    let params = buildPetMatchParams(slotValues);
    let port = 443;
    return buildHttpGetOptions(PET_MATCH_API.HOSTNAME, PET_MATCH_API.PETS, port, params)
}

// ***********************************
// ** Helper functions from
// ** These should not need to be edited
// ** www.github.com/alexa/alexa-cookbook
// ***********************************

// ***********************************
// ** Route to Intent
// ***********************************

// after doing the logic in new session,
// route to the proper intent

function routeToIntent() {
  switch (this.event.request.type) {
    case "IntentRequest":
      this.emit(this.event.request.intent.name);
    break;
    case "LaunchRequest":
    default:
      this.emit('LaunchRequest');
    break;
  }
}

// ***********************************
// ** User Memory
// ***********************************

// saves a value into the DynamoDB table.
// The input object options consists of the following:
// options.prefix: string (optional) - value to append to fieldname
// options.fieldName: string - the field to save the data to
// options.response: object - the data to save to DynamoDB
// options.append: boolean - set to TRUE to treat append options.data to a list. 
//                 FALSE will overwrite the data.
// returns null
function saveValue(options) {
    let key = `${options.prefix ? `${options.prefix}` : '' }_${options.fieldName}`;

    // if append and the value exists push it into the array.
    // if append but it doesn't exist add it as an array.
    // else just save it as a singular value.
    // NOTE: This will fail if you set options.append to true
    // on a value that was previously saved with options.append
    // set to false. You'll need to convert the field first.
    // check if it's an array and if not convert it to an array
    // and push.
    if (options.append && this.attributes[key]) {
        this.attributes[key].push(options.data);
    } else if (options.append) {
        this.attributes[key] = [options.data];
    } else {
        this.attributes[key] = options.data;
    }
}

// ***********************************
// ** Dialog Management
// ***********************************

function getSlotValues (filledSlots) {
    //given event.request.intent.slots, a slots values object so you have
    //what synonym the person said - .synonym
    //what that resolved to - .resolved
    //and if it's a word that is in your slot values - .isValidated
    let slotValues = {};

    console.log('The filled slots: ' + JSON.stringify(filledSlots));
    Object.keys(filledSlots).forEach(function(item) {
        //console.log("item in filledSlots: "+JSON.stringify(filledSlots[item]));
        var name = filledSlots[item].name;
        //console.log("name: "+name);
        if(filledSlots[item]&&
           filledSlots[item].resolutions &&
           filledSlots[item].resolutions.resolutionsPerAuthority[0] &&
           filledSlots[item].resolutions.resolutionsPerAuthority[0].status &&
           filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code ) {

            switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
                case "ER_SUCCESS_MATCH":
                    slotValues[name] = {
                        "synonym": filledSlots[item].value,
                        "resolved": filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
                        "isValidated": true
                    };
                    break;
                case "ER_SUCCESS_NO_MATCH":
                    slotValues[name] = {
                        "synonym": filledSlots[item].value,
                        "resolved": filledSlots[item].value,
                        "isValidated":false
                    };
                    break;
                }
            } else {
                slotValues[name] = {
                    "synonym": filledSlots[item].value,
                    "resolved": filledSlots[item].value,
                    "isValidated": false
                };
            }
        },this);
        //console.log("slot values: "+JSON.stringify(slotValues));
        return slotValues;
}

// This function delegates multi-turn dialogs to Alexa.
// For more information about dialog directives see the link below.
// https://developer.amazon.com/docs/custom-skills/dialog-interface-reference.html
function delegateSlotCollection(shouldFillSlotsWithTestData) {
    console.log("in delegateSlotCollection");
    console.log("current dialogState: " + this.event.request.dialogState);

    // This will fill any empty slots with canned data provided in defaultData
    // and mark dialogState COMPLETED.
    // USE ONLY FOR TESTING IN THE SIMULATOR.
    if (shouldFillSlotsWithTestData) {
        let filledSlots = fillSlotsWithTestData.call(this, defaultData);
        this.event.request.dialogState = "COMPLETED";
    };

    if (this.event.request.dialogState === "STARTED") {
        console.log("in STARTED");
        console.log(JSON.stringify(this.event));
        var updatedIntent=this.event.request.intent;
        // optionally pre-fill slots: update the intent object with slot values 
        // for which you have defaults, then return Dialog.Delegate with this 
        // updated intent in the updatedIntent property

        disambiguateSlot.call(this);
        console.log("disambiguated: " + JSON.stringify(this.event));
        this.emit(":delegate", updatedIntent);
        console.log('shouldnt see this.');
    } else if (this.event.request.dialogState !== "COMPLETED") {
        console.log("in not completed");
        //console.log(JSON.stringify(this.event));

        disambiguateSlot.call(this);
        this.emit(":delegate", updatedIntent);
    } else {
        console.log("in completed");
        //console.log("returning: "+ JSON.stringify(this.event.request.intent));
        // Dialog is now complete and all required slots should be filled,
        // so call your normal intent handler.
        return this.event.request.intent.slots;
    }
}


// this function will keep any slot values currently in the request
// and will fill other slots with data from testData
function fillSlotsWithTestData(testData) {
    console.log("in fillSlotsWithTestData");

    //console.log("testData: "+JSON.stringify(testData));
    //loop through each item in testData
    testData.forEach(function(item, index, arr) {
        //check to see if the slot exists
        //console.log("item: "+JSON.stringify(item));
        if (!this.event.request.intent.slots[item.name].value) {
            //fill with test data
            //construct the element
            let newSlot = {
                "name": item.name,
                "value": item.value,
                "resolutions": {
                    "resolutionsPerAuthority": [
                        {
                            "authority": "",
                            "status": {
                                "code": item.ERCode,
                            },
                        }
                    ]
                },
                "confirmationStatus": "CONFIRMED"
            };

            //add Entity resolution values
            if (item.ERCode == "ER_SUCCESS_MATCH") {
                let ERValuesArr = [];
                item.ERValues.forEach(function(ERItem){
                    let value = {
                        "value": {
                            "name": ERItem.value,
                            "id": ""
                        }
                    };
                    ERValuesArr.push(value);
                })
                newSlot.resolutions.resolutionsPerAuthority[0].values=ERValuesArr;
            }

            //add the new element to the response
            this.event.request.intent.slots[item.name]=newSlot;
        }
    },this);

    //console.log("leaving fillSlotsWithTestData");
    return this.event.request.intent.slots;
}

// If the user said a synonym that maps to more than one value, we need to ask 
// the user for clarification. Disambiguate slot will loop through all slots and
// elicit confirmation for the first slot it sees that resolves to more than 
// one value.
function disambiguateSlot() {
    let currentIntent = this.event.request.intent;

    Object.keys(this.event.request.intent.slots).forEach(function(slotName) {
        let currentSlot = this.event.request.intent.slots[slotName];
        let slotValue = slotHasValue(this.event.request, currentSlot.name);
        if (currentSlot.confirmationStatus !== 'CONFIRMED' &&
            currentSlot.resolutions &&
            currentSlot.resolutions.resolutionsPerAuthority[0] &&
            currentSlot.resolutions.resolutionsPerAuthority[0].status.code == 'ER_SUCCESS_MATCH') {

            // if there's more than one value that means we have a synonym that 
            // mapped to more than one value. So we need to ask the user for 
            // clarification. For example if the user said "mini dog", and 
            // "mini" is a synonym for both "small" and "tiny" then ask "Did you
            // want a small or tiny dog?" to get the user to tell you 
            // specifically what type mini dog (small mini or tiny mini).
            if ( currentSlot.resolutions.resolutionsPerAuthority[0].values.length > 1) {
                let prompt = 'Which would you like';
                let size = currentSlot.resolutions.resolutionsPerAuthority[0].values.length;
                currentSlot.resolutions.resolutionsPerAuthority[0].values.forEach(function(element, index, arr) {
                    prompt += ` ${(index == size -1) ? ' or' : ' '} ${element.value.name}`;
                });

                prompt += '?';
                let reprompt = prompt;
                // In this case we need to disambiguate the value that they 
                // provided to us because it resolved to more than one thing so 
                // we build up our prompts and then emit elicitSlot.
                this.emit(':elicitSlot', currentSlot.name, prompt, reprompt);
            }
        }
    }, this);
}

// Given the request an slot name, slotHasValue returns the slot value if one
// was given for `slotName`. Otherwise returns false.
function slotHasValue(request, slotName) {

    let slot = request.intent.slots[slotName];

    //uncomment if you want to see the request
    //console.log("request = "+JSON.stringify(request)); 
    let slotValue;

    //if we have a slot, get the text and store it into speechOutput
    if (slot && slot.value) {
        //we have a value in the slot
        slotValue = slot.value.toLowerCase();
        return slotValue;
    } else {
        //we didn't get a value in the slot.
        return false;
    }
}

// ***********************************
// ** Misc
// ***********************************

function randomPhrase(array) {
    // the argument is an array [] of words or phrases
    var i = 0;
    i = Math.floor(Math.random() * array.length);
    return(array[i]); // If you like one liners this will also do: return(array[Math.floor(Math.random() * array.length)]);
}

// ***********************************
// ** Webservice Calls
// ***********************************

// make an http get request calls resolve upon completion and reject if there's an error.
// returns a promise -
function httpGet(options){
    return new Promise(function(resolve, reject) {
        let req = http.request(options, res => {
            res.setEncoding('utf8');
            let returnData = "";

            if (res.statusCode < 200 || res.statusCode >= 300) {
                // we must return in this case
                // otherwise reject runs on the next tick and we'll get an error
                // when res.on('end') tries to parse the JSON.
                return reject(new Error(`${res.statusCode}: ${res.req.getHeader('host')} ${res.req.path}`));
            }

            res.on('data', chunk => {
                returnData = returnData + chunk;
            });

            res.on('end', () => {
                // we have now received the raw return data in the returnData variable.
                // We can see it in the log output via:
                // console.log(JSON.stringify(returnData))
                // we may need to parse through it to extract the needed data

                let response = JSON.parse(returnData);
                // this will execute whatever the block of code that was passed to
                // httpGet and pass the JSON `response` to it.
                resolve(response);
            });

            res.on('error', error => {
                reject(error);
            });
        });
        req.end();
    });
}

// Creates the options object for an HTTPs GET Request
// Returns an object.
function buildHttpGetOptions(host, path, port, params) {
    let options = {
         hostname: host,
         path: path + buildQueryString(params),
         port: port,
         method: 'GET'
    };
    return options;
}

// Given a list of parameters it builds the query string for a request.
// Returns URI encoded string of parameters.
function buildQueryString(params) {
    let paramList = '';
    params.forEach( (paramGroup, index) => {
        paramList += `${ index == 0 ? '?' : '&'}${encodeURIComponent(paramGroup[0])}=${encodeURIComponent(paramGroup[1])}`;
    });
    return paramList;

}


// Analytics helper functions

function hrtimeToMilliseconds(diff) {
    const NS_PER_SEC = 1e9;
    const NS_PER_MIL = 1e6;
    return (diff[0] * NS_PER_SEC + diff[1]) / NS_PER_MIL;
}

function getCurrentTimestamp() {
    let date = new Date();
    return date.getTime();
}