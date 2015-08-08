// Copyright (c) 2015, Evan Summers (twitter.com/evanxsummers)
// ISC license, see http://github.com/evanx/redexutil/LICENSE

import assert from 'assert';

import Loggers from './Loggers';

const logger = Loggers.create(module.filename, 'info');

function getMessage(seconds, message) {
  return message + ': ' + seconds;
}

const factors = {
  s: 1,
  m: 60,
  h: 60*60,
  d: 60*60*24
};

const that = {
  format(seconds) {
    if (seconds < factors.m) {
      return '' + seconds + 's';
    } else if (seconds < factors.h) {
      return '' + parseInt(seconds/factors.m) + 'm';
    } else if (seconds < factors.d) {
      return '' + parseInt(seconds/factors.h) + 'h';
    } else {
      return '' + parseInt(seconds/factors.d) + 'd';
    }
  },
  parse(seconds, defaultValue) {
    let match = seconds.match(/^([0-9]+)([a-z]*)$/);
    if (match.length === 3) {
      assert(factors[match[2]], 'factor: ' + match[2]);
      let value = parseInt(match[1]);
      let factor = factors[match[2]];
      return value * factor;
    }
    return defaultValue;
  },
  fromDays(days) {
    return days * factors.d;
  },
  assert(seconds, message) {
    message = message + ': ' + seconds;
    assert(seconds, message);
    let value = that.parse(seconds, -1);
    assert(value >= 0, message + ': ' + value);
    return value;
  }
};

module.exports = that;
