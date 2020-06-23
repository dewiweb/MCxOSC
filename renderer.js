var ipcRenderer = require('electron').ipcRenderer
var oscAddr = new Array("/Channels")


ipcRenderer.on('udpportOK', function(event){
  var dot2 = document.getElementById("dot2");
  dot2.style.color = "green";
})

ipcRenderer.on('eServerOK', function(event){
  var dot1 = document.getElementById("dot1");
  dot1.style.color = "green";
})

ipcRenderer.on('oServerOK', function(event){
  var dot3 = document.getElementById("dot3");
  dot3.style.color = "green";
})

ipcRenderer.on('sendEmberValue', function(event, emberValue, whichRow, whichCell){

  var table = document.getElementById("tableOfConnection");
  var emberValue = emberValue;
  table.rows[whichRow].cells[whichCell].innerHTML = emberValue;
})

ipcRenderer.on('oReceivedAddr',  function(event, oRaddr, oRargs){
  filteR = oRaddr.toUpperCase();
  console.log("filteR",filteR);

  table = document.getElementById("tableOfConnection");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[4];
    if (td) {
      txtValue = JSON.stringify(td.textContent) || JSON.stringify(td.innerText);
      console.log("txtValue",txtValue.toUpperCase());
      var p=td.parentNode;
      var myRow = p.rowIndex;
      if (txtValue.toUpperCase().indexOf(filteR) > -1) {
       // var p=o.parentNode.parentNode;
        //var myRow = p.rowIndex;
        console.log('jai trouvé', filteR, 'dans la ligne d index',myRow);
        table.rows[myRow].cells[3].innerHTML = oRargs.toFixed(2);
        var sFactor = table.rows[myRow].cells[2].innerHTML;
        var rEaddr = table.rows[myRow].cells[0].innerHTML;
        ipcRenderer.send('reSendOrArgs', oRargs, rEaddr, sFactor);
      } else {
      console.log("adresse osc recherchee n existe pas");
      }
    }
  }


 // indexOrAddr = table.indexOf(oRaddr);
 // console.log("indexOf.oRaddr : ", indexOrAddr);

})

