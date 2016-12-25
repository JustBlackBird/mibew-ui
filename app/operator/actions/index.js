export const UPDATE_VISITORS = 'update_visitors';
export const INVITE_VISITOR = 'invite_visitor';

export function updateVisitors(visitors) {
    return {
        type: UPDATE_VISITORS,
        visitors
    };
};

export function inviteVisitor(visitorId) {
    return {
        type: INVITE_VISITOR,
        visitorId
    };
};

