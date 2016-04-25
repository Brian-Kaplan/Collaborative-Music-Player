/* 
 * All testing functions
 */

//driver for all tests
function runTests() {
   if (clearTableTest()) {
   		console.log("clearTableTest Passed");
   }
   else {
   		console.log("clearTableTest Failed");
   }
   if (testDequeSong()) {
   		console.log("testDequeSong: pass")
   }
   if (queueSongCreditTest()) {
   		console.log("queueSongCreditTest Passed");
   }
   else {
   		console.log("queueSongCreditTest Failed")
   }
   if (queueSongNameTest()) {
   		console.log("queueSongNameTest Passed");
   }
   else {
   		console.log("queueSongNameTest Failed")
   }
   if (queueSongLengthTest()) {
   		console.log("queueSongLengthTest Passed");
   }
   else {
   		console.log("queueSongLengthTest Failed")
   }
   
   testIsValidSongTrue();
   testIsValidSongFalse();
   testEncodeURL();
   testEncodeURL2();
   testDecodeURL();
   testDecodeURL2();
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

function clearTableTest() {
	songTable = document.getElementById("songqueue");
	usersTable = document.getElementById("users");
	//console.log("songTable length:" + songTable.rows.length);
	//songTable = $('#songqueue')[0];
	newRow = songTable.insertRow(-1);
	newRow2 = usersTable.insertRow(-1);
	newRow.insertCell(0).innerHTML = "test";
	newRow2.insertCell(0).innerHTML = "test";

	//console.log("songTable length after add:" + songTable.rows.length);
	clearTable(songTable);
	clearTable(usersTable);
	//console.log("songTable length after clearTable() called:" + songTable.rows.length);

	if (songTable.rows.length == 1 && usersTable.rows.length == 1) {
		return true;
	}
	return false;
}

function queueSongCreditTest() {
	songTable = document.getElementById("songqueue");
	queueSong('1','Lucy in the Sky with Diamonds','5:00');

	if (songTable.rows[1].cells[0].innerHTML.localeCompare("1") == 0) {
		return true;
	}
	return false;
}

function queueSongNameTest() {
	songTable = document.getElementById("songqueue");
	queueSong('1','Lucy in the Sky with Diamonds','5:00');

	if (songTable.rows[1].cells[1].innerHTML.localeCompare("Lucy in the Sky with Diamonds") == 0) {
		return true;
	}
	return false;
}

function queueSongLengthTest() {
	songTable = document.getElementById("songqueue");
	queueSong('1','Lucy in the Sky with Diamonds','5:00');

	if (songTable.rows[1].cells[2].innerHTML.localeCompare("5:00") == 0) {
		return true;
	}
	return false;
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