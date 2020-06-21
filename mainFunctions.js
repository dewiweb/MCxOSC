const {dialog} = require('electron');
const fs = require('fs');

function oscToEmber(oscBundle) {
 let oscArgs = JSON.stringify(oscBundle.args);
    oscArgs = oscArgs.replace(/\s|\[|\]/g,"");
    oscArgs = JSON.parse(oscArgs);
    oscArgs = oscArgs.value;
   // oscArgs = (Number(oscArgs)*32).toFixed(0);
   oscArgs = Number(oscArgs);
    return oscArgs
}

function embChPath (chNumb){
 let eChPath = 'Channels.Inputs.INP   ';
     eChPath = eChPath.concat(chNumb.toString());
 return eChPath
}

function embFadLevPath (eChPath){
  let eFadLevPath = eChPath.concat('.Fader.Fader Level');
  return eFadLevPath
}

function pathToAddress (path){
  let oscAddress = path.replace(/\./g,'/');
      slash = "/";
      oscAddress = slash.concat(oscAddress);
      return oscAddress
}

function addressToPath (address){
  let path = address.replace(/\//g, '.');
      path = path.slice(1);
      return path
}



module.exports = { oscToEmber, embChPath, embFadLevPath, pathToAddress, addressToPath }
