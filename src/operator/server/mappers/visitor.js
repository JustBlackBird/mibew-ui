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
        visitor.isInvited = !!serverVisitor.invitationInfo;

        visitor.details = {
            ip: serverVisitor.userIp,
            remoteAddress: serverVisitor.remote,
            userAgent: serverVisitor.userAgent,
            chatsCount: serverVisitor.chats,
            invitationsCount: serverVisitor.invitations,
            lastTime: parseInt(serverVisitor.lastTime) + this._timeDifference,
            firstTime: parseInt(serverVisitor.firstTime) + this._timeDifference
        };

        if (serverVisitor.invitationInfo) {
            visitor.details.invitationTime = parseInt(serverVisitor.invitationInfo.time)
                + this._timeDifference;
            visitor.details.invitedBy = serverVisitor.invitationInfo.agentName;
        }

        return visitor;
    }
};