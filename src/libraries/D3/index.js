// import * as d3 from 'd3';

var d3Chart = {};

// console.log(d3);

// d3Chart.create = function(el, props, state) {
//   d3.select(el).append('svg')
//     .style('width', '100%')
//     .text('header');

//   var svg = d3.select("svg"),
//       w = parseInt(svg.style("width")),
//       h = parseInt(svg.style("height")),
//       n = 100,
//       nodes = d3.range(n).map(function(i) { return {index: i}; }),
//       links = d3.range(n).map(function(i) { return {source: i, target: (i + 3) % n}; });
  
//   nodes.forEach((d,i)=>{
//     d.r = Math.random()*20;
//   });
  
//   var force_x = d3.forceX(w/2)
//     .strength(()=>{
//       return Math.random()/2;
//     }),
//     force_y = d3.forceY(h/2)
//     .strength(()=>{
//       return Math.random()/2;
//     });
//   var simulation = d3.forceSimulation(nodes)
//     .force("x",force_x)
//     .force("y",force_y)
//     .on("tick",()=>{
//       tick(nodes)
//     })
//   function tick(n){
//     var update = svg.selectAll("circle")
//       .data(n)
//     update.exit().remove();
//     update.enter().append("circle")
//       .merge(update)
//       .attr("cx",(d)=>{return d.x;})
//       .attr("cy",(d)=>{return d.y;})
//       .attr("r",5)
//   }
// };

export default d3Chart;
