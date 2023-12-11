let poseNetLiveView;
let posesLiveView = [];


let name;
let dict = {};

async function setup(){
    var liveViewContainer1 = document.getElementById("liveViewContainer");
    if (liveViewContainer1) {
    liveViewContainer1.remove();
    } else {
    console.log("Element with id 'liveViewContainer' not found.");
    }

    const liveViewContainer = document.getElementById('liveViewContainer');
    liveViewContainer.style.display = 'block';


    liveViewImage = document.getElementById('liveViewImage');
    updateLiveView();

    poseNetLiveView = await ml5.poseNet(function() {
        console.log('Model loaded for LiveView.');
        poseNetLiveView.singlePose(document.getElementById('liveViewImage'), function(results) {
          posesLiveView = results;
        });
      });
	  
    draw();
}

function draw() {
      poseNetLiveView.singlePose(document.getElementById('liveViewImage'), function(results) {
          posesLiveView = results;
        });

      requestAnimationFrame(draw);
      const liveViewOverlayCanvas = document.getElementById('liveViewOverlayCanvas');
      const liveViewCtx = liveViewOverlayCanvas.getContext('2d');
      liveViewCtx.clearRect(0, 0, liveViewOverlayCanvas.width, liveViewOverlayCanvas.height);

      let tempScore = 0;
      let avgConfidence = 0;

      for (let i = 0; i < posesLiveView.length; i++) {
        let pose = posesLiveView[i].pose;
        let numKeypoints = pose.keypoints.length
        for (let j = 0; j < pose.keypoints.length; j++) {
          let keypoint = pose.keypoints[j];
          if (keypoint.score > minConfidence) {
            let keypointName = keypoint["part"];
            tempScore = tempScore + keypoint.score;
            liveViewCtx.fillStyle = '#ff0000';
            liveViewCtx.beginPath();
            liveViewCtx.arc(keypoint.position.x, keypoint.position.y, 5, 0, 2 * Math.PI);
            liveViewCtx.fill();
            liveViewCtx.fillStyle = '#000000';
            liveViewCtx.fillText("(" + keypoint.position.x.toFixed(2) + ", " + keypoint.position.y.toFixed(2) + ")",keypoint.position.x + 10,keypoint.position.y + 20);

            dict[keypointName] = [keypoint.position.x,keypoint.position.y] 
          }
        }
        
        avgConfidence = tempScore/numKeypoints;

        if (createPoseFlag == 1){
          
          if (avgConfidence >= minConfidence){
            let tempRes = savePose(dict);
            if(tempRes){
              console.log(tempRes);
              createPoseFlag = 0;
              pose2 = tempRes;
            }
          }
        }
      }

      if (avgConfidence >= minConfidence){
        if(dictCompare(dict,pose2)){
          document.body.style.backgroundColor = "red";        }
      }
      else{
        document.body.style.backgroundColor = "white";
      }
    }
