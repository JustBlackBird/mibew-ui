/*!
 * This file is a part of Mibew Messenger.
 *
 * Copyright 2005-2016 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var BaseInteraction = require('./interactions/base_interaction');

/**
 * Mibew API class constructor
 *
 * @constructor
 * @param {BaseInteraction} interaction An object that represents
 * interaction type
 */
function MibewAPI(interaction) {

    /**
     * Version of the MIBEW API protocol implemented by the object
     */
    this.protocolVersion = "1.0";

    // Check interaction type
    if (typeof interaction != "object" ||
            !(interaction instanceof BaseInteraction)) {
        throw new Error("Wrong interaction type");
    }

    /**
     * An object that encapsulates type of the interaction
     * @private
     * @type BaseInteraction
     */
    this.interaction = interaction;
}

/**
 * Validate function
 *
 * Throws an Error object if function is not valid.
 *
 * @param {Object} functionObject The function. See Mibew API for details.
 * @param {Boolean} [filterReservedFunctions=false]. Determine if function
 * name must not be in reserved list
 * @thows Error
 */
MibewAPI.prototype.checkFunction = function(functionObject, filterReservedFunctions) {
    filterReservedFunctions = filterReservedFunctions || false;

    // Check function name
    if (typeof functionObject["function"] == "undefined" ||
        functionObject["function"] == "") {
        throw new Error("Cannot call for function with no name");
    }
    if (filterReservedFunctions) {
        var reservedFunctionsNames = this.interaction.getReservedFunctionsNames();
        for (var i = 0; i < reservedFunctionsNames.length; i++) {
            if (functionObject["function"] == reservedFunctionsNames[i]) {
                throw new Error(
                    "'" + functionObject["function"] +
                    "' is reserved function name"
                );
            }
        }
    }

    // Check function's arguments
    if (typeof functionObject.arguments != "object") {
        throw new Error(
            "There are no arguments in '" + functionObject["function"] +
            "' function"
        );
    }
    var mandatoryArgumentsCount = 0;
    var mandatoryArgumentsList = this.interaction.getMandatoryArguments(
        functionObject['function']
    );
    argumentsLoop:
    for (var argName in functionObject.arguments){
        if (!functionObject.arguments.hasOwnProperty(argName)) {
            // Work with own properties only.
            continue;
        }
        for (var i = 0; i < mandatoryArgumentsList.length; i++) {
            if (argName == mandatoryArgumentsList[i]) {
                mandatoryArgumentsCount++;
                continue argumentsLoop;
            }
        }
    }
    if (mandatoryArgumentsCount != mandatoryArgumentsList.length) {
        throw new Error(
            "Not all mandatory arguments are set in '" +
            functionObject["function"] + "' function"
        );
    }
};

/**
 * Validate request
 *
 * Throws an Error object if request is not valid.
 *
 * @param {Object} requestObject The Request. See Mibew API for details.
 * @thows Error
 */
MibewAPI.prototype.checkRequest = function(requestObject) {
    // Check token
    if (typeof requestObject.token != "string") {
        if (typeof requestObject.token == "undefined") {
            throw new Error("Empty token");
        } else {
            throw new Error("Wrong token type");
        }
    }
    if (requestObject.token == "") {
        throw new Error("Empty token");
    }

    // Request must have at least one function
    if (typeof requestObject.functions != "object" ||
            !(requestObject.functions instanceof Array) ||
            requestObject.functions.length == 0) {
        throw new Error("Empty functions set");
    }

    // Check function
    for (var i = 0; i < requestObject.functions.length; i++) {
        this.checkFunction(requestObject.functions[i]);
    }
};

/**
 * Validate package.
 *
 * Throws an Error object if package is not valid.
 *
 * @param {Object} packageObject The package. See Mibew API for details.
 * @thows Error
 */
