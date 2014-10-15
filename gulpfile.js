/**
 * # General Notes
 * Each package only needs to be required once in the file, and can be used by any task that needs it.
 * You can use double quotes or single for your code ("abc" vs 'xyz'), but for readability, best to be consistent.
 * Consistent indentation can help make scripts and tasks more readable.
 * Semicolons aren't *required* at the end of Gulp streams, but they are strongly suggested. I added them in.
 * There's probably a way to loop through your image settings programatically and keep the file size smaller and more manageable, but I'm not quite sure how you'd do that yet. Still learning this stuff myself.
 */


/**
 * Gulp Packages
 * Placed together for easier reading.
 *
 */

var gulp = require('gulp'); // Lead with Gulp because all tasks will need it
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css'); // Add var prefix for consistency
// var gulp = require('gulp'); // Not needed as already set once in the file
var imagemin = require('gulp-imagemin');
var jpegtran = require('gulp-imagemin/node_modules/imagemin/node_modules/imagemin-jpegtran');
var gm = require('gulp-gm');
var rename = require('gulp-rename');


/**
 * Paths
 * All of the inputs and outputs in one location.
 * This makes it easier to manage and change directories.
 */

var paths = {
  scripts : {
    input : 'scripts/min/*.js',
    output : './scripts_concat/'
  },
  styles : {
    input : 'css/*.css',
    output : './'
  },
  siteart : {
    input : 'siteart/*',
    output : 'crunched'
  },
  images : {
    dist : 'test_image/dist/*.jpg',
    input : 'test_image/*',
    output : './siteart/'
  }
};

/**
 * Tasks
 * These are the things that do all the hard word for you.
 */

// Concatenate scripts into one file
gulp.task('concat', function() {
  gulp.src(paths.scripts.input)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(paths.scripts.output));
});

// Minify CSS
gulp.task('minify-css', function() {
  gulp.src(paths.styles.input)
    .pipe(minifyCSS({
      keepBreaks:false
    }))
    .pipe(gulp.dest(paths.styles.output));
});

// Minify images
gulp.task('imagemin', function () {
  return gulp.src(paths.siteart.input)
    .pipe(imagemin({
      progressive: true,
      use: [jpegtran()]
    }))
    .pipe(gulp.dest(paths.siteart.output));
});

// Generate responsive images
gulp.task('resp', function () {

 // x-Large images
  gulp.src(paths.images.input)
    .pipe(gm(function (gmfile) {
      return gmfile.setFormat('jpg'),
      		 gmfile.resample(72, 72),
             gmfile.resize(1800, null),
             gmfile.crop(1800, 1060, 0, 0),
             gmfile.quality(25);
             // gulp // I don't think this belongs here
      }, {
        imageMagick: true
      }
    ))

    // Crunches Images
    .pipe(imagemin({
      progressive: true,
      use: [jpegtran()]
    }))

    // Renames Images
    .pipe(rename({
      prefix: 'xlarge_'
    }))

    .pipe(gulp.dest(paths.images.output)); 




  // Large images
  gulp.src(paths.images.input)
    .pipe(gm(function (gmfile) {
      return gmfile.setFormat('jpg'),
      		 gmfile.resample(72, 72),
             gmfile.resize(1400, null),
             gmfile.crop(1400, 825, 0, 0),
             gmfile.quality(25);
             // gulp // I don't think this belongs here
      }, {
        imageMagick: true
      }
    ))

    // Crunches Images
    .pipe(imagemin({
      progressive: true,
      use: [jpegtran()]
    }))

    // Renames Images
    .pipe(rename({
      prefix: 'large_'
    }))

    .pipe(gulp.dest(paths.images.output)); 


  // x-small images
  gulp.src(paths.images.input)
    .pipe(gm(function (gmfile) {
      return gmfile.setFormat('jpg'),
      		 gmfile.resample(72, 72),
             gmfile.resize(700, null),
             gmfile.crop(700, 412, 0, 0),
             gmfile.quality(25);
             // gulp // Again, I don't think this belongs here
    }, {
      imageMagick: true
    }))

    // Crunches images
    .pipe(imagemin({
      progressive: true,
      use: [jpegtran()]
    }))

    // Renames images
    .pipe(rename({
      prefix: 'xsmall_'
    }))

    .pipe(gulp.dest(paths.images.output)); // ./dist/main/text/ciao/bonjour-aloha-hola.md


  // Medium images
  gulp.src(paths.images.input)
    .pipe(gm(function (gmfile){
      return gmfile.setFormat('jpg'),
      		 gmfile.resample(72, 72),
             gmfile.resize(900, null),
             gmfile.crop(900, 531, 0, 0),
             gmfile.quality(25);
             // gulp // Again, I don't think this belongs here
    }, {
      imageMagick: true
    }))

    // Crunches images
    .pipe(imagemin({
      progressive: true,
      use: [jpegtran()]
    }))

    // Renames images
    .pipe(rename({
      prefix: 'med_'
    }))

    .pipe(gulp.dest(paths.images.output)); // ./dist/main/text/ciao/bonjour-aloha-hola.md


  // Square images
  gulp.src(paths.images.input)
    .pipe(gm(function (gmfile){
      return gmfile.setFormat('jpg'),
      		 gmfile.resample(72, 72),
             gmfile.resize(400, null),
             gmfile.crop(400, 400, 0, 0),
             gmfile.quality(25);
             // gulp // Again, I don't think this belongs here
    }, {
      imageMagick: true
    }))

    // Crunches images
    .pipe(imagemin({
      progressive: true,
      use: [jpegtran()]
    }))

    // Renames images
    .pipe(rename({
      prefix: 'square_'
    }))

    .pipe(gulp.dest(paths.images.output)); // ./dist/main/text/ciao/bonjour-aloha-hola.md


  // Small shallow images
  gulp.src(paths.images.input)
    .pipe(gm(function (gmfile){
      return gmfile.setFormat('jpg'),
      		 gmfile.resample(72, 72),
             gmfile.resize(900, null),
             gmfile.crop(900, 371, 0, 0),
             gmfile.quality(25);
             // gulp // Again, I don't think this belongs here
    }, {
      imageMagick: true
    }))

    // Crunches images
    .pipe(imagemin({
      progressive: true,
      use: [jpegtran()]
    }))

    // Renames images
    .pipe(rename({
      prefix: 'shallow_small_'
    }))

    .pipe(gulp.dest(paths.images.output)); 


  // x-small shallow images
  gulp.src(paths.images.input)
    .pipe(gm(function (gmfile){
      return gmfile.setFormat('jpg'),
             gmfile.resample(72, 72),
             gmfile.resize(700, null),
             gmfile.crop(700, 290, 0, 0),
             gmfile.quality(25);
    }, {
      imageMagick: true
    }))

    // Crunches images
    .pipe(imagemin({
      progressive: true,
      use: [jpegtran()]
    }))

    // Renames images
    .pipe(rename({
      prefix: 'shallow_xsmall_'
    }))

    .pipe(gulp.dest(paths.images.output)); 

});


