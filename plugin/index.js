var css_parse = require("css-parse");
var through = require("through2");

const cssTake = function (string) {
  var css = css_parse(string);
  const fontClassList = css.stylesheet.rules
    .map((item) => (item.selectors ? item.selectors[0] || "" : ""))
    .filter(
      (item) => item && item.startsWith(".el-icon-") && item.endsWith(":before")
    )
    .map((item) =>
      item.replace(".el-icon-", "el-icon-").replace(":before", "")
    );

  console.log(`总共找到${fontClassList.length}个图标`);
  return JSON.stringify(fontClassList);
};

module.exports = function () {
  function transform(file, encoding, callback) {
    if (file.isNull()) {
      return callback(null, file);
    }

    file.contents = Buffer.from(cssTake(file.contents.toString()));

    callback(null, file);
  }

  return through.obj(transform);
};
