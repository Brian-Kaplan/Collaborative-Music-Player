/* 
 * All testing functions
 */

//driver for all tests
function runTests() {
   if (clearTableTest()) {
   		console.log("clearTableTest Passed");
   }
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

