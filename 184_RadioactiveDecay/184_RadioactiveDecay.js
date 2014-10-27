	var timeDesired = 5000;
	var decayChain = [0.00007, 0.0005, 0.00013, 0.00022, 0];
	var state = [5000, 0, 0, 0, 0]


	for (var i=0; i<time; i++)
		state = step(state, decayChain);

	function step(state, decayChain){

		var moved = [0,0,0,0,0,0] 

		state.forEach(function(d,i){moved[i] = decay(state[i], decayChain[i]);});

		function decay(number, decayProb){
			var result = 0;
			for(var i=0 ; i < number ; i++)
				if(decayProb > Math.random()) result += 1;
			return result;
		}
		
		return state.map(function(s, i) { 
			return s - moved[i] + ( i > 0 ? moved[i-1] : 0); 
		});	
	}
	
	
	var total = state. reduce(function(a,b){ return a + b; });

	console.log(state.map(function(s) { return s / total; }));
