var $ = require('jquery')
var Landscape = require('./landscape')

var landscape = Landscape()
landscape.animate()

$(document).on('keypress', function (e) {
  console.log('e.keyCode: ', e.keyCode)
  switch (e.keyCode) {
    case 97: landscape.addBot(); break                        // 'a'
    case 112: landscape.toggleAnimation(); break              // 'p'
    case 116: landscape.switchTrailMode(); break              // 't'
    case 100: landscape.toggleExistenceOfDeath(); break       // 'd'
    case 114: landscape.reset(); break                        // 'r'
    case 99: landscape.switchBotAvoidanceAlgorithm(); break   // 'c'
    case 115: landscape.switchSpawnMode(); break           // 's'
  }
})
