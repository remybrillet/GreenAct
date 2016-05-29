var login = function(email, password, success, fail) {
	firebase.auth().signInWithEmailAndPassword(email, password).catch(fail);
	var user = firebase.auth().currentUser;
	if(user) {
		if(success)
			success();
			displayMsg("Connecté");
	}
}

var logout = function() {
	var user = firebase.auth().currentUser;
	if (user) 
	{
		firebase.auth().signOut();
		displayMsg("Déconnecté");
	}
}

var createUser = function(email, password, fail) {
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(fail);
}

var updateUserPassword = function(password, success, fail) {
	var user = firebase.auth().currentUser;
	user.updatePassword(password).then(success, fail);
}

var updateUserEmail = function(email, success, fail) {
	var user = firebase.auth().currentUser;
	user.updateEmail(email).then(success, fail);
}

var passwordReset = function(email, success, fail) {
	firebase.auth().sendPasswordResetEmail(email).then(success, fail);
}

var updateUserName = function(username, success, fail) {

	var user = firebase.auth().currentUser;
	var profile = {displayName: username, photoURL: user.photoURL};
	user.updateProfile(profile).then(success, fail);
}

var updateUserPhotoURL = function(photoURL, success, fail) {

	var user = firebase.auth().currentUser;
	var profile = {displayName: user.displayName, photoURL: photoURL};
	user.updateProfile(profile).then(success, fail);
}

var vote = function(action) {
	var user = firebase.auth().currentUser;
	var index = action.voters.indexOf(user.uid);
	if(index) return; // if user already voted, cancel

	action.voters.push(user.uid);
	action.rank++;
	firebase.database().ref('action/' + Object.keys(action)[0]).update(action);
}

var displayMsg = function(message) {

	var output = document.getElementById("output");
	output.innerHTML = message;
}
