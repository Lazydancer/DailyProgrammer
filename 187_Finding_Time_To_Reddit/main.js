    var list = require('fs').readFileSync('times.txt', 'utf8').split("\n");
    list.pop()

    function Entry(date, start, end, name) {
      this.date = date;
      this.start = start;
      this.end = end; 
      this.name = name;
    }

    list = list.map(function(elem){//createEntry
  
      if (elem[4] === '-'){
        var date = parseInt(elem[3], 10); 
      }else{
        var date = parseInt(elem[3] + elem[4], 10);
        elem = elem.slice(0,3) + elem.slice(4, elem.length)
      }

      var start = parseInt(elem.slice(11, 13) + elem.slice(14, 16), 10);

      var end = parseInt(elem.slice(23, 25) + elem.slice(26,28), 10);

      var name = elem.slice(35, elem.length);

      if (elem[17] === 'P' && start<1200) start += 1200;
      if (elem[29] === 'P' && end<1200) end += 1200;
      
      return new Entry(date, start, end, name);
    });

    list = list.sort(function(a,b){
      return (a.date * 1e5 + a.start) - (b.date * 1e5 + b.start);
    });

    list = function(list) {//breakIntoDays
      var newList = [],
          day = [],
          temp = list[0].date;

      for(var i = 0; i<list.length; i += 1) {
        if(temp != list[i].date || i == list.length-1) {
          newList.push(day);
          day = [];
          temp = list[i].date;
        } 
        day.push(list[i]);
      }
      return newList;
    }(list);

    list = list.map(function(day){//addReddit
      var reddit = { date: day[0].date, name: 'reddit' },
          large = 0,
          largeIndex,
          diff; 

      for(var i = 1; i < day.length; i += 1){
        diff = day[i].start - day[i-1].end;
        if(diff > large) {
          large = diff;
          largeIndex = i;
        }
      }
     
      reddit.start = day[largeIndex -1].end;
      reddit.end = day[largeIndex].start;

      day.splice(largeIndex, 0, reddit);
      return day;
    });


    list.forEach(function(elem) { //printSchedule
      console.log('\nOctober ' + elem[0].date + ' 2014\n----------------------\n');
      
      elem.forEach(function(el) {
        console.log( el.start + ' - ' + el.end + ': ' + el.name ); 
      });
    });


    function activities(list){
      var activites = [] 
      var total = 0;

      list = [].concat.apply([],list); //flatten

      list.forEach(function(elem) { //fillActivites
        var loc = arrayObjectIndexOf(activites, elem.name, 'name')

        if(loc !== -1) activites[loc].time += (elem.end - elem.start)
        else activites.push({name: elem.name, time: elem.end - elem.start});
      });

      function arrayObjectIndexOf(array, searchTerm, property){
        for(var i = 0; i < array.length; i += 1){
          if (array[i][property] === searchTerm) return i;
        }
        return -1;
      }

      activites.forEach(function(elem){ total += elem.time; });

      activites.sort(function(a,b){return b.time - a.time;});

      console.log('\nTime Spent\n-------------------------\n');
      activites.forEach(function(elem){
        var percent = Math.floor(100*(elem.time/total));
        console.log(elem.name + ': ' + elem.time + ' min (' + percent + '%)');
      });
    }(list);
