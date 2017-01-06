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
 * Represents interaction type
 *
 * @constructor
 */
function BaseInteraction(){
    /**
     * Defines mandatory arguments and default values for them
     *
     * Keys of the array are function names ('*' for all functions). Values are
     * arrays of mandatory arguments with key for name of an argument and value
     * for default value.
     *
     * For example:
     * <code>
     * this.mandatoryArguments = function() {
     *      return {
     *           '*': {
     *               'return': {},
     *               'references': {}
     *           },
     *           'result': {
     *               'errorCode': 0
     *           }
     *      }
     * }
     * </code>
     * @returns {Object}
     * @private
     */
    this.mandatoryArguments = function() {
        return {};
    };

    /**
     * Returns reserved (system) functions' names
     *
     * Reserved functions cannon be called directly by the other side and are
     * used for low-level purposes. For example function "result" is used to
     * send back a result of request execution.
     *
     * @returns {Array}
     */
    this.getReservedFunctionsNames = function() {
        return [];
    };
}

/**
 * Returns mandatory arguments for the functionName function
 *
 * @param {String} functionName Function name
 * @returns {Array} An array of mandatory arguments
 */
BaseInteraction.prototype.getMandatoryArguments = function(functionName) {
    var allMandatoryArguments = this.mandatoryArguments();
    var mandatoryArguments = [];
    // Add mandatory for all functions arguments
    if (typeof allMandatoryArguments['*'] == 'object') {
        for (var arg in allMandatoryArguments['*']) {
            if (! allMandatoryArguments['*'].hasOwnProperty(arg)) {
                continue;
            }
            mandatoryArguments.push(arg);
        }
    }
    // Add mandatory arguments for given function
    if (typeof allMandatoryArguments[functionName] == 'object') {
        for (var arg in allMandatoryArguments[functionName]) {
            if (! allMandatoryArguments[functionName].hasOwnProperty(arg)) {
                continue;
            }
            mandatoryArguments.push(arg);
        }
    }
    return mandatoryArguments;
};

/**
 * Returns default values of mandatory arguments for the functionName function
 *
 * @param {String} functionName Function name
 * @returns {Object} An object fields names are mandatory arguments and
 * values are default values of them
 */
BaseInteraction.prototype.getMandatoryArgumentsDefaults = function(functionName) {
    var allMandatoryArguments = this.mandatoryArguments();
    var mandatoryArguments = {};
    // Add mandatory for all functions arguments
    if (typeof allMandatoryArguments['*'] == 'object') {
        for (var arg in allMandatoryArguments['*']) {
            if (! allMandatoryArguments['*'].hasOwnProperty(arg)) {
                continue;
            }
            mandatoryArguments[arg] = allMandatoryArguments['*'][arg];
        }
    }
    // Add mandatory arguments for given function
    if (typeof allMandatoryArguments[functionName] == 'object') {
        for (var arg in allMandatoryArguments[functionName]) {
            if (! allMandatoryArguments[functionName].hasOwnProperty(arg)) {
                continue;
            }
            mandatoryArguments[arg] = allMandatoryArguments[functionName][arg];
        }
    }
    return mandatoryArguments;
};

module.exports = BaseInteraction;
