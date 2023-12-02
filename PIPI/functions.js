// Compares Standarized Dicts 

function dictCompare(dict1, dict2){
    let dict1Norm = dict1;
    let keys = commonKeys(dict1,dict2);
    // let dict1Norm = normalizador(dict1,keys);
    // let dict2Norm = normalizador(dict2,keys);

    for(let i in keys){
        let coord1X = dict1Norm[keys[i]];
        console.log(coord1X);
    }


}

dictCompare(inputDict,referenceDict);