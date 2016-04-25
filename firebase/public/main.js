/* 
 * Javascript file to run the room html page
 * Created By: Luke Mazzu
 */

/*
 * Create a listener for the queue, and users
 * Updating the queue when a song finishes
 * Adding a song to the queue
 * 
 * window.onbeforeunload = function() {};
 */


//global variables
    var submitbutton;
    var songinput;
    var player;
    var songqueue;
    var users;
    var widget;
    var queueRef;
    var nowPlayingRef;
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

usersRef.on('value', function(snapshot) {
    clearTable(users);
    snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key();
        var childData = childSnapshot.val();
        newRow = users.insertRow(-1);
        newRow.insertCell(0).innerHTML = childData.name;
        newRow.insertCell(1).innerHTML = childData.credits;
    //loadUsers(name);
    });
});

/*
//set user to logged in on connection
var myUserRef = usersRef.child('/'+myUserKey);
var loggedinRef = myUserRef.child('/logged_in');
loggedinRef.set(1);
loggedinRef.onDisconnect().set(0);

    //set host to 0 on disconnect
var hostRef = myUserRef.child('/host');
loggedinRef.onDisconnect().set(0);
*/

//listener for song queue
var queueRef = new Firebase('https://collabplayer.firebaseio.com/queue');

queueRef.on('value', function(snapshot) {
    clearTable(songqueue);
    snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key();
        var childData = childSnapshot.val();
        
        //prevents undefined song urls from being decoded
        if(childData.song_url) {
            queueSong(childData.credits,decodeURL(childData.song_url),childData.length);
        }
    });
});

//now playing listener

nowPlayingRef = new Firebase('https://collabplayer.firebaseio.com/nowplaying');

nowPlayingRef.on('child_added', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key();
        var childData = childSnapshot.val();
        
        if(childData.song_url) {
           loadPlayer(childData.song_url);       
        }
    });
});

//onclick listener
submitbutton.onclick = function() {
    if(songinput.value !== '') {
        var encodedURL = encodeURL(songinput.value);       
        var path = queueRef.push({'song_url': encodedURL, 'credits': 1, 'length': '00:00'});
        songinput.value = '';
    }
};      
});

//load player pull the now playing song from firebase
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
    //if host, update now playing
    var rowCount = $('#songqueue tr').length;
        
    var hostRef = new Firebase("https://collabplayer.firebaseio.com/users/host");
    hostRef.orderByValue().limitToFirst(1).once("value", function(snapshot) {
    snapshot.forEach(function(data) {
    
  });
});
    
}

//Encode and decode Firebase keys for safe URLs
function encodeURL(url) {
	var temp = url.replace(/\./g, ',');	//escape '.''
	var temp2 = temp.replace(/\//g, '@'); //escape '/'
	return temp2;
}

function decodeURL(url) {
	var temp = url.replace(/,/g, '.');	//escape '.''
	var temp2 = temp.replace(/@/g, '\/'); //escape '/'
	return temp2;
}

function clearTable(table) {
    while(typeof(table.rows[1]) !== 'undefined') {
        table.deleteRow(1);
    }
}
