/* 
 * All testing functions
 */

//driver for all tests
function runTests() {
   clearTableTest();
}

function clearTableTest() {
	songTable = document.getElementById("songqueue");
	console.log(songTable);
	//songTable = $('#songqueue')[0];
	newRow = songTable.insertRow(-1);
	newRow.insertCell(0).innerHTML = "test";

	clearTable(songTable);

	if (songTable.rows.length == 0) {
		console.log('songTable is empty');
		return true;
	}
	return false;
}

