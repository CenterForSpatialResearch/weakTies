var delayInterval = 10
var colorIndex = 1
var oldFriends = []
var cScale = d3.scaleLinear().domain([1,6,12]).range(["magenta","gold","cyan"])

d3.selectAll(".networkCircle")
.attr("fill","#000000")


distanceHistogramAll()

function distanceHistogramAll(){
    
    var stepsForEach = {}
    
    for(var n in nodes){
        colorIndex = 1
        var distances = []
        var friends = getFriends(nodes[n].id)
        oldFriends = [nodes[n].id]
        stepsForEach[nodes[n].id]=changeFriends(friends,distances)
    }
    var totals = {}
    for(var n in stepsForEach){
        var nodeSteps = stepsForEach[n]
        for(var s in nodeSteps){
            var step = nodeSteps[s].step
            var key = "_"+step
            if(Object.keys(totals).indexOf(key)==-1){
                totals[key]=nodeSteps[s].new
            }else{
                totals[key]+=nodeSteps[s].new
            }
        }
        
    }
    distanceHistogram(totals)
}

function distanceHistogram(distances){
    var barWidth = 20
    var height = 700
    var width  = 500
    d3.select("#chart2 svg").remove()
    
    var max = 0
    var total = 0
    for(var d in distances){
        if(distances[d]>max){
            max = distances[d]
        }
        total+=distances[d]
    }
    
    var yScale = d3.scaleLinear().domain([0,max]).range([0,height*.9])
    var svg = d3.select("#chart2").append("svg").attr("width",width).attr("height",height).append("g")
    svg.selectAll("rect")
    .data(Object.keys(distances))
    .enter()
    .append("rect")
    .attr("x",function(d,i){return i*barWidth+barWidth})
    .attr("y",function(d,i){return height-yScale(distances[d])})
    .attr("width",barWidth-1)
    .attr("height",function(d,i){return yScale(distances[d])})
    .attr("fill","magenta")
    
    svg.selectAll(".histoText")
    .data(Object.keys(distances))
    .enter()
    .append("text")
    .attr("x",function(d,i){return i*barWidth+barWidth*1.5})
    .attr("y",function(d,i){return height-yScale(distances[d])-4})
    .text(function(d,i){return distances[d]})
    .attr("text-anchor","end")
    .style("writing-mode","vertical-rl")
    
    svg.selectAll(".histoText")
    .data(Object.keys(distances))
    .enter()
    .append("text")
    .attr("x",function(d,i){return i*barWidth+barWidth*1.5})
    .attr("y",function(d,i){return height+10})
    .text(function(d,i){return d.replace("_","")})
    .attr("text-anchor","middle")
    
    svg.append("text").text("number of steps").attr("x",barWidth).attr("y",height+20)
    svg.append("text").text("number of nodes reached at step").attr("x",0).attr("y",height/2).style("writing-mode","vertical-rl")
    
    svg.attr("transform","translate(40,-40)")
}
function changeFriends(friends,distances){    
    //console.log(distances)
    var newFriends = []
    for(var f in friends){
        if(oldFriends.indexOf(friends[f])==-1){
            oldFriends.push(friends[f])
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
    changeFriends(newFriends,distances)
    return distances

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

