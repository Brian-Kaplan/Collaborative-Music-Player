/* 
 * Javascript file to run the room html page
 * Created By: Luke Mazzu
 */

//global variables
    var submitbutton;
    var songinput;
    var player;
    var songqueue;

$(document).ready(function() {
    //init variables
    submitbutton = document.getElementById('submitbutton');
    songinput = document.getElementById('songinput');
    player = document.getElementById('player');
    songqueue = $('#songqueue')[0];

//onclick listener
submitbutton.onclick = function() {
    if(player.src === '') {
        var embedurl = "https://w.soundcloud.com/player/?url="+ songinput.value +"&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=false";
        player.src = embedurl;
        queueSong(0,songinput.value,'00:00');
        songinput.value = '';
    }
    else {
        queueSong(0,songinput.value,'00:00');
        var embedurl = "https://w.soundcloud.com/player/?url="+ songinput.value +"&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=false";
        player.src = embedurl;
        songinput.value = '';
    }
};      
});

//songname currently is song url from soundcloud
function queueSong(credits,songname,length) {
        newRow = songqueue.insertRow(-1);
        newRow.insertCell(0).innerHTML = 0;
        newRow.insertCell(1).innerHTML = songinput.value;
        newRow.insertCell(2).innerHTML = '00:00';
}

function loadQueue(queue) {
    var i = 0;
    for(i = 0;i < queue.length;i++) {
        queueSong(queue.credits,queue.songname,queue.length);
    }
}

function dequeSong() {
    songqueue.deleteRow(0);
}

//plays next song in queue
function nextSong() {
    
}