ipcRenderer.on('sendFilename', function(event,filename){
  filenameReplace = filename.replace(/\//g,",")
  filenameSplit = filenameReplace.split(",")
  console.log("filename array", filenameSplit);
  filenameSlice = filenameSplit.slice(-1)[0]
  console.log("last e of filename", filenameSlice);
  //filename = JSON.stringify(filename);
  document.title = "MCxOSC - " + filenameSlice;
  document.getElementById("filepath").innerHTML = filename;
})

ipcRenderer.on('sendFileContent', function(event, content){
  var table = document.getElementById("tableOfConnection");
  deleteAllRows();
    var sendedJSON = JSON.parse(content);
  var sendedJSON = sendedJSON.replace(/\\n/g,"");
  var sendedJSON = JSON.parse(sendedJSON);
  
  var fileEserverIP = sendedJSON[0].eServerProperties.eServerIP;
  var fileEserverIP = fileEserverIP.split(".");
  var ip1 = fileEserverIP[0];
  var ip2 = fileEserverIP[1];
  var ip3 = fileEserverIP[2];
  var ip4 = fileEserverIP[3];
  document.getElementById('ip1').value = ip1;
  document.getElementById('ip2').value = ip2;
  document.getElementById('ip3').value = ip3;
  document.getElementById('ip4').value = ip4;

  var fileEserverPort = sendedJSON[0].eServerProperties.eServerPort;
  var fileEserverPort = fileEserverPort.toString();  
  document.getElementById("port").value = fileEserverPort;

  var fileUDPport = sendedJSON[0].udpPort;
  document.getElementById("localPort").value = fileUDPport;

  var fileOserverIP = sendedJSON[0].oServerProperties.oServerIP;
  var fileOserverIP = fileOserverIP.split(".");
  var ip11 = fileOserverIP[0];
  var ip21 = fileOserverIP[1];
  var ip31 = fileOserverIP[2];
  var ip41 = fileOserverIP[3];
  document.getElementById('ip11').value = ip11;
  document.getElementById('ip21').value = ip21;
  document.getElementById('ip31').value = ip31;
  document.getElementById('ip41').value = ip41;

  var fileOserverPort = sendedJSON[0].oServerProperties.oServerPort;
  document.getElementById("port2").value = fileOserverPort;

  console.log("first row", sendedJSON[1]);
  sendedJSON.forEach(element => {
    console.log("element.path", element.path);
    
    if(element.path){
      var btnDel = document.createElement("BUTTON");
      var btnGo = document.createElement("BUTTON");
      btnDel.innerHTML = "X";
      btnDel.setAttribute('onClick','SomeDeleteRowFunction(this)');
      btnGo.innerHTML = "Go!";
      btnGo.setAttribute('onClick','sendConnection(this)');
      
      var row = table.insertRow(-1);
      row.style.fontSize = "smaller";
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      var cell6 = row.insertCell(5);
      var cell7 = row.insertCell(6);
      var cell8 = row.insertCell(7);
      var cell9 = row.insertCell(8);
      var cell10 = row.insertCell(9);
      var cell11 = row.insertCell(10);
      cell1.innerHTML = element.path;
      cell2.innerHTML = "----";
      cell3.innerHTML = element.factor;
      cell4.innerHTML = "----";
      cell5.innerHTML = element.address;
      cell6.appendChild(btnGo);
      cell6.appendChild(btnDel);
      cell7.innerHTML = element.type;
      cell8.innerHTML = "";
      cell9.innerHTML = element.min;
      cell10.innerHTML = "";
      cell11.innerHTML = element.max;
      cell3.style.fontSize ='x-small';
      cell9.style.fontSize ='x-small';
      cell11.style.fontSize ='x-small';
    }
  });
})

function addGenBtns (){
  var table = document.getElementById("tableOfConnection");
  var btnSuscribeAll = document.createElement("BUTTON");
  var btnDeleteAll = document.createElement("BUTTON");
  btnDeleteAll.innerHTML = "Delete All"
  btnDeleteAll.setAttribute('onClick','deleteAllRows(this)'); //function not created yet
  btnSuscribeAll.innerHTML = "Connect All!"
  btnSuscribeAll.setAttribute('onClick','sendAllConnections(this)');
  table.rows[1].cells[5].appendChild(btnSuscribeAll);
  table.rows[1].cells[5].appendChild(btnDeleteAll);
}


function makeVisible (op){
      document.getElementById(op).style.visibility = "visible";
}

function displayForm1 (event){
  const form1 = document.getElementById('form1');
  const add1 = document.getElementById('add1');
  var ip1 = document.getElementById("ip1").value;
  var ip2 = document.getElementById("ip2").value;
  var ip3 = document.getElementById("ip3").value;
  var ip4 = document.getElementById("ip4").value;
  var port = document.getElementById("port").value;
  var data = ip1 + "." + ip2 + "." + ip3 + "." + ip4;
  EmberServerIP = data;
  EmberServerPort = Number(port);
  add1.removeChild(add1.firstChild);
  add1.textContent = "OK!  Address : " + data + "   /   Port : " + port;
   ipcRenderer.send('sendEmberServerIP', data );
   ipcRenderer.send('sendEmberServerPort', Number(port));
      event.preventDefault();
}

function setEchanNumbPrefix (typeOfChan){
  var eChanNumbPrefix = document.getElementById("eChanNumbPrefix");
  if (typeOfChan == "Inputs" ) {
    eChanNumbPrefix.value = "INP";
  } else if (typeOfChan == "GP Channels") {
    eChanNumbPrefix.value = "GPC";
  } else if (typeOfChan == "Sums") {
    eChanNumbPrefix.value = "SUM";
  } else if (typeOfChan == "Auxes"){
    eChanNumbPrefix.value = "AUX";
  } else if (typeOfChan == "Masters"){
    eChanNumbPrefix.value = "VCA";
  }else if (typeOfChan == "Groups"){
    eChanNumbPrefix.value = "GRP";
  }
}

function displayForm2 (event){
  const form2 = document.getElementById('form2');
  const add2 = document.getElementById('add2');
  localPort = document.getElementById("localPort").value;

  add2.textContent = "OK!  Address : 127 . 0 . 0 . 1   /   Port : " + localPort;
    ipcRenderer.send('sendUDPport', Number(localPort));
      event.preventDefault();

}

function displayForm3 (event){
  const form3 = document.getElementById('form3');
  const add3 = document.getElementById('add3');
  var ip11 = document.getElementById("ip11").value;
  var ip21 = document.getElementById("ip21").value;
  var ip31 = document.getElementById("ip31").value;
  var ip41 = document.getElementById("ip41").value;
  var port2 = document.getElementById("port2").value;
  var data1 = ip11 + "." + ip21 + "." + ip31 + "." + ip41;
  OSCserverIP  = data1;
  OSCserverPort  =port2;
  add3.textContent = "OK!  Address : " + data1 + "   /   Port : " + port2;
   ipcRenderer.send('sendOSCserverIP', data1 );
   ipcRenderer.send('sendOSCserverPort', Number(port2));
      event.preventDefault();
}

function submitEmberPath (event){
      var btnDel = document.createElement("BUTTON");
      var btnGo = document.createElement("BUTTON");
      var switcher = document.getElementById("switcher");
      var oscAddr = document.getElementById("oscAddr").value;
      var slct0 = document.getElementById("slct0").value;
      var chanNumbPrefix = document.getElementById("eChanNumbPrefix").value;
      var chanNumb = document.getElementById("eChanNumb").value;
      var chanNumbNumb = Number(chanNumb);
      var slct1 = document.getElementById("slct1").value;
      var slct2 = document.getElementById("slct2").value;
      var slct3 = document.getElementById("slct3").value;
      var emBerPath = "";
      if(switcher.className == "toggle"){
      if (slct3 == "" && chanNumbNumb < 10){
        emBerPath = "Channels." + slct0 + "." + chanNumbPrefix + "   " + chanNumb + "." + slct1 + "." + slct2;
      }else if (slct3 == "" && chanNumbNumb > 9 && chanNumbNumb < 100){
        emBerPath = "Channels." + slct0 + "." + chanNumbPrefix + "  " + chanNumb + "." + slct1 + "." + slct2;
      }else if (slct3 == "" && chanNumbNumb > 99){
        emBerPath = "Channels." + slct0 + "." + chanNumbPrefix + " " + chanNumb + "." + slct1 + "." + slct2;
       }else if (slct3 != "" && chanNumbNumb < 10){
        emBerPath = "Channels." + slct0 + "." + chanNumbPrefix + "   " + chanNumb + "." + slct1 + "." + slct2 + "." + slct3;
      }else if (slct3 != "" && chanNumbNumb > 9 && chanNumbNumb <100){
        emBerPath = "Channels." + slct0 + "." + chanNumbPrefix + "  " + chanNumb + "." + slct1 + "." + slct2 + "." + slct3;
      }else if (slct3 != "" && chanNumbNumb > 99){
        emBerPath = "Channels." + slct0 + "." + chanNumbPrefix + " " + chanNumb + "." + slct1 + "." + slct2 + "." + slct3;
      };
    }else{
      emBerPath = chanNumbPrefix;
      eVarType = "Integer";
      eVarFactor = 1;
      eVarMin = 0;
      eVarMax = 0
    };
      
      btnDel.innerHTML = "X";
      btnDel.setAttribute('onClick','SomeDeleteRowFunction(this)');
      btnGo.innerHTML = "Go!";
      btnGo.setAttribute('onClick','sendConnection(this)');
      var table = document.getElementById("tableOfConnection");
      var row = table.insertRow(-1);
      row.style.fontSize = "smaller";
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      var cell6 = row.insertCell(5);
      var cell7 = row.insertCell(6);
      var cell8 = row.insertCell(7);
      var cell9 = row.insertCell(8);
      var cell10 = row.insertCell(9);
      var cell11 = row.insertCell(10);
      cell1.innerHTML = emBerPath;
      cell2.innerHTML = "----";
      cell3.innerHTML = eVarFactor;
      cell4.innerHTML = "----";
      cell5.innerHTML = oscAddr;
      cell6.appendChild(btnGo);
      cell6.appendChild(btnDel);
      cell7.innerHTML = eVarType;
      cell8.innerHTML = "";
      cell9.innerHTML = eVarMin;
      cell10.innerHTML = "";
      cell11.innerHTML = eVarMax;
      //cell7.style.visibility = "hidden";
      //console.log("cell7", cell7.innerHTML);
      cell3.style.fontSize ='x-small';
      cell9.style.fontSize ='x-small';
      cell11.style.fontSize ='x-small';
      if (table.rows.length == 3){
        if(table.rows[1].cells[5].innerHTML == ""){ addGenBtns();
        }
      };
      event.preventDefault();

}

function populate(s1,s2,s3,s4){

    	var s1 = document.getElementById(s1);
    	var s2 = document.getElementById(s2);
      var s3 = document.getElementById(s3);





    //  s2.hasChildNodes()
    	s2.innerHTML = "";

        //s2.innerHTML = null;
       if(s1.value == "Channel States"){
        var optionArray = ["|----|||||",
        "Stereo|Stereo|Boolean|||||||"];
    	}else if(s1.value == "Mute" &&  s2.name != "slct3"){
    		var optionArray = ["|----|||||","Mute|Mute|Boolean|||||||"];
    	}else if(s1.value == "Fader"){
        var optionArray = ["|----|||||",
        "Fader Level|Fader Level|Integer|\nmin:-4096|\nmax:480|\nfactor:32|\n-"];
      }else if(s1.value == "Slider"){
        var optionArray = ["|----|||||",
        "Fader Position|Fader Position|Integer|\nmin:0|\nmax:100|\nfactor:1|\n-"];
      }else if(s1.value == "Pan"){
        var optionArray = ["|----|||||",
        "Left-Right Panning|Left-Right Panning|Integer|\nmin:-20|\nmax:20|\nfactor:1|\n-",
        "Front-Back Panning|Front-Back Panning|Integer|\nmin:-20|\nmax:20|\nfactor:1|\n-",
        "Up-Down Panning|Up-Down Panning|Integer|\nmin:-20|\nmax:20|\nfactor:1|\n-",
        "Pan Slope|Pan Slope|Integer|\nmin:-20|\nmax:20|\nfactor:1|\n-",
        "LFE Level|LFE Level|Integer|\nmin:-4096|\nmax:480|\nfactor:32|\n-",
        "Hyperpan Front Width|Hyperpan Front Width|Integer|\nmin:-100|\nmax:100|\nfactor:1|\n-",
        "Hyperpan Back Width|Hyperpan Back Width|Integer|\nmin:-100|\nmax:100|\nfactor:1|\n-",
        "Hyperpan Depth|Hyperpan Depth|Integer|\nmin:-100|\nmax:100|\nfactor:1|\n-",
        "Hyperpan Turn|Hyperpan Turn|Integer|\nmin:-180|\nmax:180|\nfactor:1|\n-",
        "Pan On|Pan On|Boolean||||",
        "Pan Mode Center-Flat|Pan Mode Center-Flat|Boolean||||",
        "Surround|Surround|Boolean||||"
      ];
    	}else if (s1.value == "Signal Processing") {
        var optionArray = [
        "|----|||||",
        "Input Mixer|Input Mixer|||||",
        "Equalizer|Equalizer|||||",
        "Compressor|Compressor|||||"];
      }else if(s1.value == "Input Mixer"){
    		var optionArray = ["|----|||||","Input Gain|Input Gain|Integer|\nmin:-4096|\nmax:2560|\nfactor:32|\n-"];
    	}else if(s1.value == "Equalizer"){
    		var optionArray = ["|----|||||",
        "Equalizer 1 Gain|Equalizer 1 Gain|Integer|\nmin:-768|\nmax:768|\nfactor:32|\n-",
        "Equalizer 1 Frequency|Equalizer 1 Frequency|Integer|\nmin:2131|\nmax:7045|\nfactor:1|\n-",
        "Equalizer 1 Q|Equalizer 1 Q|Integer|\nmin:6|\nmax:5120|\nfactor:64|\n-",
        "Equalizer 1 On|Equalizer 1 On|Boolean||||",
        "Equalizer 1 Slope|Equalizer 1 Slope|Integer|\nmin:0|\nmax:2|\nfactor:1|\n6dB/oct0\n12dB/oct1\n18dB/oct2",
        "Equalizer 1 Type|Equalizer 1 Type|Integer|\nmin:1|\nmax:5|\nfactor:1|\nBell    1\nHi Pass 2\nLo Shelv5",
        "Equalizer 2 Gain|Equalizer 2 Gain|Integer|\nmin:-768|\nmax:768|\nfactor:32|\n-",
        "Equalizer 2 Frequency|Equalizer 2 Frequency|Integer|\nmin:2131|\nmax:7045|\nfactor:1|\n-",
        "Equalizer 2 Q|Equalizer 2 Q|Integer|\nmin:6|\nmax:5120|\nfactor:64|\n-",
        "Equalizer 2 On|Equalizer 2 On|Boolean||||",
        "Equalizer 2 Slope|Equalizer 2 Slope|Integer|\nmin:0|\nmax:2|\nfactor:1|\n6dB/oct0\n12dB/oct1\n18dB/oct2",
        "Equalizer 2 Type|Equalizer 2 Type|Integer|\nmin:1|\nmax:5|\nfactor:1|\nBell    1\nHi Pass 2\nLo Shelv5",
        "Equalizer 3 Gain|Equalizer 3 Gain|Integer|\nmin:-768|\nmax:768|\nfactor:32|\n-",
        "Equalizer 3 Frequency|Equalizer 3 Frequency|Integer|\nmin:2131|\nmax:7045|\nfactor:1|\n-",
        "Equalizer 3 Q|Equalizer 3 Q|Integer|\nmin:6|\nmax:5120|\nfactor:64|\n-",
        "Equalizer 3 On|Equalizer 3 On|Boolean||||",
        "Equalizer 3 Slope|Equalizer 3 Slope|Integer|\nmin:0|\nmax:2|\nfactor:1|\n6dB/oct0\n12dB/oct1\n18dB/oct2",
        "Equalizer 3 Type|Equalizer 2 Type|Integer|\nmin:1|\nmax:5|\nfactor:1|\nBell    1\nHi Pass 2\nLo Shelv5",
        "Equalizer 4 Gain|Equalizer 4 Gain|Integer|\nmin:-768|\nmax:768|\nfactor:32|\n-",
        "Equalizer 4 Frequency|Equalizer 4 Frequency|Integer|\nmin:2131|\nmax:7045|\nfactor:1|\n-",
        "Equalizer 4 Q|Equalizer 4 Q|Integer|\nmin:6|\nmax:5120|\nfactor:64|\n-",
        "Equalizer 4 On|Equalizer 4 On|Boolean||||",
        "Equalizer 4 Slope|Equalizer 4 Slope|Integer|\nmin:0|\nmax:2|\nfactor:1|\n6dB/oct0\n12dB/oct1\n18dB/oct2",
        "Equalizer 4 Type|Equalizer 4 Type|Integer|\nmin:1|\nmax:5|\nfactor:1|\nBell    1\nHi Pass 2\nLo Shelv5"];
      }else if(s1.value == "Assignements"){
        var optionArray = ["|----|||||",
        "Aux Assignments|Aux Assignments|||||"]
      }else if(s1.value == "Aux Assignments"){
        var optionArray = ["|----|||||",
        "Aux Send 1 Level|Aux Send 1 Level|Integer|\nmin:-4096|\nmax:480|\nfactor:32|\n-",
        "Aux Send 2 Level|Aux Send 2 Level|Integer|\nmin:-4096|\nmax:480|\nfactor:32|\n-",
        "Aux Send 1/2 Pan/Balance|Aux Send 1/2 Pan/Balance|Integer|\nmin:-20|\nmax:20|\nfactor:1|\n-",
        "Aux Send 1 On|Aux Send 1 On|Boolean||||",
        "Aux Send 1 Mix Cue|Aux Send 1 Mix Cue|Boolean||||",
        "Aux Send 1 Independent|Aux Send 1 Independent|Boolean||||",
        "Aux Send 2 On|Aux Send 2 On|Boolean||||",
        "Aux Send 2 Mix Cue|Aux Send 2 Mix Cue|Boolean||||",
        "Aux Send 2 Independent|Aux Send 2 Independent|Boolean||||",
        "Aux Send 3 Level|Aux Send 3 Level|Integer|\nmin:-4096|\nmax:480|\nfactor:32|\n-",
        "Aux Send 4 Level|Aux Send 4 Level|Integer|\nmin:-4096|\nmax:480|\nfactor:32|\n-",
        "Aux Send 3/4 Pan/Balance|Aux Send 3/4 Pan/Balance|Integer|\nmin:-20|\nmax:20|\nfactor:1|\n-",
        "Aux Send 3 On|Aux Send 3 On|Boolean||||",
        "Aux Send 3 Mix Cue|Aux Send 3 Mix Cue|Boolean||||",
        "Aux Send 3 Independent|Aux Send 3 Independent|Boolean||||",
        "Aux Send 4 On|Aux Send 4 On|Boolean||||",
        "Aux Send 4 Mix Cue|Aux Send 4 Mix Cue|Boolean||||",
        "Aux Send 4 Independent|Aux Send 4 Independent|Boolean||||",
        "Aux Send 5 Level|Aux Send 5 Level|Integer|\nmin:-4096|\nmax:480|\nfactor:32|\n-",
        "Aux Send 6 Level|Aux Send 6 Level|Integer|\nmin:-4096|\nmax:480|\nfactor:32|\n-",
        "Aux Send 5/6 Pan/Balance|Aux Send 5/6 Pan/Balance|Integer|\nmin:-20|\nmax:20|\nfactor:1|\n-",
        "Aux Send 5 On|Aux Send 5 On|Boolean||||",
        "Aux Send 5 Mix Cue|Aux Send 5 Mix Cue|Boolean||||",
        "Aux Send 5 Independent|Aux Send 5 Independent|Boolean||||",
        "Aux Send 6 On|Aux Send 6 On|Boolean||||",
        "Aux Send 6 Mix Cue|Aux Send 6 Mix Cue|Boolean||||",
        "Aux Send 6 Independent|Aux Send 6 Independent|Boolean||||",
        "Aux Send 7 Level|Aux Send 7 Level|Integer|\nmin:-4096|\nmax:480|\nfactor:32|\n-",
        "Aux Send 8 Level|Aux Send 8 Level|Integer|\nmin:-4096|\nmax:480|\nfactor:32|\n-",
        "Aux Send 7/8 Pan/Balance|Aux Send 7/8 Pan/Balance|Integer|\nmin:-20|\nmax:20|\nfactor:1|\n-",
        "Aux Send 7 On|Aux Send 7 On|Boolean||||",
        "Aux Send 7 Mix Cue|Aux Send 7 Mix Cue|Boolean||||",
        "Aux Send 7 Independent|Aux Send 7 Independent|Boolean||||",
        "Aux Send 8 On|Aux Send 8 On|Boolean||||",
        "Aux Send 8 Mix Cue|Aux Send 8 Mix Cue|Boolean||||",
        "Aux Send 8 Independent|Aux Send 8 Independent|Boolean||||"]
      }else if(s1.value == "Compressor"){
        var optionArray = ["|----|||||",
        "Compressor Threshold|Compressor Threshold|Integer|\nmin:-2240|\nmax:640|\nfactor:32|\n-",
        "Compressor Gain|Compressor Gain|Integer|\nmin:-640|\nmax:640|\nfactor:32|\n-",
        "Compressor Ratio|Compressor Ratio|Integer|\nmin:0|\nmax:2048|\nfactor:1|\n-",
        "Compressor Attack|Compressor Attack|Integer|\nmin:5|\nmax:12000|\nfactor:48|\n-",
        "Compressor Release|Compressor Release|Integer|\nmin:1920|\nmax:480000|\nfactor:48|\n-",
        "Compressor Mix|Compressor Mix|Integer|\nmin:0|\nmax:100|\nfactor:1|\n-"
      ]
      };
      if(s1.value == ""){
        s2.required = false;
        s2.style.visibility = "hidden";
        s3.style.visibility = "hidden";
        s2.innerHTML = "";
      }
      else{
    	for(var option in optionArray){
    		var pair = optionArray[option].split("|");
    		var newOption = document.createElement("option");
    		newOption.value = pair[0];
    		newOption.innerHTML = pair[1];
        newOption.title = pair[2] + pair[3] + pair[4] + pair[5] + pair[6];
    		s2.options.add(newOption);
        s2.required = true;
        s2.style.visibility = "visible";
        s3.style.visibility = "visible";


    	}
    }
}

function fillOscAddr(event){
  var oscAddr = document.getElementById("oscAddr");
  var chanNumbPrefix = document.getElementById("eChanNumbPrefix");
  var chanNumb = document.getElementById("eChanNumb");
  var slct1 = document.getElementById("slct1");
  var slct2 = document.getElementById("slct2");
  var slct3 = document.getElementById("slct3");
  var switcher = document.getElementById("switcher");
  if(switcher.className == "toggle"){

   if (slct3.value == ""){
     oscAddr.value = "/Channels/" + slct0.value + "/" + chanNumbPrefix.value + "   " + chanNumb.value + "/" + slct1.value + "/" + slct2.value;
   }else {
     oscAddr.value = "/Channels/" + slct0.value + "/" + chanNumbPrefix.value + "   " + chanNumb.value + "/" + slct1.value + "/" + slct2.value + "/" + slct3.value;
   }
  }else{
    chanNumbPrefixValid = chanNumbPrefix.value.includes("/");
    if ( chanNumbPrefixValid == true){
      chanNumbPrefix.value = (chanNumbPrefix.value).replace(/\//g,".")
    };
    oscAddr.value = "/" + (chanNumbPrefix.value).replace(/\./g,"/")
  }
}

function modifyOscAddr(event){
  var newOscAddr = document.getElementById("oscAddr").value;
  var table = document.getElementById("tableOfConnection");
  var x = table.rows.length;
  var rows = table.getElementsByTagName('tr');
    if (x > 2) {

    table.rows[rows.length -1].cells[4].innerHTML = newOscAddr;
    }
}

function SomeDeleteRowFunction(o) {
  var table = document.getElementById("tableOfConnection");
  if(typeof o == "number"){
    table.deleteRow(o)}
    else{
     //no clue what to put here?
     var p=o.parentNode.parentNode;
         p.parentNode.removeChild(p);
    }
}

function deleteAllRows(o) {
  var table = document.getElementById("tableOfConnection");
  var numOfConn = table.rows.length;
  for (var x=numOfConn-1; x>1; x--) {
    table.deleteRow(x);
 }
}

function sendConnection(o){
  var table = document.getElementById("tableOfConnection");
  if(typeof o == "number"){
    myRow = o}
    else{
  console.log("ooo",o.attributes)
    var p=o.parentNode.parentNode;
   myRow = p.rowIndex;}
    console.log(myRow);
    //sFactor = factor;
    var ePath = table.rows[myRow].cells[0].innerHTML;
    var oAddr = table.rows[myRow].cells[4].innerHTML;
    var eVarFactor = table.rows[myRow].cells[2].innerHTML;
    var eVarType = table.rows[myRow].cells[6].innerHTML;

    console.log("ePath",ePath);
    console.log("oAddr",oAddr);

    ipcRenderer.send('newConnection', ePath, oAddr, myRow, eVarType, eVarFactor);

}

function sendAllConnections(o){
  var table = document.getElementById("tableOfConnection");
  //var numOfConn = table.rows.length;
  for (let i = 2; i<table.rows.length; i++){
    setTimeout(() => {
    sendConnection(i);
  }, i*25);
  }
}

  function selectedOption(slct){
    var slct = document.getElementById(slct);
    if(slct.options[slct.selectedIndex].title !== ""){
      var details = slct.options[slct.selectedIndex].title;
      console.log("details of selected option: ",details);
      var detailsArray = details.split("\n");
      console.log("detailsArray;", detailsArray);
      eVarType = detailsArray[0];
      eVarMin = "true";
      eVarMax = "false";
      eVarFactor = "";
      if(detailsArray[0] !== "Boolean"){
        eVarMin = (detailsArray[1].split(":"))[1];
        eVarMax = (detailsArray[2].split(":"))[1];
        eVarFactor = (detailsArray[3].split(":"))[1]
      };
      if(detailsArray[4] !== "-"){

        eVarEnum = detailsArray[4];
      }else {
        eVarEnum = "";
      }

      console.log("eVarType:", eVarType, "eVarMin:", eVarMin, "eVarMax:", eVarMax, "eVarFactor:", eVarFactor, "eVarEnum:", eVarEnum);

    }
}

function advancedMode(e){
  e.preventDefault();
  console.log("switcher clicked", e);
  var switcher = document.getElementById("switcher");
  var hideOnAdvanced = document.getElementsByClassName("hideOnAdvanced");
  var stayOnAdvanced = document.getElementsByClassName("stayOnAdvanced");
  var slct0 = document.getElementById("slct0");
  var slct1 = document.getElementById("slct1");
  var eChanNumb = document.getElementById("eChanNumb");
  var eChanNumbPrefix = document.getElementById("eChanNumbPrefix");
  if(switcher.className == "toggle"){
  switcher.className = "toggle toggle-on";
  stayOnAdvanced[0].style.visibility = "visible";
  stayOnAdvanced[0].setAttribute('size',"");
  for(var i = 0; i < hideOnAdvanced.length; i++){
    hideOnAdvanced[i].style.visibility = "hidden";
    };
    slct0.required = false;
    slct1.required = false;
    eChanNumb.required = false;
    eChanNumbPrefix.value = "" 

  }else{
    switcher.className = "toggle";
    stayOnAdvanced[0].setAttribute('size',"3");
    for(var i = 0; i < hideOnAdvanced.length; i++){
      hideOnAdvanced[i].style.visibility = "visible";
      };
      slct0.required = true;
      slct1.required = true;
      eChanNumb.required = true;
      
  };
  

  //var c = switcher.children;
  //var i;
  //for (i = 0; i < c.length; i++) {
  //c[i].className = "toggle-on";
  //} 
}

//Menu Section//
function saveAs(saveAsBtn) {
  var sessionData = 
    {
      eServerProperties:{
        eServerIP : EmberServerIP,
        eServerPort : EmberServerPort
      },
      udpPort : localPort,
      oServerProperties:{
        oServerIP : OSCserverIP,
        oServerPort : OSCserverPort
      }
    };

  table = document.getElementById('tableOfConnection');
var data = [];

  // first row needs to be headers
  var headers = [];
  for (var i = 0; i<table.rows[1].cells.length; i++) {
     headers[i] = table.rows[1].cells[i].innerHTML.toLowerCase().replace(/ /gi,'');
  }

  // go through cells
  for (var i = 2; i<table.rows.length; i++) {

      var tableRow = table.rows[i];
      var rowData = {};

      for (var j=0; j<tableRow.cells.length; j=j+2) {

          rowData[ headers[j] ] = tableRow.cells[j].innerHTML;

      }

      data.push(rowData);
      
  }       
  data.unshift(sessionData)
  console.log("l'array json de la table",data);
 

  var content = JSON.stringify(data , null, 2) ;

ipcRenderer.send('sendSaveAs', content)
}

function save(saveBtn){
  
  
  var sessionData = 
  {
    eServerProperties:{
      eServerIP : EmberServerIP,
      eServerPort : EmberServerPort
    },
    udpPort : localPort,
    oServerProperties:{
      oServerIP : OSCserverIP,
      oServerPort : OSCserverPort
    }
  };

table = document.getElementById('tableOfConnection');
var data = [];

// first row needs to be headers
var headers = [];
for (var i = 0; i<table.rows[1].cells.length; i++) {
   headers[i] = table.rows[1].cells[i].innerHTML.toLowerCase().replace(/ /gi,'');
}

// go through cells
for (var i = 2; i<table.rows.length; i++) {

    var tableRow = table.rows[i];
    var rowData = {};

    for (var j=0; j<tableRow.cells.length; j=j+2) {

        rowData[ headers[j] ] = tableRow.cells[j].innerHTML;

    }

    data.push(rowData);
    
}       
data.unshift(sessionData)
console.log("l'array json de la table",data);


var content = JSON.stringify(data , null, 2) ;
var filename = document.getElementById("filepath").innerHTML;
//var filename = JSON.stringify(filename);
console.log("filepath value", filename);

ipcRenderer.send('sendSave', content, filename)
}

function load(loadBtn){
  
  ipcRenderer.send('openFile')
  var table = document.getElementById("tableOfConnection");
  var genBtn = table.rows[1].cells[5].innerHTML;
  if ( genBtn == ""){
  addGenBtns()
  }
}

function tableToJson(table) {
  var data = [];

  // first row needs to be headers
  var headers = [];
  for (var i = 0; i<table.rows[1].cells.length; i++) {
     headers[i] = table.rows[1].cells[i].innerHTML.toLowerCase().replace(/ /gi,'');
  }

  // go through cells
  for (var i = 2; i<table.rows.length; i++) {

      var tableRow = table.rows[i];
      var rowData = {};

      for (var j=0; j<tableRow.cells.length; j++) {

          rowData[ headers[j] ] = tableRow.cells[j].innerHTML;

      }
      
      
      data.push(rowData);
  }       

  console.log("lejson de la table",data);
  tableData = JSON.stringify(data, null, 2)
}



