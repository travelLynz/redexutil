// Copyright (c) 2015, Evan Summers (twitter.com/evanxsummers)
// ISC license, see http://github.com/evanx/redexutil/LICENSE

import lodash from 'lodash';

const logger = Loggers.create(__filename, 'info');

export function join(array) {
   if (!lodash.isArray(array)) {
      return 'invalid~array';
   } else if (lodash.isEmpty(array)) {
      return 'empty~array';
   } else {
      return array.join(' ');
   }
}

export function keys(object) {
   if (!object) {
      return 'none~keys';
   } else {
      const keys = Object.keys(object);
      if (lodash.isEmpty(keys)) {
         return 'empty~keys';
      } else {
         return keys.join(' ');
      }
   }
}

export function hhmm(date) {
   if (!date) {
      return 'empty~date';
   } else {
      return new Date(date).toISOString().substring(10, 14);
   }
}

export function sha(sha) {
   if (typeof sha !== 'string') {
      return typeof sha + '~sha'
   } else if (sha.length > 6) {
      return sha.slice(-6);
   } else {
      return 'sha~' + sha.length;
   }
}

export function format(object) {
   let string;
   if (!object) {
      return 'empty~object';
   } else if (typeof object === 'string') {
      string = object;
   } else if (lodash.isArray(object)) {
      return 'array~' + object.length;
   } else if (typeof object === 'object') {
      if (object.constructor) {
         return object.constructor.name + '~constructor';
      } else {
         logger.error('format', object);
         return object.toString();
      }
   } else {
      string = object.toString();
   }
   if (/\s/.test(string)) {
      return 'string~' + string.length;
   } else {
      return string;
   }
}

export function valueProps(object) {
   if (!object) {
      return [];
   }
   let result = {};
   if (!Object.keys(object).length) {
      return [];
   }
   Object.keys(object).forEach(key => {
      let value = object[key];
      if (!value) {
         value = 'empty';
      } else if (lodash.isObject(value)) {
         value = Object.keys(value).join(',');
      } else if (lodash.isArray(value)) {
         value = 'array~' + array.length;
      }
      result[key] = value;
   });
   return result;
}

export function formatKeys(object, predicate) {
   if (!object) {
      return 'empty~keys';
   } else if (predicate) {
   } else if (lodash.isFunction(predicate)) {
      return Objects.keys(object, predicate).join(' ');
   } else {
      return Object.keys(object).join(' ');
   }
}

export function formatValues(object, predicate) {
   if (!object) {
      return 'EmptyObject';
   }
   let keys = [];
   if (lodash.isFunction(predicate)) {
   } else if (lodash.isString(predicate)) {
      keys = predicate.split(' ');
   } else if (lodash.isArray(predicate)) {
      keys = predicate;
   } else {
      return 'InvalidPredicate:' + typeof predicate;
   }
   if (keys.length) {
      predicate = key => keys.includes(key);
   }
   return Objects.keys(object, predicate).map(key => {
      const value = object[key];
      const string = format(value);
      if (string.indexOf(' ') >= 0) {
         return `${key}='${string}'`;
      } else {
         return key + '=' + value;
      }
   }).join(' ');
}

export function formatType(object) {
   if (!object) {
      return 'empty~type';
   } else {
      return Object.keys(object).join(' ');
   }
}
