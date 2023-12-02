let diffMax = 2; // Variable to store a Max Drifft for each coordinate 
let maxDrifts = 4; // Number of variables that can drift before it's consider a no go

// Compares Standarized Dicts 
function dictCompare(dict1, dict2){
    if (dictsValidation(dict1,dict2) == false){
        console.log("Error: No ref points detected on dicts");
        return false;
    }
    
    let dict1Norm = dict1;
    let dict2Norm = dict2;

    let drifts = 0;

    let keys = commonKeys(dict1,dict2);
    // let dict1Norm = normalizador(dict1,keys);
    // let dict2Norm = normalizador(dict2,keys);

    for(let i in keys){
        let coord1X = dict1Norm[keys[i]][0];
        let coord1Y = dict1Norm[keys[i]][1];
        let coord2X = dict2Norm[keys[i]][0];
        let coord2Y = dict2Norm[keys[i]][1];

        let diffX = Math.abs(coord1X-coord2X);
        let diffY = Math.abs(coord1Y-coord2Y);

        if(diffX > diffMax || diffY > diffMax){
            drifts = drifts + 1;
        }
    }

    if (drifts > maxDrifts){
        return false;
    }
    else{
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

console.log(dictsValidation(inputDict,referenceDict));