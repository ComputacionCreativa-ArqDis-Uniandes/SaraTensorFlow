let inputDic = {
    nose: [284.44,264.44],
    leftEye: [284.44,264.44],
    rightEye: [284.44,264.44],
    leftEar: [284.44,264.44],
    rightEear: [284.44,264.44],
    leftShoulder: [284.44,264.44],
    rightShoulder: [284.44,264.44],
    leftElbow: [284.44,264.44],
    rightElbow: [284.44,264.44],
    leftWrist: [284.44,264.44],
    rightWrist: [284.44,264.44],
    leftHip: [284.44,264.44],
    rightHip: [284.44,264.44],
    leftKnee: [284.44,264.44],
    rightKnee: [284.44,264.44],
    leftAnkle: [284.44,264.44],
    rightAnkle: [284.44,264.44],
  };


  let referenceDic = {
    nose: [284.44,264.44],
    leftEye: [284.44,264.44],
    rightEye: [284.44,264.44],
    leftEar: [284.44,264.44],
    rightEear: [284.44,264.44],
    leftShoulder: [284.44,264.44],
    rightShoulder: [284.44,264.44],
    leftElbow: [284.44,264.44],
    rightElbow: [284.44,264.44],
    leftWrist: [284.44,264.44],
    rightWrist: [284.44,264.44],
    leftHip: [284.44,264.44],
    rightHip: [284.44,264.44],
    leftKnee: [284.44,264.44],
    rightKnee: [284.44,264.44],
    leftAnkle: [284.44,264.44],
    rightAnkle: [284.44,264.44],
  };

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

  let lista;
  lista = commonKeys(inputDict,referenceDict);
  


  function normalizer(dict,list){
    for(let i in list){
      let elemento;
      elemento = dict.list[i];
      console.log();
    }
  }


  let hey
  hey = normalizer(inputDict,lista);



