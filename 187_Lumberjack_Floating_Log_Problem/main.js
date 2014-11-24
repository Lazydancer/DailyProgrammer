var Edge = function(source, sink, capacity) {
    this.source = source;
    this.sink = sink;
    this.capacity = capacity;
    this.reverseEdge = null;
    this.flow = 0;
};
 
var FlowNetwork = function() {
    this.edges = {};
 
    this.findEdgeInPath = function(path, edge, residual) {
        for(var p=0;p<path.length;p++) 
            if(path[p][0] == edge && path[p][1] == residual) 
                return true;
        return false;
    };
    
    this.addEdge = function(source, sink, capacity) {
        if(source == sink) return;
        
        var edge = new Edge(source, sink, capacity);
        var reverseEdge = new Edge(sink, source, 0);
        
        edge.reverseEdge= reverseEdge;
        reverseEdge.reverseEdge = edge;
        
        if(this.edges[source] === undefined) this.edges[source] = [];
        if(this.edges[sink] === undefined) this.edges[sink] = [];   
        
        this.edges[source].push(edge);
        this.edges[sink].push(reverseEdge);
    };
    
    this.findPath = function(source, sink, path) {
        if(source == sink) return path;
        
        for(var i=0;i<this.edges[source].length;i++) {
            var edge = this.edges[source][i];
            var residual = edge.capacity - edge.flow;
            
            if(residual > 0 && !this.findEdgeInPath(path, edge, residual)) {
                var tpath = path.slice(0);
                tpath.push([edge, residual]);
                var result = this.findPath(edge.sink, sink, tpath);
                if(result != null) return result;
            } 
        }
        return null;
    };
    
    this.maxFlow = function(source, sink) {
        var path = this.findPath(source, sink, []);
        while(path != null) {
            var flow = 999999;

            for(var i=0;i<path.length;i++)
                if(path[i][1] < flow) flow = path[i][1];

            for(var i=0;i<path.length;i++) {
                path[i][0].flow += flow;
                path[i][0].reverseEdge.flow -= flow;
            } 
            path = this.findPath(source, sink, []);
        }
        var sum = 0;
        for(var i=0;i<this.edges[source].length;i++)
            sum += this.edges[source][i].flow;
        return sum;
    };
}; 

var fn = new FlowNetwork();
fn.addEdge('a','b',6);
fn.addEdge('a','c',2);
fn.addEdge('b','d',3);
fn.addEdge('b','e',3);
fn.addEdge('d','h',1);
fn.addEdge('d','c',2);
fn.addEdge('c','g',4);
fn.addEdge('g','h',2);
fn.addEdge('g','i',2);
fn.addEdge('e','h',1);
fn.addEdge('e','i',2);
fn.addEdge('h','i',4);
var max = fn.maxFlow('a','i');

console.log(max);
