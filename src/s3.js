const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const {config} = require("./config");
const {S3Client, PutObjectCommand} = require("@aws-sdk/client-s3");

const GetMeta = function (file) {
  const stat = fs.statSync(file);
  const name = encodeURIComponent(path.basename(file));
  const suffixs = name.split(".");
  return {
    name,                                           // 名称
    size: String(stat.size),                        // 大小
    type: mime.lookup(file) || void 0,              // 类型
    lastmodified: String(stat.mtime.getTime()),     // 最后修改时间
    suffix: suffixs[suffixs.length - 1],            // 文件后缀
  };
};

const GetFilePath = function (meta) {
  const env = config();
  let value;
  if (env.remote) {
    value = env.remote;
  } else {
    const title = meta.name.split(".");
    if (title.length >= 2) {
      value = `${title.slice(0, -1).join(".")}.${meta.suffix}`;
    } else {
      value = `${title.join(".")}.${meta.suffix}`;
    }
  }
  return value.replace(/^\//, "");
};


const GetContentDisposition = function (name) {
  if (name) {
    return `attachment; filename="${encodeURIComponent(decodeURIComponent(name))}"`;
  }
  return "attachment";
};


// 硬编码区域和凭证以确保正确传递
const GetClient = function () {
  const env = config();
  return new S3Client({
    region: env.region, endpoint: env.host, credentials: {
      accessKeyId: env.access, secretAccessKey: env.secret,
    },
  });
};

const PutObject = function (src) {
  const env = config();
  const meta = GetMeta(src);
  const path = GetFilePath(meta);
  const client = GetClient();
  const command = new PutObjectCommand({
    Key: path,
    Metadata: meta,
    Bucket: env.bucket,
    ContentType: meta.type,
    Body: fs.createReadStream(src),
    ContentDisposition: GetContentDisposition(meta.name),
  });
  return Promise.all([
    client.send(command),
    meta,
    path,
  ]);
}


module.exports = {PutObject};
