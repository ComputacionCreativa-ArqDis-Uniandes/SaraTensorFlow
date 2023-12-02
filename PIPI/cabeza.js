let inputDict = {
  nose: [878.39, 352.12],
  leftEye: [707.57, 936.78],
  rightEye: [244.04, 307.58],
  leftEar: [284.44, 264.44],
  rightEear: [284.44, 264.44],
  leftShoulder: [284.44, 264.44],
  rightShoulder: [707.57, 441.47],
  leftElbow: [553.32, 631.39],
  rightElbow: [266.14, 772.81],
  leftWrist: [958.06, 625.84],
  rightWrist: [479.14, 136.73],
  leftHip: [181.74, 894.91],
  rightHip: [578.57, 479.33],
  leftKnee: [823.03, 482.69],
  rightKnee: [224.64, 722.46],
  leftAnkle: [694.27, 370.15],
  rightAnkle: [454.07, 635.12],
};

let referenceDict = {
  nose: [258.51, 915.24],
  leftEye: [479.02, 496.18],
  rightEye: [844.79, 366.48],
  leftEar: [695.16, 489.74],
  rightEear: [384.53, 677.68],
  leftShoulder: [320.32, 321.25],
  rightShoulder: [490.14, 588.5],
  leftElbow: [423.11, 176.38],
  rightElbow: [474.87, 603.12],
  leftWrist: [216.19, 236.77],
  rightWrist: [745.53, 245.24],
  leftHip: [569.8, 280.91],
  rightHip: [689.06, 351.99],
  leftKnee: [324.27, 976.24],
  rightKnee: [855.77, 681.69],
  leftAnkle: [313.59, 784.61],
  rightAnkle: [712.58, 148.45],
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
  console.log(lista);
  


  function normalizer(dict,list){
    for(let i in list){
      let elemento;
      elemento = list[i];
      console.log(elemento);
    }
  }


  let hey
  hey = normalizer(inputDict,lista);



