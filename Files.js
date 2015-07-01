
// Copyright (c) 2015, Evan Summers (twitter.com/evanxsummers)
// ISC license, see http://github.com/evanx/redex/LICENSE

import fs from 'fs';

import Promises from './Promises';
import Loggers from './Loggers';

const logger = Loggers.create(module.filename);

const Files = {
   stat(path) {
      logger.debug('stat', path);
      return Promises.create(cb => fs.stat(path, cb));
   },
   existsFile(file) {
      return Files.stat(file).then(stats => stats.isFile()).catch(err => {
         logger.debug('existsFile', err.message);
         return false;
      });
   },
   existsFileSync(file) {
      try {
         return fs.statSync(file).isFile();
      } catch (err) {
         logger.debug('existsFileSync', err.message);
         return false;
      }
   },
   watch(dir, timeout) {
      logger.info('watch', dir, timeout);
      return new Promise((resolve, reject) => {
         let watcher = fs.watch(dir, (event, file) => {
            logger.debug('watch', event, file);
            resolve({event, file});
         });
         setTimeout(() => {
            logger.info('watch timeout', timeout);
            watcher.close();
            resolve({});
         }, timeout);
      });
   },
   readFile(file) {
      logger.debug('readFile', file);
      return new Promise((resolve, reject) => {
         fs.readFile(file, (err, content) => {
            logger.debug('readFile', file, {err});
            if (err) {
               reject(err);
            } else {
               logger.debug('readFile resolve:', file, content.length);
               resolve(content);
            }
         });
      });
   },
   writeFile(file, content) {
      logger.debug('writeFile', file);
      return new Promise((resolve, reject) => {
         fs.writeFile(file, content, err => {
            logger.debug('writeFile', file, {err});
            if (err) {
               reject(err);
            } else {
               resolve();
            }
         });
      });
   }
};

module.exports = Files;
