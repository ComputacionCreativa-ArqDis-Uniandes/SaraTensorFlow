let userId;
let userAns = {};

let userScore = {};
let userLiveScore = {};

let userSituacion = {};
let userLiveSituacion = 0;

let picUrl;

const firebaseConfig = {
    apiKey: "AIzaSyCkJH4-Xkjik2PF2pWN8GyNhixwGWRyRyc",
    authDomain: "sarabooth-67b51.firebaseapp.com",
    databaseURL: "https://sarabooth-67b51-default-rtdb.firebaseio.com",
    projectId: "sarabooth-67b51",
    storageBucket: "sarabooth-67b51.appspot.com",
    messagingSenderId: "142085085593",
    appId: "1:142085085593:web:a8bac7b6b5fbe4d2b59b08",
    measurementId: "G-ZXS2DR6C9C"
  };

firebase.initializeApp(firebaseConfig);
//firebase.appCheck().activate('6LfsPyApAAAAAN4kUQM1pmLItH52hyCd6JzFJoLp');


// const appCheck = firebase.appCheck();
// appCheck.activate(
//   '6LdDvugoAAAAABp7Asb7mGMItBqIKkaOin0YW7_U',
//   true);


function createUser() {
  const database = firebase.database().ref("saraBooth");
  const userRef = database.push(); 

  const currentTime = new Date().toString(); 
  userRef.set({
    time: currentTime
  }, (error) => {
    if (error) {
      //console.error("Error creating user and storing time:", error);
    } else {
      //console.log("User created and time stored successfully");
	  userId = userRef.key;
	  //console.log(userId);
      return userRef.key; 
	 
    }
  });
}

function uploadPic(userId, url) {
  // const storage = firebase.storage();
  const storageRef = firebase.storage().ref("saraBooth"); // Get a reference to the Firebase Storage root
  const imagesRef = storageRef.child('user_images'); // Create a child reference under 'user_images'

  // Generate a unique key for the image
  const imageKey = firebase.database().ref().child('saraBooth').push().key;

  // Create a reference to the image in the Realtime Database
  const databaseRef = firebase.database().ref(`saraBooth/${userId}/userPic`);

  // Fetch the image from the provided URL and upload it to Firebase Storage
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const imageRef = imagesRef.child(`${imageKey}.jpg`); // Change the extension as per your image type
      return imageRef.put(blob);
    })
    .then(snapshot => {
      // Get the download URL for the uploaded image
      return snapshot.ref.getDownloadURL();
    })
    .then(downloadURL => {
      // Update the Realtime Database with the download URL
      picUrl = downloadURL;
      return databaseRef.set(downloadURL);
    })
    .then(() => {
      console.log("Image uploaded and database updated successfully");
    })
    .catch(error => {
      console.error("Error uploading image:", error);
    });
}

