var login = function(email, password, success, fail) {

	firebase.auth().signInWithEmailAndPassword(email, password).catch(fail);
	var user = firebase.auth().currentUser;
	if(user) {
		if(success)
			success();
			displayMsg("Connecté");
	}
}

var loginWithProvider = function(provider) {
	firebase.auth().signInWithPopup(provider).then(function(result) {
	  // This gives you a Google Access Token. You can use it to access the Google API.
	  var token = result.credential.accessToken;
	  // The signed-in user info.
	  var user = result.user;
	  // ...
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ...
	});
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

var displayMsg = function(message) {

	var output = document.getElementById("output");
	output.innerHTML = message;
}