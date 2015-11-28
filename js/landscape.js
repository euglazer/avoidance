function Landscape (params) {
  this.height = params.height;
  this.width = params.width;
  this.densityPercent = params.densityPercent;
  this.scale = params.scale || 2;
  this.$element = $('#landscape');
  this.initializeGrid();
  this.initializePotentialCoords();
  this.initializeBots();
  this.render();
}

Landscape.prototype.initializeGrid = function () {
  this.grid = _.map(new Array(this.height), function () {
    return new Array(this.width);
  });
};

Landscape.prototype.initializePotentialCoords = function () {
  this.potentialCoords = [];
  var self = this;
  _.times(self.height, function (r) {
    _.times(self.width, function (c) {
      self.potentialCoords.push({r: r, c: c});
    });
  });
};

Landscape.prototype.initializeBots = function () {
  var self = this;
  var numOfBots = parseInt(self.potentialCoords.length * this.densityPercent / 100);
  var activeCoords = _.take(_.shuffle(self.potentialCoords), numOfBots);
  this.bots = []
  _.each(activeCoords, function (coord) {
    self.addBot({c: coord.c, r: coord.r});
  });
};

Landscape.prototype.addBot = function (params) {
  params = params || _.sample(this.potentialCoords);
  var bot = new Bot(params);
  bot.landscape = this;
  this.bots.push(bot)
  this.grid[bot.r][bot.c] = bot
  bot.render();
};

Landscape.prototype.updatePositionFor = function (bot) {
  for (var i = 0; i < 4; i++) {
    if (bot.isAboutToCollide()) {
      bot.changeDirection();
    } else {
      this.grid[bot.r][bot.c] = null;
      bot.moveForward();
      this.grid[bot.r][bot.c] = bot;
      break;
    }
  }
};

Landscape.prototype.render = function () {
  this.$element.css({
    width: this.width * this.scale,
    height: this.height * this.scale
  });
};

Landscape.prototype.updateFrame = function () {
  var self = this;
  _.each(this.bots, function (bot) {
    self.updatePositionFor(bot);
  });
};
