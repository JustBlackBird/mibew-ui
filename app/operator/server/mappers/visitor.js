/**
 * Maps visitor from server-side representation to client-side one.
 */
export default class VisitorMapper {
    constructor(timeDifference) {
        this._timeDifference = timeDifference;
    }

    mapVisitor(serverVisitor) {
        let visitor = {};

        visitor.id = serverVisitor.userId;
        visitor.name = serverVisitor.userName;
        visitor.ip = serverVisitor.userIp;
        visitor.remoteAddress = serverVisitor.remote;
        visitor.userAgent = serverVisitor.userAgent;
        visitor.chatsCount = serverVisitor.chats;
        visitor.invitationsCount = serverVisitor.invitations;

        visitor.lastTime = parseInt(serverVisitor.lastTime) + this._timeDifference;
        visitor.firstTime = parseInt(serverVisitor.firstTime) + this._timeDifference;

        if (serverVisitor.invitationInfo) {
            const serverInvitationTime = parseInt(serverVisitor.invitationInfo.time);
            visitor.initationTime = serverInvitationTime + this._timeDifference;
        }

        return visitor;
    }
};