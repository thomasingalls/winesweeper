import R from 'ramda';

const notEmptyString = val => ((typeof val === 'string' && val.trim() !== '') || typeof val === 'number');
const notNone = R.filter(notEmptyString);
export const cx = arr => R.compose(R.uniqBy(String), notNone)(arr).join(' ');
