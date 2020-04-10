var delayInterval = 10
var colorIndex = 1
var oldFriends = []
var cScale = d3.scaleLinear().domain([1,6,12]).range(["magenta","gold","cyan"])

d3.selectAll(".networkCircle")
.attr("fill","#ffffff")
.attr("cursor","pointer")
.on('click',function(){
    colorIndex = 1
    d3.selectAll(".networkCircle").attr('fill',"#ffffff")
    d3.selectAll(".link").attr('stroke',"#000000").attr("opacity",.2)

    var id = d3.select(this).attr("class").split(" ")[0]
    //node_38_node_65
    
    oldFriends = [id]
    var friends = getFriends(id)
    changeFriends(friends)
    d3.select(this).attr("fill","black")
   
})
function changeFriends(friends){
    
    colorIndex+=1
    d3.select("#steps").html("It takes <span id = \"highlight\">"+colorIndex+"</span> steps to reach everyone")
    
    var newFriends = []
    for(var f in friends){
        if(oldFriends.indexOf(friends[f])==-1){
            oldFriends.push(friends[f])
            d3.select("."+friends[f]).transition().delay(colorIndex*100).attr("fill",cScale(colorIndex))
            var ff = getFriends(friends[f])
            newFriends = newFriends.concat(ff)
        }
    }
    newFriends = removeDups(newFriends)
    
    oldFriends = removeDups(oldFriends)
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

