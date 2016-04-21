/* 
 * Javascript file to run the room html page
 * Created By: Luke Mazzu
 */

/*
 * Create a listener for the queue, and users
 * Updating the queue when a song finishes
 * Adding a song to the queue
 * 
 */

//global variables
    var submitbutton;
    var songinput;
    var player;
    var songqueue;
    var users;
    var widget;
    var queueRef;
    var songPaths = []; //song paths on firebase 

$(document).ready(function() {
    //init variables
    submitbutton = document.getElementById('submitbutton');
    songinput = document.getElementById('songinput');
    player = document.getElementById('player');
    songqueue = $('#songqueue')[0];
    users = $('#users')[0];

//load users and create listener for changes
var usersRef = new Firebase('https://collabplayer.firebaseio.com/users');

//listener for song queue
queueRef = new Firebase('https://collabplayer.firebaseio.com/songQueue');

usersRef.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key();
        var childData = childSnapshot.val();
        newRow = users.insertRow(-1);
        newRow.insertCell(0).innerHTML = childData.name;
        newRow.insertCell(1).innerHTML = childData.credits;
    //loadUsers(name);
    });

});
//load queue and create listener for changes

//onclick listener
submitbutton.onclick = function() {
    if(songinput.value !== '') {
        if(player.src === '') {
            //TODO: add song to queue in database
            loadPlayer(songinput.value);
            var path = queueRef.push({'song_url': songinput.value});
            path = path.toString();
            console.log(path);
            songPaths.push(path);
            songinput.value = '';


        }
        else {
            queueSong(0,songinput.value,'00:00');
            //TODO: add song to queue in database
            var path = queueRef.push({'song_url': songinput.value});
            path = path.toString();
            console.log(path);
            songPaths.push(path);
            songinput.value = '';
        }



    }
    loadUsers('jim');
};      
});

function loadPlayer(songurl) {
    if(player.src === '') {
        var embedurl = "https://w.soundcloud.com/player/?url="+ songurl +"&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=false";
        player.src = embedurl;
        widget = SC.Widget(player);
        widget.bind(SC.Widget.Events.FINISH,nextSong);
    }
    else {
        widget.load(songurl,{auto_play:false,hide_related:false,show_comments:true,show_user:true,show_reposts:false,visual:false});
    }
    

}

//songname currently is song url from soundcloud
function queueSong(credits,songname,length) {
        newRow = songqueue.insertRow(-1);
        newRow.insertCell(0).innerHTML = credits;
        newRow.insertCell(1).innerHTML = songname;
        newRow.insertCell(2).innerHTML = length;
}

function loadQueue(queue) {
    var i = 0;
    for(i = 0;i < queue.length;i++) {
        queueSong(queue.credits,queue.songname,queue.length);
    }
}

function dequeSong() {
    widgeturl = songqueue.rows[1].cells[1].innerHTML;
    songqueue.deleteRow(1);
    return widgeturl;
}

//plays next song in queue
function nextSong() {
    var rowCount = $('#songqueue tr').length;

    //checks if queue is non-empty
    if(rowCount > 1) 
        loadPlayer(dequeSong());
    
    var path = songPaths.splice(0, 1);
    var pathRef = new Firebase(path[0]);
        
    var onComplete = function(error) {
        if(error) 
            console.log('Synchronization failed');
        else
            console.log('Synchronization succeeded');
    }

    pathRef.remove(onComplete);
    console.log("nextsong");
    
}



