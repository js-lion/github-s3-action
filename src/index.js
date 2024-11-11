/**
 * @file Github S3 Action
 * @author svon.me@gmail.com
 */

const path = require("path");
const {PutObject} = require("./s3");
const {config} = require("./config");
const core = require('@actions/core');

const main = async function () {
  const env = config()

  let src;
  if (env.local && path.isAbsolute(env.local)) {
    src = path.normalize(env.local);
  } else if (src) {
    src = path.join(process.cwd(), env.local)
  } else {
    src = env.local;
  }
  try {
    if (src) {
      await PutObject(src);
      core.setOutput("result", "upload success");
    }
  } catch (e) {
    core.setFailed("upload error:");
    core.setFailed(e.message);
  }
}

main();