const gulp = require("gulp");
const cssTake = require("./plugin/index.js");
var remoteSrc = require("gulp-remote-src");// 可加载远程资源
const rename = require('gulp-rename');

function defaultTask() {
  return remoteSrc(["font_3225935_zi2rg5x67b.css"], {
    base: "https://at.alicdn.com/t/",
  })
    .pipe(cssTake())
    .pipe(rename({ extname: '.js' }))
    .pipe(gulp.dest('dist'));
}

exports.default = defaultTask;