gulp.task('hero', function () {

  // Large heros
  gulp.src(paths.images.input)
    .pipe(gm(function (gmfile){
      return gmfile.setFormat('jpg'),
      		 gmfile.resample(72, 72),
             gmfile.resize(2300, null),
             gmfile.crop(2300, 856, 0, 0),
             gmfile.quality(30);
             // gulp // Again, I don't think this belongs here
    },{
      imageMagick: true
    }))

    // Crunches images
    .pipe(imagemin({
      progressive: true,
      use: [jpegtran()]
    }))

    // Renames images
    .pipe(rename({
      prefix: 'hero_'
    }))

    .pipe(gulp.dest(paths.images.output)); 


  // Medium
  gulp.src(paths.images.input)
    .pipe(gm(function (gmfile){
      return gmfile.setFormat('jpg'),
      		 gmfile.resample(72, 72),
             gmfile.resize(1500, null),
             gmfile.crop(1500, 558, 0, 0),
             gmfile.quality(30);
             // gulp // Again, I don't think this belongs here
    }, {
      imageMagick: true
    }))

    // Crunches images
    .pipe(imagemin({
      progressive: true,
      use: [jpegtran()]
    }))

    // Renames images
    .pipe(rename({
      prefix: 'med_hero_'
    }))

    .pipe(gulp.dest(paths.images.output)); 


  // Small
  gulp.src(paths.images.input)
    .pipe(gm(function (gmfile){
      return gmfile.setFormat('jpg'),
    		 gmfile.resample(72, 72),
             gmfile.resize(1000, null),
             gmfile.crop(1000, 372, 0, 0),
             gmfile.quality(30);
             // gulp // Again, I don't think this belongs here
    }, {
      imageMagick: true
    }))

    // Crunches images
    .pipe(imagemin({
      progressive: true,
      use: [jpegtran()]
    }))

    // Renames images
    .pipe(rename({
      prefix: 'sm_hero_'
    }))

    .pipe(gulp.dest(paths.images.output)); 


  // Large PL
  gulp.src(paths.images.input)
    .pipe(gm(function (gmfile){
      return gmfile.setFormat('jpg'),
      	     gmfile.resample(72, 72),
             gmfile.resize(900, null),
             gmfile.crop(900, 352, 0, 0),
             gmfile.quality(10);
             // gulp // Again, I don't think this belongs here
    }, {
      imageMagick: true
    }))

    // Crunches images
    .pipe(imagemin({
      progressive: true,
      use: [jpegtran()]
    }))

    // Renames Images
    .pipe(rename({
      prefix: 'pl_hero_'
    }))

    .pipe(gulp.dest(paths.images.output)); 


  // Small PL
  gulp.src(paths.images.input)
    .pipe(gm(function (gmfile){
      return gmfile.setFormat('jpg'),
      		 gmfile.resample(72, 72),
             gmfile.resize(500, null),
             gmfile.crop(500, 208, 0, 0),
             gmfile.quality(10);
             
    }, {
      imageMagick: true
    }))

    // Crunches images
    .pipe(imagemin({
      progressive: true,
      use: [jpegtran()]
    }))

    // Renames images
    .pipe(rename({
      prefix: 'pl_hero_small_'
    }))

    .pipe(gulp.dest(paths.images.output)); 

});


