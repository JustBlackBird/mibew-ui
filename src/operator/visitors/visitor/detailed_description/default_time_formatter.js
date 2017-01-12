import moment from 'moment';

export default function (timestamp) {
    return moment.unix(timestamp).fromNow();
};
