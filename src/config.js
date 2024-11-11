/**
 * @file Config
 * @author svon.me@gmail.com
 */

const core = require('@actions/core');

const config = function () {
  return {
    region: core.getInput('region'),
    bucket: core.getInput('bucket'),
    host: core.getInput('host'),
    access: core.getInput('access'),
    secret: core.getInput('secret'),
    local: core.getInput('local'),
    remote: core.getInput('remote')
  };
}

module.exports = {config};