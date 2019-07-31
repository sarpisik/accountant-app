import moment from 'moment';

export const inputDateFormat = time => moment(time).format('YYYY-MM-DD');
export const profileDateFormat = time => moment(time).calendar();
