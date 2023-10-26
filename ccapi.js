let liveViewImage;

    function setupCamera() {
        const inputField = document.getElementById('textInput');
        camaraIP = inputField.value;
        const inputField2 = document.getElementById('textInput2');
        refreshRate = inputField2.value;

        camaraIP = "https://" + camaraIP;
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
		fetch('https://192.168.1.25:443/ccapi/ver100/shooting/liveview', {
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
        fetch('https://192.168.1.25:443/ccapi/ver100/shooting/control/shutterbutton/manual', {
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
        fetch('https://192.168.1.25:443/ccapi/ver100/shooting/control/shutterbutton/manual', {
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

    function updateLiveView() {
      const timestamp = new Date().getTime();
      liveViewImage.src = `https://192.168.1.25:443/ccapi/ver100/shooting/liveview/flip?timestamp=${timestamp}`;
    }