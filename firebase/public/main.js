/* 
 * Javascript file to run the room html page
 * Created By: Luke Mazzu
 */

/*
 * Create a listener for the queue, and users
 * Updating the queue when a song finishes
 * Adding a song to the queue
 * 
 * https://soundcloud.com/friendlistworld/avira-beep-sound
 */

    //Testing: true = test environment
    var testing = true;

//global variables
    var submitbutton;
    var songinput;
    var player;
    var songqueue;
    var users;
    var widget;
    var queueRef;
    var nowPlayingRef;
    var usersRef;
    var songPaths = []; //song paths on firebase 

    var uid = readCookie('USER_UID');

    if(testing) {
        uid = "c4e95df2-8685-4bbe-94a7-de3e46612499";
    }

    if (uid == null && !testing) {
        window.location.href = 'index.html'
    };

$(document).ready(function() {
    //init variables
    submitbutton = document.getElementById('submitbutton');
    songinput = document.getElementById('songinput');
    player = document.getElementById('player');
    songqueue = $('#songqueue')[0];
    users = $('#users')[0];
    uidLabel = document.getElementById('uidLabel');
    uidLabel.innerHTML = uid;

    //if testing, use the test database
    if(testing) {
    usersRef = new Firebase('https://collabplayer.firebaseio.com/testusers');
    queueRef = new Firebase('https://collabplayer.firebaseio.com/testqueue');
    nowPlayingRef = new Firebase('https://collabplayer.firebaseio.com/testnowplaying');
    }
    else {
    usersRef = new Firebase('https://collabplayer.firebaseio.com/users');
    queueRef = new Firebase('https://collabplayer.firebaseio.com/queue');
    nowPlayingRef = new Firebase('https://collabplayer.firebaseio.com/nowplaying');
    }

//load users and create listener for changes
usersRef.on('value', function(snapshot) {
    clearTable(users);
    snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key();
        var childData = childSnapshot.val();
        newRow = users.insertRow(-1);
        newRow.insertCell(0).innerHTML = childData.name;
        newRow.insertCell(1).innerHTML = childData.credits;
    });
});


//set user to logged in on connection
var myUserRef = usersRef.child('/'+uid);
var loggedinRef = myUserRef.child('/logged_in');
loggedinRef.set(1);
loggedinRef.onDisconnect().set(0);

//listener for song queue
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
    nowPlayingRef.once('value', function(snapshot) {
        
    });
});

//now playing listener

nowPlayingRef.on('value', function(snapshot) {
        loadPlayer(snapshot.val());
});

//onclick listener
submitbutton.onclick = function() {
    if(songinput.value !== '') {
        var encodedURL = encodeURL(songinput.value);       
        var path = queueRef.push({'song_url': encodedURL, 'credits': 1, 'length': '00:00'});
        songinput.value = '';
    }
};

    if (testing) {
        runTests();
    }
});

//load player pull the now playing song from firebase
function loadPlayer(songurl) {
    if(songurl !== '') { 
        console.log(player.src);
        if(player.src.localeCompare('') == 0) {
            var embedurl = "https://w.soundcloud.com/player/?url="+ songurl +"&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=false";
            player.src = embedurl;
            widget = SC.Widget(player);
            widget.bind(SC.Widget.Events.FINISH,nextSong);
        }
        else {
            widget.load(songurl,{auto_play:false,hide_related:false,show_comments:true,show_user:true,show_reposts:false,visual:false});
        }
    }
    else {
        player.src = '';
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
    var nextSongURL;
    
    if(amIHost(uid)) {
        queueRef.orderByChild('credits').limitToLast(1).once('value', function(dataSnapshot) {
            dataSnapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();               
                nextSongURL = decodeURL(childData.song_url);
                childSnapshot.ref().remove();
            });
        });
        //check if next song exists
        console.log(nextSongURL);
        if(nextSongURL) {
            if(isValidSong(nextSongURL)){ //checks to see if next song is valid
                nowPlayingRef.set(nextSongURL);
            }
            else {
                nextSong();
            }
        }
        else { //no valid songs left
            nowPlayingRef.set('');
        }
    }
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

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
      return null;
}

function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

//checks to see if current user is host
//host is first logged in user returned
function amIHost(uidIn) {
    var check = false;
    usersRef.orderByChild("logged_in").limitToLast(1).once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
           var key = childSnapshot.key();
           if(key.localeCompare(uidIn) == 0) {
                check = true;
           }        
        });
    });
    return check;
}

function isValidSong(songurl) {
    return songurl.indexOf('soundcloud.com') != -1;
}
