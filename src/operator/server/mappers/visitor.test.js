import {expect} from 'chai';
import * as faker from 'faker';
import moment from 'moment';
import VisitorMapper from './visitor.js';

const dateToUnixString = function(date) {
    return moment(date).unix().toString();
};

const getFakeNotInvitedVisitor = function() {
    const lastTime = faker.date.past();
    const firstTime = faker.date.past(1/365, lastTime);
    const externalIp = faker.internet.ip();
    const internalIp = faker.random.arrayElement([
        ` (${faker.internet.ip()})`,
        ''
    ]);

    return {
        id: faker.random.number({min: 1, max: 1000}),
        userName: faker.name.findName(),
        userId: faker.random.number().toString(16) + '.' + faker.random.number().toString(),
        userAgent: faker.internet.userAgent(),
        userIp: externalIp,
        remote: externalIp + internalIp,
        firstTime: dateToUnixString(firstTime),
        lastTime: dateToUnixString(lastTime),
        chats: faker.random.number({min: 0, max: 10}),
        invitations: faker.random.number({min: 0, max: 10}),
        invitationInfo: false
    };
};

const getFakeInvitedVisitor = function () {
    const lastTime = faker.date.past();
    const firstTime = faker.date.past(1/365, lastTime);
    const invitationTime = faker.date.between(firstTime, lastTime);

    let visitor = getFakeNotInvitedVisitor();

    visitor.firstTime = dateToUnixString(firstTime);
    visitor.lastTime = dateToUnixString(lastTime);
    visitor.invitationInfo = {
        time: dateToUnixString(invitationTime),
        agentName: faker.name.findName()
    };

    return visitor;
};

const getFakeVisitor = function() {
    return faker.random.boolean()
        ? getFakeNotInvitedVisitor()
        : getFakeInvitedVisitor();
};

describe('VisitorMapper', () => {
    it('should create instance', () => {
        const mapper = new VisitorMapper(90);
    });

    describe('main fields', () => {
        it('should use userId as id', () => {
            const mapper = new VisitorMapper(0);
            const originalVisitor = getFakeVisitor();

            const mappedVisitor = mapper.mapVisitor(originalVisitor);

            expect(mappedVisitor.id).to.equal(originalVisitor.userId);
        });

        it('should change only key for userName', () => {
            const mapper = new VisitorMapper(0);
            const originalVisitor = getFakeVisitor();

            const mappedVisitor = mapper.mapVisitor(originalVisitor);

            expect(mappedVisitor.name).to.equal(originalVisitor.userName);
        });

        it('should set isInvited flag for invited visitors', () => {
            const mapper = new VisitorMapper(0);

            const mappedVisitor = mapper.mapVisitor(getFakeInvitedVisitor());

            expect(mappedVisitor.isInvited).to.be.true;
        });

        it('should not set isInvited flag for not invited visitors', () => {
            const mapper = new VisitorMapper(0);

            const mappedVisitor = mapper.mapVisitor(getFakeNotInvitedVisitor());

            expect(mappedVisitor.isInvited).to.be.false;
        });
    });

    describe('details', () => {
        it('should map only names for simple details fields', () => {
            const mapper = new VisitorMapper(0);
            const originalVisitor = getFakeVisitor();

            const details = mapper.mapVisitor(originalVisitor).details;

            expect(details.ip).to.equal(originalVisitor.userIp);
            expect(details.remoteAddress).to.equal(originalVisitor.remote);
            expect(details.userAgent).to.equal(originalVisitor.userAgent);
            expect(details.chatsCount).to.equal(originalVisitor.chats);
            expect(details.invitationsCount).to.equal(originalVisitor.invitations);
        });

        it('should omit "invitedBy" field for not invited visitors', () => {
            const mapper = new VisitorMapper(400);
            const originalVisitor = getFakeNotInvitedVisitor();

            const details = mapper.mapVisitor(originalVisitor).details;

            expect(details).to.not.have.property('invitedBy');
        });

        it('should omit "invitationTime" field for not invited visitors', () => {
            const mapper = new VisitorMapper(400);
            const originalVisitor = getFakeNotInvitedVisitor();

            const details = mapper.mapVisitor(originalVisitor).details;

            expect(details).to.not.have.property('invitationTime');
        });

        it('should map "invitedBy" field correctly', () => {
            const mapper = new VisitorMapper(400);
            const originalVisitor = getFakeInvitedVisitor();

            const details = mapper.mapVisitor(originalVisitor).details;

            expect(details.invitedBy).to.equal(originalVisitor.invitationInfo.agentName);
        });

        describe('timestamps', () => {
            it('should convert firstTime to number', () => {
                const mapper = new VisitorMapper(0);
                const originalVisitor = getFakeVisitor();

                const details = mapper.mapVisitor(originalVisitor).details;

                expect(details.firstTime).to.be.a('number');
            });

            it('should convert lastTime to number', () => {
                const mapper = new VisitorMapper(0);
                const originalVisitor = getFakeVisitor();

                const details = mapper.mapVisitor(originalVisitor).details;

                expect(details.lastTime).to.be.a('number');
            });

            it('should convert invitationTime to number (invited only)', () => {
                const mapper = new VisitorMapper(0);
                const originalVisitor = getFakeInvitedVisitor();

                const details = mapper.mapVisitor(originalVisitor).details;

                expect(details.invitationTime).to.be.a('number');
            });

            it('should add time difference to firstTime', () => {
                const mapper = new VisitorMapper(400);
                const originalVisitor = getFakeVisitor();

                const details = mapper.mapVisitor(originalVisitor).details;

                expect(details.firstTime)
                    .to.equal(parseInt(originalVisitor.firstTime) + 400);
            });

            it('should add time difference to lastTime', () => {
                const mapper = new VisitorMapper(500);
                const originalVisitor = getFakeVisitor();

                const details = mapper.mapVisitor(originalVisitor).details;

                expect(details.lastTime)
                    .to.equal(parseInt(originalVisitor.lastTime) + 500);
            });

            it('should add time difference to invitationTime (invited only)', () => {
                const mapper = new VisitorMapper(600);
                const originalVisitor = getFakeInvitedVisitor();

                const details = mapper.mapVisitor(originalVisitor).details;

                expect(details.invitationTime)
                    .to.equal(parseInt(originalVisitor.invitationInfo.time) + 600);
            });
        });
    });
});
