let liveViewImage;
let picUrl;

function setupCamera() {
    const inputField = document.getElementById('textInput');
    camaraIP = inputField.value;
    const inputField2 = document.getElementById('textInput2');
    refreshRate = inputField2.value;

    camaraIP = "http://" + camaraIP;
    ccapiIP = camaraIP + "/ccapi"
    console.log(ccapiIP);
  fetch(ccapiIP, {
    method: 'GET'
  })
  .then(response => {
    if (response.ok) {
      console.log('Camera setup successful');
  setupLive();
    } else {
      console.error('Failed to setup the camera');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
};

const setupPayload = {
  "liveviewsize": "medium",
  "cameradisplay": "on"
  };

function setupLive(){
liveViewIP = camaraIP + "/ccapi/ver100/shooting/liveview"
fetch(liveViewIP, {
      method: 'POST',
      body: JSON.stringify(setupPayload)
    })
startLiveView();
  };


// Function to release the shutter
function releaseShutter() {
  const payload = {
    "action": "full_press",
    "af": true
  };
  const payload2 = {
    "action": "release",
    "af": true
  };

  // Send a POST request to release the shutter
  setTimeout(() => {
    shootIP = camaraIP + "/ccapi/ver100/shooting/control/shutterbutton/manual"
    fetch(shootIP, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (response.ok) {
        console.log('Shutter fully pressed');
      } else {
        console.error('Failed to fully press the shutter');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, 100);

  setTimeout(() => {
    shootIP = camaraIP + "/ccapi/ver100/shooting/control/shutterbutton/manual"
    fetch(shootIP, {
      method: 'POST',
      body: JSON.stringify(payload2)
    })
    .then(response => {
      if (response.ok) {
        console.log('Shutter released');
      } else {
        console.error('Failed to release the shutter');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, 200);
}

function startLiveView() {
  const liveViewContainer = document.getElementById('liveViewContainer');
  liveViewImage = document.createElement('img');
  liveViewContainer.appendChild(liveViewImage);
  setInterval(updateLiveView, refreshRate);
}

// Function to fetch and update live view image
function updateLiveView() {
  const updateLiveViewIP = camaraIP + "/ccapi/ver100/shooting/liveview/flip?timestamp=";
  const timestamp = new Date().getTime();

  // Fetch the image
  fetch(updateLiveViewIP + timestamp)
    .then(response => response.blob())
    .then(blob => {
      // Create an image element to handle the image
      const img = new Image();
      img.onload = () => {
        // Create a canvas to draw the rotated image
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Rotate the image 90 degrees
        canvas.width = img.height;
        canvas.height = img.width;
        ctx.rotate(Math.PI / 2);
        ctx.drawImage(img, 0, -canvas.width);

        // Convert the canvas content to a data URL
        const rotatedImageDataUrl = canvas.toDataURL();

        // Optionally, you can store the rotated image locally using other methods (e.g., IndexedDB, localStorage)
        // For simplicity, we'll just create an <img> element to temporarily store it
        const rotatedImage = new Image();
        rotatedImage.src = rotatedImageDataUrl;

        // Update the live view image source with the rotated image
        liveViewImage.src = rotatedImageDataUrl;
      };

      // Set the source of the image to the fetched blob
      img.src = URL.createObjectURL(blob);
    })
    .catch(error => {
      console.error("Error fetching live view image:", error);
    });
}

// Call the function to update the live view image
updateLiveView();


function getLatestPicture() {
  const currentDirectoryIP = camaraIP + "/ccapi/ver120/contents/card2/100EOSR6?type=jpeg";
  
  fetch(currentDirectoryIP, {
    method: 'GET'
  })
  .then(response => {
    if (response.ok) {
      return response.json(); // return the JSON promise for chaining
    } else {
      console.error('Failed to get the current directory');
      throw new Error('Failed to get the current directory');
    }
  })
  .then(result => {
    // Check if the result has a 'path' property and it is an array
    if (result && result.path && Array.isArray(result.path)) {
      // Get the last URL from the array
      const lastUrl = result.path[result.path.length - 1 ];

      picUrl = camaraIP + lastUrl;
      // Open the last URL in a new tab
      //window.open(picUrl, '_blank');
    } else {
      // Handle the case when the structure is not as expected
      console.error("Invalid result structure");
    }
  })
  .catch(error => {
    // Handle any errors that might occur during the fetch or processing
    console.error("Error:", error);
  });
}





