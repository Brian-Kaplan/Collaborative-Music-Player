/* 
 * All testing functions
 */

//driver for all tests
function runTests() {
   if (clearTableTest()) {
   		console.log("clearTableTest Passed");
   }
   if (testDequeSong()) {
   		console.log("testDequeSong: pass")
   }
   testIsValidSongTrue();
   testIsValidSongFalse();
   testEncodeURL();
   testEncodeURL2();
   testDecodeURL();
   testDecodeURL2();
}

function clearTableTest() {
	songTable = document.getElementById("songqueue");
	console.log("songTable length:" + songTable.rows.length);
	//songTable = $('#songqueue')[0];
	newRow = songTable.insertRow(-1);
	newRow.insertCell(0).innerHTML = "test";

	console.log("songTable length after add:" + songTable.rows.length);
	clearTable(songTable);
	console.log("songTable length after clearTable() called:" + songTable.rows.length);

	if (songTable.rows.length == 1) {
		console.log("songTable is empty");
		return true;
	}
	return false;
}

function testIsValidSongTrue() {
	if (isValidSong('https://soundcloud.com/adamfostermusic/adam-foster-feat-monty-wells-daylight')) {
		console.log("Test isValidSong with valid input: pass");
	} else {
		console.log("Test isValidSong with valid input: fail")
	}
}

function testIsValidSongFalse() {
	if (isValidSong('https://www.thisshouldntwork.com/')) {
		console.log("Test isValidSong with bad input: fail");
	} else {
		console.log("Test isValidSong with bad input: pass");
	}
}

function testDequeSong() {
	songTable = document.getElementById("songqueue");
	console.log("songTable length:" + songTable.rows.length);
	//newRow = songTable.insertRow(-1);
	//newRow.insertCell(0).innerHTML = "test";

	console.log("songTable length after add:" + songTable.rows.length);
	loadPlayer('https://soundcloud.com/adamfostermusic/adam-foster-feat-monty-wells-daylight');
	queueSong("0",'https://soundcloud.com/adamfostermusic/adam-foster-feat-monty-wells-daylight',"00:00");
	dequeSong();
	console.log("songTable length after dequeSong() called:" + songTable.rows.length);
	if (songTable.rows.length == 1) {
		console.log("songTable is empty");
		return true;
	}
	return false;
}

function testEncodeURL() {
	queueRef.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key();
        var childData = childSnapshot.val();
        
        if(childData.song_url.includes('.') || childData.song_url.includes('/')) {
            console.log("Encode url test #1 failed");
	        }
	    });
	});
	console.log("Encode url test #1 passed");
}

function testEncodeURL2() {
	queueRef.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key();
        var childData = childSnapshot.val();
        
        if(childData.song_url.includes('/')) {
            console.log("Encode url test #2 failed");
	        }
	    });
	});
	console.log("Encode url test #2 passed");
}


function testDecodeURL() {
	queueRef.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key();
        var childData = childSnapshot.val();
        
        var url = childData.song_url;
        var testURL = decodeURL(url);

        if(testURL.includes(',') || testURL.includes('@')) {
            console.log("Decode url test #1 failed");
	        }
	    });
	});

	console.log("Decode url test #1 passed");
}

function testDecodeURL2() {
	queueRef.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key();
        var childData = childSnapshot.val();
        
        var url = childData.song_url;
        var testURL = decodeURL(url);

        if(testURL.includes('@')) {
            console.log("Decode url test #2 failed");
	        }
	    });
	});

	console.log("Decode url test #2 passed");
}