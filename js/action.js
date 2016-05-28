var createActionPersonnal = function (titre, typeAction, dateintervention, localisation, description, success, fail) {

displayMsg("Appel fonction createActionPersonnal");
  // A post entry.

  var user = firebase.auth().currentUser;
  var postAction = {
    titre: titre,
    typeAction: typeAction,
    dateintervention: dateintervention,
    localisation: localisation,
    description: description,
    rank: 0,

    // non passé en paramètre
    createur: user.uid,
    creationdate: new Date()
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref("action/").push().key;

  firebase.database().ref("action/" + newPostKey).update(postAction);

	if(success)
		success();
	displayMsg("posté" + newPostKey);
	
}


// Fonction logging
var displayMsg = function(message) {

	var output = document.getElementById("output");
	output.innerHTML = message;
}

var getCurrentDate = function() {

	var currentDate = new Date()
	var day = currentDate.getDate()
	var month = currentDate.getMonth() + 1
	var year = currentDate.getFullYear()
	return year + "-" + month + "-" + day;

}