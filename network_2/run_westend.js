var className = "A"



var simulation = d3.forceSimulation(nodes)
            .force("charge", d3.forceManyBody().strength(strength))
            .force("link", d3.forceLink(links).distance(distance).strength(0.6).iterations(16))
            .force("x", d3.forceX())
            .force("y", d3.forceY())
.on("tick", ticked);

    
var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
var link = g.append("g").attr("stroke", strokeColor).attr("stroke-width", strokeWidth).attr("class","link"+className)
.selectAll(".link"+className)
var node = g.append("g")
    .attr("stroke", strokeColor).attr("stroke-width", strokeWidth).attr("stroke-opacity",.2)
    .attr("class","node node"+className).selectAll(".node"+className);

    restart();
        
/*
    window.addEventListener("resize", function(){
        var newWidth = window.innerWidth
        strength = strengthScale(newWidth)
        restart()
    });*/


    var sources
    var sourcesMap
    var targets
    var targetsMap
   
    function restart() {
      // Apply the general update pattern to the nodes.
        svg.attr("width",window.innerWidth)
        g.attr("transform", "translate(" +window.innerWidth/ 2 + "," + (window.innerHeight / 2) + ")")
      node = node.data(nodes, function(d) { return d.id;});
      node.exit().remove();
      node = node.enter()
          .append("circle")
          .attr("class",function(d){return d.id+" networkCircle"})
          .attr("r", nodeRadius)
          .merge(node)
      .on("mouseover",function(d){
       //   console.log(d)
      })
          //.on("mouseover",function(d){
          //    d3.select(this).attr("fill",function(d){
          //        return groupColor[d.group]
          //    })
          //})
        //added below to update color


      // Apply the general update pattern to the links.
      link = link.data(links, function(d) { return d.source.id + "-" + d.target.id; });
      link.exit().remove();
      link = link.enter()
      .append("line")
      .attr("class",function(d){
         // if(parseInt(d.source.id)<parseInt(d.target.id)){
             return "link "+d.source.id + "_" + d.target.id;
          
      })
      .attr("stroke", strokeColor).attr("stroke-width",strokeWidth)
      .attr("opacity",.2)
      .merge(link);
    //  // Update and restart the simulation.
      
//var simulation = d3.forceSimulation()
//   .force("link",d3.forceLink().distance(function (d) {return d.l; }) .strength(0.03) .iterations(16))
//.force("collide",d3.forceCollide().radius(function (d) {return d.r;}) .strength(0.7).iterations(16))
//   .force("charge", d3.forceManyBody().strength(-200))
//   .force("x", d3.forceX().strength(0.02).x(width / 2))
//   .force("y", d3.forceY().strength(0.02).y(height / 2))
      
      simulation.nodes(nodes);
      simulation.force("link").links(links) 
      simulation.force("charge", d3.forceManyBody().strength(-800))
                .force("link", d3.forceLink(links).distance(distance).strength(0.1))
      .force("collide",d3.forceCollide().radius(50) .strength(0.1).iterations(1))

     /*
      simulation.force("x", d3.forceX())
                     .force("y", d3.forceY())*/
     
      simulation.alpha(1).restart();
    }