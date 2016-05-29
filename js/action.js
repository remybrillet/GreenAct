var createAction = function (titre, typeAction, dateintervention, localisation, description, success, fail) {
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
    voters: [],
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

var getActionList = function(listeAction) {
  firebase.database().ref('action').on("child_added", function(data) {
    listeAction.push(data.val());
  });

  firebase.database().ref('action').on("child_removed", function(data) {
    var index = listeAction.indexOf(data.val());
    if(index)
      listeAction.splice(index, 1);
  });
}

var displayList = function(liste) {
  var ul = document.createElement('ul');

  for (var i = 0; i < liste.length; i++) {
    // créer balise li et ajouter à balise ul
    var li = document.createElement('li');
    li.innerHTML = liste[i].titre;
    ul.appendChild(li);
  }

  var output = document.getElementById("output");
  output.appendChild(ul);
}


// Fonction logging
var displayMsg = function(message) {
  var output = document.getElementById("output");
  output.innerHTML = message;
}

// not used
var getCurrentDate = function() {
  var currentDate = new Date()
  var day = currentDate.getDate()
  var month = currentDate.getMonth() + 1
  var year = currentDate.getFullYear()
  return year + "-" + month + "-" + day;
}