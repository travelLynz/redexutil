// Copyright (c) 2015, Evan Summers (twitter.com/evanxsummers)
// ISC license, see http://github.com/evanx/redexutil/LICENSE

const logger = Loggers.create(__filename, 'info');

export function map(iterable, fn) {
   //logger.debug('map', typeof iterable);
   let array = [];
   for (let item of iterable) {
      //logger.debug('map item', typeof item, item, fn(item));
      array.push(fn(item));
   }
   return array;
}
