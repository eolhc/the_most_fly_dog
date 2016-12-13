var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
//a task is just a function
gulp.task('test',function(){
  console.log('running test task')
});

gulp.task('server',function(){
  connect.server()
});

gulp.task('sass', function(){
  gulp.src('style.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'));
});

gulp.task('watchStyle',function(){
  gulp.watch(['style.scss'],['sass'])
});

gulp.task('watchJS',function(){
  gulp.watch(['fly.js'])
});
//default is a special name
//just type gulp to run it's like an initialize
gulp.task('default',['server','watchStyle','watchJS'])
