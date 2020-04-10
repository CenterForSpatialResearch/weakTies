var delayInterval = 10
d3.selectAll(".networkCircle")
.attr("fill","#ffffff")
.attr("cursor","pointer")
.on('click',function(){
    d3.selectAll(".networkCircle").attr('fill',"#ffffff")
    d3.selectAll(".link").attr('stroke',"#000000").attr("opacity",.2)

    var id = d3.select(this).attr("class").split(" ")[0]
    //node_38_node_65
    
    var existingInfected = [id]
    var existingInfectedLinks = []
    var cScale = d3.scaleLinear().domain([1,2,3,4]).range(["red","pink","green","gold"])
    var friends = getFriends(id,existingInfected)
    //console.log(friends)
    var ff = []
    var fff = []

    for(var f in friends){            
        existingInfected.push(friends[f])
        d3.select("."+friends[f]).transition().delay(f*delayInterval).attr("fill",cScale(2)).attr("opacity",1)
        if(parseInt(friends[f].replace("node_",""))<parseInt(id.replace("node_",""))){
            d3.select("."+friends[f]+"_"+id).transition().delay(f*delayInterval).attr("stroke",cScale(1)).attr("opacity",1)
            .attr("stroke-width",4)
        }else{
            d3.select("."+id+"_"+friends[f]).transition().delay(f*delayInterval).attr("stroke",cScale(1)).attr("opacity",1)
            .attr("stroke-width",4)
        }
        ff=ff.concat(getFriends(friends[f],existingInfected))
    }
    ff = removeDups(ff)
    for(var i in ff){
            if(existingInfected.indexOf(ff[i])==-1){
                existingInfected.push(ff[i])
                d3.select("."+ff[i]).transition().delay(i*delayInterval+existingInfected.length*delayInterval).attr("fill",cScale(3)).attr("opacity",1)
            }
            fff=fff.concat(getFriends(ff[i],existingInfected))
        }
        fff=removeDups(fff)
        for(var j in fff){
            if(existingInfected.indexOf(fff[j])==-1){
                existingInfected.push(fff[j])
                d3.select("."+fff[j]).transition().delay(j*delayInterval+existingInfected.length*delayInterval).attr("fill",cScale(4)).attr("opacity",1)
            }
        }
    
    
    d3.select(this)
    .attr("fill","red")
    
})
function removeDups(friends){
    var noDup = []
    for(var i in friends){
        if(noDup.indexOf(friends[i])==-1){
            noDup.push(friends[i])
        }
    }
    return noDup
}

function getFriends(id,existingFriends){
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

