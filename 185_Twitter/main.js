var list = require("fs").readFileSync("enable1.txt", "utf8").split('\n')
	.map(function(elem) { return elem.replace("\r",""); })
	.filter(function (elem) { return /at/.test(elem); })
	.map(function(elem) { return elem.replace(/at/g, "@");})
	.sort( function(a, b){ return a.length - b.length } );

console.log(list.slice(0,9));
console.log(list.reverse().slice(0,9));
