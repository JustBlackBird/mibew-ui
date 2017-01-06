import {EventEmitter} from 'events';
import MibewApi from '../../server/api/mibew_api';
import UsersInteraction from '../../server/api/interactions/users_interaction';
import RpcServer from '../../server/server.js';
import VisitorMapper from './mappers/visitor.js';

/**
 * Facade for old Mibew API implementation.
 *
 * This class incapsulates all interaction related with operator's application.
 * In Mibew 2.x it's anything at Visitors page.
 */
export default class OperatorServer extends EventEmitter {
    constructor(baseUrl, operatorId) {
        super();

        this._operatorId = operatorId;
        this._server = new RpcServer({
            url: baseUrl.replace(/\/$/, '') + '/operator/users/update',
            interactionType: UsersInteraction
        });
        this._initFunctions();
        this._server.runUpdater();
    }

    _initFunctions() {
        // Periodically call update function at the server side
        this._server.callFunctionsPeriodically(
            () => {
                // Build functions list
                return [
                    {
                        "function": "update",
                        "arguments": {
                            "return": {},
                            "references": {},
                            "agentId": this._operatorId
                        }
                    }
                ];
            },
            function() {}
        );

        // Call updateThreads periodically at the server
        this._server.callFunctionsPeriodically(
            () => {
                return [
                    {
                        'function': 'currentTime',
                        'arguments': {
                            'agentId': this._operatorId,
                            'return': {
                                'time': 'currentTime'
                            },
                            'references': {}
                        }
                    },
                    {
                        'function': 'updateVisitors',
                        'arguments': {
                            'agentId': this._operatorId,
                            'return': {
                                'visitors': 'visitors'
                            },
                            'references': {}
                        }
                    }
                ];
            },
            this._updateVisitors.bind(this)
        );
   }

    _updateVisitors(args) {

        if (0 == args.errorCode) {
            // Get time difference between server and client
            let delta;
            if (args.currentTime) {
                delta = Math.round((new Date()).getTime() / 1000) - args.currentTime;
            } else {
                delta = 0;
            }

            const mapper = new VisitorMapper(delta);
            const mapperFunc = mapper.mapVisitor.bind(mapper);

            this.emit('visitors_updated', args.visitors.map(mapperFunc));
        }
    }
};
