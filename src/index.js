var $ = require('jquery')
var Landscape = require('./landscape')
var _ = require('lodash')

var landscape = Landscape({width: 300, height: 300, densityPercent: 10, scale: 2})
landscape.animate()

$(document).on('keypress', function (e) {
  console.log('e.keyCode: ', e.keyCode)
  switch (e.keyCode) {
    case 97: landscape.growSpiral(); break // 'a'
    case 112: landscape.toggleAnimation(); break // 'p'
    case 116: landscape.switchTrailMode(); break // 't'
    case 100: landscape.toggleExistenceOfDeath(); break // 'd'
  }
})
