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

/**
 * Implements functions execution context
 *
 * @constructor
 */
function ExecutionContext() {
    /**
     * Values which returns after execution of all functions in request
     * @private
     */
    this.returnValues = {};

    /**
     * Results of execution of all function in request
     * @private
     */
    this.functionsResults = [];
}

/**
 * Build arguments list by replace all references by values of execution
 * context
 *
 * @param {Object} functionObject The Function. See MibewAPI for details.
 * @returns {Array} Arguments list
 * @throws Error
 */
ExecutionContext.prototype.getArgumentsList = function(functionObject) {
    var argumentsList = functionObject.arguments;
    var references = functionObject.arguments.references;
    var referenceTo, funcNum;
    for (var variableName in references) {
        if (! references.hasOwnProperty(variableName)) {
            continue;
        }
        referenceTo = null;
        funcNum = references[variableName];
        // Check target function in context
        if (typeof this.functionsResults[funcNum - 1] == "undefined") {
            // Wrong function number
            throw new Error("Wrong reference in '" +
                functionObject['function'] + "' function. Function #" +
                funcNum + " does not call yet."
            );
        }

        // Check reference
        if (typeof argumentsList[variableName] == "undefined" ||
                argumentsList[variableName] == "") {
            // Empty argument that should contains reference
            throw new Error("Wrong reference in '" +
                    functionObject['function'] + "' function. " +
                    "Empty '" + variableName + "' argument."
            );
        }
        referenceTo = argumentsList[variableName];

        // Check target value
        if (typeof this.functionsResults[funcNum - 1][referenceTo] == "undefined") {
            throw new Error(
                "Wrong reference in '" + functionObject['function'] +
                "' function. There is no '" + referenceTo +
                "' argument in #" + funcNum + " function results"
            );
        }

        // Replace reference by target value
        argumentsList[variableName] = this.functionsResults[funcNum - 1][referenceTo];
    }
    return argumentsList;
};

/**
 * Returns requets results
 *
 * @returns {Object}
 */
ExecutionContext.prototype.getResults = function(){
    return this.returnValues;
};

/**
 * Stores functions results in execution context and add values to request
 * result
 *
 * @param {Object} functionObject The Function. See MibewAPI for details.
 * @param {Object} results Object of the function results.
 * @throws Error
 */
ExecutionContext.prototype.storeFunctionResults = function(functionObject, results) {
    var alias;
    // Check if function return correct results
    if (!results.errorCode) {
        // Add value to request results
        for (var argName in functionObject.arguments["return"]) {
            if (! functionObject.arguments["return"].hasOwnProperty(argName)) {
                continue;
            }
            alias = functionObject.arguments["return"][argName];
            if (typeof results[argName] == "undefined") {
                throw new Error(
                    "Variable with name '" + argName + "' is undefined in " +
                    "the results of the '" + functionObject['function'] +
                    "' function"
                );
            }
            this.returnValues[alias] = results[argName];
        }
    } else {
        // Something went wrong during function execution
        // Store error code and error message
        this.returnValues.errorCode = results.errorCode;
        this.returnValues.errorMessage = results.errorMessage || '';
    }
    // Store function results in execution context
    this.functionsResults.push(results);
};

module.exports = ExecutionContext;
