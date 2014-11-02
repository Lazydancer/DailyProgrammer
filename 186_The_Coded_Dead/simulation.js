function Vector(x, y) {
  this.x = x;
  this.y = y;
}
Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};
var directions = {
  "n":  new Vector( 0, -1),
  "ne": new Vector( 1, -1),
  "e":  new Vector( 1,  0),
  "se": new Vector( 1,  1),
  "s":  new Vector( 0,  1),
  "sw": new Vector(-1,  1),
  "w":  new Vector(-1,  0),
  "nw": new Vector(-1, -1)
};


function Grid(width, height) {
  this.space = new Array(width * height);
  this.width = width;
  this.height = height;
}
Grid.prototype.isInside = function(vector) {
  return vector.x >= 0 && vector.x < this.width &&
         vector.y >= 0 && vector.y < this.height;
};
Grid.prototype.get = function(vector) {
  return this.space[vector.x + this.width * vector.y];
};
Grid.prototype.set = function(vector, value) {
  this.space[vector.x + this.width * vector.y] = value;
};
Grid.prototype.forEach = function(f, context) {
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
      var value = this.space[x + y * this.width];
      if (value != null)
        f.call(context, value, new Vector(x, y));
    }
  }
};

function World(z,v,h) {
  var grid = new Grid(20, 20);

  function getRandomVector(min, max) {
    return new Vector( (Math.floor(Math.random() * (max-min)) + min),
                       (Math.floor(Math.random() * (max-min)) + min) )
  }

  while(z--) {
    var tmp = getRandomVector(0,20);
    if ( grid.get(tmp) == undefined)
      grid.set(tmp, new Zombie());
    
  }
  while(v--) {
    var tmp = getRandomVector(0,20);
    if ( grid.get(tmp) == undefined)
      grid.set(tmp, new Victim());
    
  }     
  while(h--) {
    var tmp = getRandomVector(0,20); 
    if ( grid.get(tmp) == undefined)
      grid.set(tmp, new Hunter());
    
  }     

  this.grid = grid;
}
World.prototype.toString = function() {
  var output = "";
  for(var y = 0; y < this.grid.height; y++) {
    for(var x = 0; x < this.grid.width; x++) {
      var element = this.grid.get(new Vector(x, y));
      output += (element == null) ? " " : element.originChar;
    }
    output += "\n";
  }
  return output;
};
World.prototype.turn = function() {
  var acted = [];
  this.grid.forEach(function(entity, vector){
    if (entity.act && acted.indexOf(entity) == -1) {
      acted.push(entity);
      this.letAct(entity, vector);
    }
  }, this);
};
World.prototype.letAct = function(entity, vector) {
  var action = entity.act(new View(this, vector));
  if (action && action.type == "move") {
    var dest = this.checkDestination(action, vector);
    if (dest && this.grid.get(dest) == null) {
      this.grid.set(vector, null);
      this.grid.set(dest, entity);
    }
  }
};
World.prototype.checkDestination = function(action, vector) {
  if (directions.hasOwnProperty(action.direction)) {
    var dest = vector.plus(directions[action.direction]);
    if (this.grid.isInside(dest))
      return dest;
  } 
};


function View(world, vector) {
  this.world = world;
  this.vector = vector;
}
View.prototype.look = function(dir) {
  var target = this.vector.plus(directions[dir]);
  if (this.world.grid.isInside(target)){
    var element = this.world.grid.get(target);
    return (element == null) ? " " : element.originChar;
  }
};
View.prototype.findAll = function(ch) {
  var found = [];
  for (var dir in directions)
    if (this.look(dir) == ch)
      found.push(dir);
  return found;
};
View.prototype.find = function(ch) {
  var found = this.findAll(ch);
  if (found.length == 0) return null;
  return randomElement(found);
};




function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function Zombie() {
  this.originChar = "X";
  this.direction = randomElement("n e s w".split(" "));
}
Zombie.prototype.act = function(view) {
  if (view.look(this.direction) != " ")
    this.direction = view.find(" ") || "s";
  return {type: "move", direction: this.direction};
};

function Victim() {
  this.originChar = "O";
  this.direction = randomElement("n ne e se s sw w nw".split(" "));
}
Victim.prototype.act = function(view) {
  if (view.look(this.direction) != " ")
    this.direction = view.find(" ") || "s";
  return {type: "move", direction: this.direction};
}

function Hunter() {
  this.originChar = "@";
  this.direction = randomElement("n ne e se s sw w nw".split(" "));
}
Hunter.prototype.act = function(view) {
  if (view.look(this.direction) != " ")
    this.direction = view.find(" ") || "s";
  return {type: "move", direction: this.direction};
}




var field = document.getElementById('field');

var a = new World(20,20,20);
field.innerHTML = a.toString();
