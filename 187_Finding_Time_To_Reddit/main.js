//Import
var list = require("fs").readFileSync("times.txt", "utf8").split("\n");
list.pop()

//Convert
function Entry(date, start, end, name) {
  this.date = date;
  this.start = start;
  this.end = end; 
  this.name = name;
}

list = list.map(function(elem){
  var date;

  if (elem[4] !== "-"){
    date = elem[3] + elem[4];
    //Removes one elem to line up for times and name 
    elem = elem.slice(0,3) + elem.slice(4, elem.length)
  }else 
    date = elem[3]; 

  date = parseInt(date);
  
  var start = elem.slice(11, 13) + elem.slice(14, 16);
  start = parseInt(start);
  if (elem[17] === "P" ) start += 1200;
  
  var end = elem.slice(23, 25) + elem.slice(26,28);
  end = parseInt(end);
  if (elem[29] === "P" ) end += 1200;

  var name = elem.slice(35, elem.length);
  
  return new Entry(date, start, end, name);
});

//Organize

//Find largest Block in Each dayo

//Add reddit

//Print all entries

//Percentages
