var delayInterval = 10
var colorIndex = 1
var oldFriends = []
var cScale = d3.scaleLinear().domain([1,6,12]).range(["magenta","gold","cyan"])
var distances = []

d3.selectAll(".networkCircle")
.attr("fill","#ffffff")
.attr("cursor","pointer")
.on('click',function(){
    distances = []
    colorIndex = 1
    d3.selectAll(".networkCircle").attr('fill',"#ffffff")
    d3.selectAll(".link").attr('stroke',"#000000").attr("opacity",.2)

    var id = d3.select(this).attr("class").split(" ")[0]
    //node_38_node_65
    d3.selectAll(".step").remove()
    
    oldFriends = [id]
    var friends = getFriends(id)
    changeFriends(friends)
    
    d3.select(this).attr("fill","magenta")
            var x = parseFloat(d3.select("."+id).attr("cx"))
            var y = parseFloat(d3.select("."+id).attr("cy"))
    d3.select("#chart1 svg").append("text").text("0").attr("x",x+nodeRadius).attr("y",y).attr("class","step")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
   
   console.log(distances)
    var barWidth = 20
    var height = 500
    var width  = 500
    d3.select("#chart2 svg").remove()
    var svg = d3.select("#chart2").append("svg").attr("width",width).attr("height",height).append("g")
    svg.selectAll("rect")
    .data(distances)
    .enter()
    .append("rect")
    .attr("x",function(d,i){return i*barWidth+barWidth})
    .attr("y",function(d,i){return height-d.new*barWidth-barWidth*2})
    .attr("width",barWidth-1)
    .attr("height",function(d,i){return d.new*barWidth})
    .attr("fill",function(d){return cScale(d.step)})
    
    svg.selectAll(".histoText")
    .data(distances)
    .enter()
    .append("text")
    .attr("x",function(d,i){return i*barWidth+barWidth*1.5})
    .attr("y",function(d,i){return height-d.new*barWidth-barWidth*2})
    .text(function(d,i){return d.new})
    .attr("text-anchor","middle")
    
    svg.selectAll(".histoText")
    .data(distances)
    .enter()
    .append("text")
    .attr("x",function(d,i){return i*barWidth+barWidth*1.5})
    .attr("y",function(d,i){return height-barWidth})
    .text(function(d,i){return d.step})
    .attr("text-anchor","middle")
    
    svg.append("text").text("number of steps").attr("x",barWidth).attr("y",height)
    svg.append("text").text("number of nodes reached at step").attr("x",0).attr("y",height/2).style("writing-mode","vertical-rl")
    
    svg.attr("transform","translate(40,-40)")
})
function distanceHistogram(){
    
}
function changeFriends(friends){
    d3.select("#steps").html("It takes <span id = \"highlight\">"+colorIndex+"</span> steps to reach everyone")
    
    var newFriends = []
    for(var f in friends){
        if(oldFriends.indexOf(friends[f])==-1){
            oldFriends.push(friends[f])
            var x = d3.select("."+friends[f]).attr("cx")
            var y = d3.select("."+friends[f]).attr("cy")
            
        d3.select("#chart1 svg").append("text").text(colorIndex).attr("x",x+nodeRadius).attr("y",y-nodeRadius).attr("class","step")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
            .attr("opacity",0)
            .transition()
            .delay(colorIndex*100)
            .attr("opacity",1)
            
            d3.select("."+friends[f]).transition().delay(colorIndex*100).attr("fill",cScale(colorIndex))
            var ff = getFriends(friends[f])
            newFriends = newFriends.concat(ff)
        }
    }
    newFriends = removeDups(newFriends)    
    oldFriends = removeDups(oldFriends)
    
    if(colorIndex==1){
        distances.push({step:colorIndex,new:oldFriends.length-1,old:oldFriends.length})
    }else{
        var lastCount = distances[distances.length-1].old
        distances.push({step:colorIndex,new:oldFriends.length-lastCount,old:oldFriends.length})
    }
    
    colorIndex+=1    

    if(oldFriends.length==nodes.length){
        return
    }
    changeFriends(newFriends)

    //track
    //get new friends
    //stop only when friends.length is == nodes.length
}


function removeDups(friends){
    var noDup = []
    for(var i in friends){
        if(noDup.indexOf(friends[i])==-1){
            noDup.push(friends[i])
        }
    }
    return noDup
}

function getFriends(id){
    var friends = []
    for(var l in links){
        var link = links[l]
        if(id ==link.source.id){
            friends.push(link.target.id)
        }else if(id == link.target.id){
            friends.push(link.source.id)
        }
    }
    return friends
}