gulp.task('heroi', function () {

  // Large heros
  gulp.src(paths.images.input)
    .pipe(gm(function (gmfile){
      return gmfile.setFormat('jpg'),
      		 gmfile.resample(72, 72),
             gmfile.resize(2300, null),
             gmfile.crop(2300, 1040, 0, 0),
             gmfile.quality(30);
             // gulp // Again, I don't think this belongs here
    },{
      imageMagick: true
    }))

    // Crunches images
    .pipe(imagemin({
      progressive: true,
      use: [jpegtran()]
    }))

    // Renames images
    .pipe(rename({
      prefix: 'hero_'
    }))

    .pipe(gulp.dest(paths.images.output)); 


  // Medium
  gulp.src(paths.images.input)
    .pipe(gm(function (gmfile){
      return gmfile.setFormat('jpg'),
      		 gmfile.resample(72, 72),
             gmfile.resize(1500, null),
             gmfile.crop(1500, 679, 0, 0),
             gmfile.quality(30);
             // gulp // Again, I don't think this belongs here
    }, {
      imageMagick: true
    }))

    // Crunches images
    .pipe(imagemin({
      progressive: true,
      use: [jpegtran()]
    }))

    // Renames images
    .pipe(rename({
      prefix: 'med_hero_'
    }))

    .pipe(gulp.dest(paths.images.output)); 


  // Small
  gulp.src(paths.images.input)
    .pipe(gm(function (gmfile){
      return gmfile.setFormat('jpg'),
    		 gmfile.resample(72, 72),
             gmfile.resize(1000, null),
             gmfile.crop(1000, 453, 0, 0),
             gmfile.quality(30);
             // gulp // Again, I don't think this belongs here
    }, {
      imageMagick: true
    }))

    // Crunches images
    .pipe(imagemin({
      progressive: true,
      use: [jpegtran()]
    }))

    // Renames images
    .pipe(rename({
      prefix: 'sm_hero_'
    }))

    .pipe(gulp.dest(paths.images.output)); 


  // Large PL
  gulp.src(paths.images.input)
    .pipe(gm(function (gmfile){
      return gmfile.setFormat('jpg'),
      	     gmfile.resample(72, 72),
             gmfile.resize(900, null),
             gmfile.crop(900, 407, 0, 0),
             gmfile.quality(10);
             // gulp // Again, I don't think this belongs here
    }, {
      imageMagick: true
    }))

    // Crunches images
    .pipe(imagemin({
      progressive: true,
      use: [jpegtran()]
    }))

    // Renames Images
    .pipe(rename({
      prefix: 'pl_hero_'
    }))

    .pipe(gulp.dest(paths.images.output)); 


  // Small PL
  gulp.src(paths.images.input)
    .pipe(gm(function (gmfile){
      return gmfile.setFormat('jpg'),
      		 gmfile.resample(72, 72),
             gmfile.resize(500, null),
             gmfile.crop(500, 227, 0, 0),
             gmfile.quality(10);
             
    }, {
      imageMagick: true
    }))

    // Crunches images
    .pipe(imagemin({
      progressive: true,
      use: [jpegtran()]
    }))

    // Renames images
    .pipe(rename({
      prefix: 'pl_hero_small_'
    }))

    .pipe(gulp.dest(paths.images.output)); 

});


// Rename images
gulp.task('rename', function () {
  gulp.src(paths.images.dist, { base: process.cwd() })
    .pipe(rename({
      prefix: 'bonjour-',
    }))
    .pipe(gulp.dest(paths.images.output)); 
});


/**
 * Task runners
 * Runs all of your tasks concurrently with a single CLI command ("gulp")
 */
gulp.task('default', function(){
  // Default task code
});