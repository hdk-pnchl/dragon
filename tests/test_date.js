// https://www.npmjs.com/package/time-stamp
const timestamp = require('time-stamp');
// https://www.npmjs.com/package/unix-timestamp
const unixTimestamp = require('unix-timestamp');

// console.log(timestamp());
// //=> 2018-10-26
//
// console.log(typeof timestamp.utc());
// //=> 2018-10-26
//
//
// console.log("unixTimestamp.now: ",unixTimestamp.now());
//
// //console.log(unixTimestamp.toDate(timestamp()));
//
// let s = new Date(unixTimestamp.now()).toLocaleDateString("en-US")
// // expected output "8/30/2017"
// console.log("s: ",s);

// let date1= new Date();
// console.log("New date::", date1);
// console.log("New date getTime:: ", date1.getTime());
//
// let currentDateInUnixTimestamp= unixTimestamp.fromDate(date1);
// console.log("Unix Timestamp: ", currentDateInUnixTimestamp);
//
// console.log("Unix Timestamp new Date", new Date(currentDateInUnixTimestamp));
//
// console.log("Convert unix to js date:: ", new Date(date1.getTime()));


let newdate002= new Date();

console.log("New date::", newdate002);
let utcString= newdate002.toUTCString();
console.log("New date UTC string: ", utcString);

let utcDate= new Date(utcString);
console.log("UTC Date: ", utcDate);
let utcDatetime= utcDate.getTime();
console.log("UTC Datetime: ", utcDatetime);

let utcDateback= new Date(utcDatetime);
console.log("UTC Date converted: ", utcDateback);

console.log(new Date(parseInt("1636512085000")));

// console.log(timestamp('YYYY'));
// //=> 2018
// console.log(timestamp.utc('YYYY'));
// //=> 2018
//
// console.log(timestamp('MM'));
// //=> 10
// console.log(timestamp.utc('MM'));
// //=> 10
//
// console.log(timestamp('DD'));
// //=> 26
// console.log(timestamp.utc('DD'));
// //=> 26
//
// console.log(timestamp('HH'));
// //=> 00
// console.log(timestamp.utc('HH'));
// //=> 04
//
// console.log(timestamp('mm'));
// //=> 46
// console.log(timestamp.utc('mm'));
// //=> 46
//
// console.log(timestamp('ss'));
// //=> 24
// console.log(timestamp.utc('ss'));
// //=> 24
//
// console.log(timestamp('ms'));
// //=> 186
// console.log(timestamp.utc('ms'));
// //=> 186

