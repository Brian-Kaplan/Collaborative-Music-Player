/* 
 * Javascript file to run the room html page
 * Created By: Luke Mazzu
 */

//global variables
    var submitbutton;
    var songinput;
    var player;
    var songqueue;
    var users;
    var widget;

$(document).ready(function() {
    //init variables
    submitbutton = document.getElementById('submitbutton');
    songinput = document.getElementById('songinput');
    player = document.getElementById('player');
    songqueue = $('#songqueue')[0];
    users = $('#users')[0];

//onclick listener
submitbutton.onclick = function() {
    if(songinput.value !== '') {
    if(player.src === '') {
        loadPlayer(songinput.value);
        songinput.value = '';
    }
    else {
        queueSong(0,songinput.value,'00:00');
        songinput.value = '';
    }
    }
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
        newRow.insertCell(0).innerHTML = 0;
        newRow.insertCell(1).innerHTML = songname;
        newRow.insertCell(2).innerHTML = '00:00';
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
    loadPlayer(dequeSong());
    console.log("nextsong");
}

function loadUsers(username, credits) {
    newRow = users.insertRow(-1);
    newRow.insertCell(0).innerHTML = 'Jimmy';
    newRow.insertCell(1).innerHTML = 0;
}

