const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const WEEK = DAY * 7;
const YEAR = DAY * 365;

let format = (str) => {
  let date = new Date(parseInt(str) * 1000);
  let now = new Date();

  let diff = now.getTime() - date.getTime();

  if (diff >= YEAR) {
    return `${Math.floor(diff/YEAR)}y`;
  }

  if (diff >= WEEK) {
   return `${Math.floor(diff/WEEK)}w`;
  }

  if (diff >= DAY) {
   return `${Math.floor(diff/DAY)}d`;
  }

  if (diff >= HOUR) {
   return `${Math.floor(diff/HOUR)}h`;
  }

  if (diff >= MINUTE) {
   return `${Math.floor(diff/MINUTE)}m`;
  }

  if (diff >=SECOND) {
   return `${Math.floor(diff/SECOND)}s`;
  }
};

export default format;