MibewAPI.prototype.checkPackage = function (packageObject) {
    // Check signature
    if (typeof packageObject.signature == "undefined") {
        throw new Error("Missed package signature");
    }

    // Check protocol
    if (typeof packageObject.proto == "undefined") {
        throw new Error("Missed protocol version");
    }
    if (packageObject.proto != this.protocolVersion) {
        throw new Error("Wrong protocol version");
    }

    // Check async flag
    if (typeof packageObject.async == "undefined") {
        throw new Error("'async' flag is missed");
    }
    if (typeof packageObject.async != "boolean") {
        throw new Error("Wrong 'async' flag value");
    }

    // Package must have at least one request
    if (typeof packageObject.requests != "object" ||
            !(packageObject.requests instanceof Array) ||
            packageObject.requests.length == 0) {
        throw new Error("Empty requests set");
    }

    // Check requests in package
    for (var i = 0; i < packageObject.requests.length; i++) {
        this.checkRequest(packageObject.requests[i]);
    }
};

/**
 * Search 'result' function in functionsList. If request contains more than
 * one result functions throws an Error
 *
 * @param {Object[]} functionsList Array of functions. See MibewAPI for
 * function structure details
 * @param {Boolean|null} [existence="null"] (optional) Control existence of
 * the 'result' function in request. Use boolean true if 'result' function
 * must exists in request, boolean false if must not and null if it doesn't
 * matter.
 * @returns {Object|null} Function object if 'result' function found and
 * null otherwise
 * @throws Error
 */
MibewAPI.prototype.getResultFunction = function(functionsList, existence){
    if (typeof existence == "undefined") {
        existence = null;
    }
    var resultFunction = null;
    // Try to find result function
    for (var i in functionsList) {
        if (! functionsList.hasOwnProperty(i)) {
            continue;
        }
        if (functionsList[i]["function"] == 'result') {
            if (resultFunction !== null) {
                // Another result function found
                throw new Error(
                    "Function 'result' already exists in functions list"
                );
            }
            // First 'result' function found
            resultFunction = functionsList[i];
        }
    }
    if (existence === true && resultFunction === null) {
        // 'result' function must present in request
        throw new Error("There is no 'result' function in functions list");
    }
    if (existence === false && resultFunction !== null) {
        throw new Error("There is 'result' function in functions list");
    }
    return resultFunction;
};

/**
 * Builds result package
 *
 * @param {Object} resultArguments Arguments of the result function
 * @param {String} token Token of the result package
 * @returns {Object} Result package
 */
MibewAPI.prototype.buildResult = function(resultArguments, token) {
    var mergedArguments = resultArguments;
    var defaultArguments = this.interaction.getMandatoryArgumentsDefaults('result');
    for (var argName in defaultArguments) {
        if (! defaultArguments.hasOwnProperty(argName)) {
            continue;
        }
        mergedArguments[argName] = defaultArguments[argName];
    }
    return {
        'token': token,
        'functions': [
            {
                'function' : 'result',
                'arguments' : mergedArguments
            }
        ]
    };
};

/**
 * Encodes package
 *
 * @param {Object[]} requests Array of the Requests. See Mibew API for
 * details.
 * @returns {String} Ready for transfer encoded package
 */
MibewAPI.prototype.encodePackage =  function(requests) {
    var packageObject = {};
    packageObject.signature = "";
    packageObject.proto = this.protocolVersion;
    packageObject.async = true;
    packageObject.requests = requests;
    return encodeURIComponent(JSON.stringify(packageObject)).replace(/\%20/gi, '+');
};

/**
 * Decodes package and validate package structure
 *
 * Throws an Error object if package cannot be decoded or is not valid
 *
 * @param {String} encodedPackage Encoded package
 * @returns {Object} The Decoded package. See Mibew API for details.
 * @throws Error
 */
MibewAPI.prototype.decodePackage = function(encodedPackage){
    var decodedPackage = JSON.parse(decodeURIComponent(encodedPackage.replace(/\+/gi, ' ')));
    this.checkPackage(decodedPackage);
    return decodedPackage;
};

module.exports = MibewAPI;
