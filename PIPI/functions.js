let diffMax = 0.4; // Variable to store a Max Drifft for each coordinate 
let maxDrifts = 4; // Number of variables that can drift before it's consider a no go
let capturesPerPose = 10; // How many captures to save a pose
let minConfidence = 0.5 // model confidence threshold 

// Variables
iteracionPose = 0;
let tempDict = {};
let createPoseFlag = 0;
let savedPose = {};
let lastPictureTimestamp = 0; // Initialize the timestamp variable
let storedImageObject;
let imageObject;

// var ctx = document.getElementById('myBarChart').getContext('2d');
// var myBarChart;


// Compares Standarized Dicts 
function dictCompare(dict1, dict2){
    if (dictsValidation(dict1,dict2) == false){
        console.log("Error: No ref points detected on dicts");
        return false;
    }
    let drifts = 0;
    let keys = commonKeys(dict1,dict2);

    let dictDiff = {};
    
    for (let i in keys){
        dictDiff[keys[i]]=0;
    }

    let dict1Norm = normalizer(dict1,keys);
    let dict2Norm = normalizer(dict2,keys);

    for(let i in keys){
        let coord1X = dict1Norm[keys[i]][0];
        let coord1Y = dict1Norm[keys[i]][1];
        let coord2X = dict2Norm[keys[i]][0];
        let coord2Y = dict2Norm[keys[i]][1];

        let diffX = Math.abs(coord1X-coord2X);
        let diffY = Math.abs(coord1Y-coord2Y);

        let drift = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
        dictDiff[keys[i]] = drift;
        
        if(drift > diffMax ){
            drifts = drifts + 1; 
        }
    }

    //updateBarChart(dictDiff);

    //console.log(drifts);

    if (drifts > maxDrifts){
        return false;
    }
    else{
        
        const currentTime = Date.now();
        const timeDifference = currentTime - lastPictureTimestamp;

        // Check if 15 seconds have passed since the last picture
        if (timeDifference >= 15000) {
            lastPictureTimestamp = currentTime; // Update the timestamp
            releaseShutter();
            createUser();
            setTimeout(() => {
                getLatestPicture();
            }, 8000);

            setTimeout(() => {
                uploadPic(userId,picUrl);
            }, 10000);

        
        }
        return true;
    }

}

// Make sure dicts have the reference attributes Nose and LeftEye
function dictsValidation(dict1, dict2){
    let listKeys1 = Object.keys(dict1);
    let listKeys2 = Object.keys(dict2);

    if (listKeys1.includes("nose")&&listKeys2.includes("nose")) {
        if(listKeys1.includes("leftEye")&&listKeys2.includes("leftEye")) {
            return true;
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}

// Creates a set of common detected keys on both ref and TensorFlow DICT's 
function commonKeys(dict1,dict2){
let listKeys1 = Object.keys(dict1);
let listKeys2 = Object.keys(dict2);
let listKeys3 = [];

for(let i in listKeys1){
    if (listKeys2.includes(listKeys1[i])){
        listKeys3.push(listKeys1[i]);
    }
}
return listKeys3
} 

// Normalize dicts to eye-nose reference meassuring system 
function normalizer(dict,list){
    const newDict = {}
    for(let i in list){
        let x;
        x=Math.abs(dict[list[i]][0] - dict["nose"][0])/Math.abs(dict["nose"][0] - dict["leftElbow"][0]);
        
        let y;
        y=Math.abs(dict[list[i]][1] - dict["nose"][1])/Math.abs(dict["nose"][1] - dict["leftElbow"][1]);
        newDict[list[i]]=[x,y];
    }
    return newDict;
}

// gets current dictionary and returns referenceDict
function savePose(inputDict){
    let listKeys = Object.keys(inputDict);
  
    if (iteracionPose == 0){
        for (let i in listKeys){
            tempDict[listKeys[i]]= [0,0];
          }
    }
 
    if (iteracionPose < capturesPerPose){
      iteracionPose = iteracionPose + 1;
      let j = iteracionPose;
      for (let i in listKeys){
        let newX = inputDict[listKeys[i]][0];
        let newY = inputDict[listKeys[i]][1];

        let oldX = tempDict[listKeys[i]][0];
        let oldY = tempDict[listKeys[i]][1];
  
        let resultX = newX/capturesPerPose + oldX;
        let resultY = newY/capturesPerPose + oldY;
  
        tempDict[listKeys[i]] = [resultX,resultY];
      }
    } 

    if(iteracionPose == capturesPerPose){
        iteracionPose = 0;
        let returnDic = tempDict;
        tempDict = {};

        return returnDic;
    }
  }

// Sets the createPose flag for the function to work inside DRAW
function createPose(){
    createPoseFlag = 1;
}


function updateBarChart(data) {
    // Destroy the existing chart if it exists
    if (myBarChart) {
      myBarChart.destroy();
    }

    var labels = Object.keys(data);
    var values = Object.values(data);

    myBarChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Dynamic Bar Chart',
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            scaleFontSize: 40
          }
        },
        animation: false // Disable animation
      }
    });
  }

function qrCode(url){
    var qr = new QRCode(document.createElement("div"), {
        text: url,
        width: 500,
        height: 500
      });
      
      // Append the QR code to the body or any other container
      document.body.appendChild(qr._el);
}