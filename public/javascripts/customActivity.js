define([
    'postmonger'
], function (
    Postmonger
) {
    'use strict';

    var connection = new Postmonger.Session();

    var lastStepEnabled = false;

    var steps = [ // initialize to the same value as what's set in config.json for consistency
        { "label": "Custom Activity", "key": "step1" }
    ];

    var currentStep = steps[0].key;

    $(window).ready(onRender);

    connection.on('requestedSchema', schemaData);
    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);
    connection.on('requestedTriggerEventDefinition', eventDefinitionModel);
    connection.on('clickedNext', save);

    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('requestSchema');
        connection.trigger('ready');
        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');
        connection.trigger('requestTriggerEventDefinition');
        connection.trigger('requestInteraction');
        connection.trigger('requestInteractionDefaults');
        connection.trigger('requestCulture');
    }

    connection.on('requestedInteraction', function (settings) {
    });
    connection.on('requestedInteractionDefaults', function (settings) {
    });

    connection.on('requestedCulture', function (cultureCodeString) {
    });

    function schemaData(data) {

    }

    function initialize(data) {

    }

    function onGetTokens(tokens) {

    }

    function onGetEndpoints(endpoints) {
        // Response: endpoints = { restHost: <url> } i.e. "rest.s1.qa1.exacttarget.com"
    }

    function eventDefinitionModel(eventDefinitionModel) {

    }

    async function save() {

    }
});