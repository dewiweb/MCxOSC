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
    eChanNumbPrefix.value = "SUM"
  }
}

function displayForm2 (event){
  const form2 = document.getElementById('form2');
  const add2 = document.getElementById('add2');
  var localPort = document.getElementById("localPort").value;

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

  add3.textContent = "OK!  Address : " + data1 + "   /   Port : " + port2;
   ipcRenderer.send('sendOSCserverIP', data1 );
   ipcRenderer.send('sendOSCserverPort', Number(port2));
      event.preventDefault();
    }

function submitEmberPath (event){
      var btnDel = document.createElement("BUTTON");
      var btnGo = document.createElement("BUTTON");
      var oscAddr = document.getElementById("oscAddr").value;
      var slct0 = document.getElementById("slct0").value;
      var chanNumbPrefix = document.getElementById("eChanNumbPrefix").value;
      var chanNumb = document.getElementById("eChanNumb").value;
      var slct1 = document.getElementById("slct1").value;
      var slct2 = document.getElementById("slct2").value;
      var slct3 = document.getElementById("slct3").value;
      var emBerPath = "";
      if (slct3 == ""){
        emBerPath = "Channels." + slct0 + "." + chanNumbPrefix + "   " + chanNumb + "." + slct1 + "." + slct2;
      }else {
        emBerPath = "Channels." + slct0 + "." + chanNumbPrefix + "   " + chanNumb + "." + slct1 + "." + slct2 + "." + slct3;
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
      cell1.innerHTML = emBerPath;
      cell2.innerHTML = "----";
      cell3.innerHTML = "&harr;";
      cell4.innerHTML = "----";
      cell5.innerHTML = oscAddr;
      cell6.appendChild(btnGo);
      cell6.appendChild(btnDel);
      event.preventDefault();

    }

function populate(s1,s2,s3){

    	var s1 = document.getElementById(s1);
    	var s2 = document.getElementById(s2);
      var s3 = document.getElementById(s3);



    //  s2.hasChildNodes()
    	s2.innerHTML = "";


        //s2.innerHTML = null;
       if(s1.value == "Channel States"){
    		var optionArray = ["|----||","Stereo|Stereo|Boolean|"];
    	} else if(s1.value == "Mute" &&  s1.length == 6){
    		var optionArray = ["|----||","Mute|Mute|Boolean|"];
    	} else if(s1.value == "Fader"){
  		  var optionArray = ["|----||","Fader Level|Fader Level|Integer \nmin(-4096) \nmax(480) \nfactor(32)|"];
      } else if(s1.value == "Pan"){
        var optionArray = [
          "|Pan parameters||",
          "Left-Right Panning|Left-Right Panning|Integer \nmin(-20) \nmax(20)|",
          "Front-Back Panning|Front-Back Panning|Integer \nmin(-20) \nmax(20)|",
          "Up-Down Panning|Up-Down Panning|Integer \nmin(-20) \nmax(20)|",
          "Pan Slope|Pan Slope|Integer \nmin(-20) \nmax(20)|",
        ];
    	}else if (s1.value == "Signal Processing") {
        var optionArray = [
          "|----||",
           "Input Mixer|Input Mixer||",
            "Equalizer|Equalizer||",
            "Compressor|Compressor||",
          ]
      }else if(s1.value == "Input Mixer"){
    		var optionArray = ["|----||","Input Gain|Input Gain|Integer \nmin(-4096) \nmax(2560) \nfactor(32)|"];
    	}else if(s1.value == "Equalizer"){
    		var optionArray = ["|----||",
        "Equalizer 1 Gain|Equalizer 1 Gain|Integer \nmin(-768) \nmax(768) \nfactor(32)|",
        "Equalizer 1 Frequency|Equalizer 1 Frequency|Integer \nmin(2131) \nmax(7045)|",
        "Equalizer 1 Q|Equalizer 1 Q|Integer \nmin(6) \nmax(5120) \nfactor(64)|",
        "Equalizer 1 On|Equalizer 1 On|Boolean|",
        "Equalizer 1 Slope|Equalizer 1 Slope|Integer \nmin(0) \nmax(2)|\n6dB/oct0\n12dB/oct1\n18dB/oct2",
        "Equalizer 1 Type|Equalizer 1 Type|Integer \nmin(1)\nmax(5)|\nBell    1\nHi Pass 2\nLo Shelv5",
        "Equalizer 2 Gain|Equalizer 2 Gain|Integer \nmin(-768) \nmax(768) \nfactor(32)|",
        "Equalizer 2 Frequency|Equalizer 2 Frequency|Integer \nmin(2131) \nmax(7045)|",
        "Equalizer 2 Q|Equalizer 2 Q|Integer \nmin(6) \nmax(5120) \nfactor(64)|",
        "Equalizer 2 On|Equalizer 2 On|Boolean|",
        "Equalizer 2 Slope|Equalizer 2 Slope|Integer \nmin(0) \nmax(2)|\n6dB/oct0\n12dB/oct1\n18dB/oct2",
        "Equalizer 2 Type|Equalizer 2 Type|Integer \nmin(1)\nmax(5)|\nBell    1\nHi Pass 2\nLo Shelv5",
        "Equalizer 3 Gain|Equalizer 3 Gain|Integer \nmin(-768) \nmax(768) \nfactor(32)|",
        "Equalizer 3 Frequency|Equalizer 3 Frequency|Integer \nmin(2131) \nmax(7045)|",
        "Equalizer 3 Q|Equalizer 3 Q|Integer \nmin(6) \nmax(5120) \nfactor(64)|",
        "Equalizer 3 On|Equalizer 3 On|Boolean|",
        "Equalizer 3 Slope|Equalizer 3 Slope|Integer \nmin(0) \nmax(2)|\n6dB/oct0\n12dB/oct1\n18dB/oct2",
        "Equalizer 3 Type|Equalizer 2 Type|Integer \nmin(1)\nmax(5)|\nBell    1\nHi Pass 2\nLo Shelv5",
        "Equalizer 4 Gain|Equalizer 4 Gain|Integer \nmin(-768) \nmax(768) \nfactor(32)|",
        "Equalizer 4 Frequency|Equalizer 4 Frequency|Integer \nmin(2131) \nmax(7045)|",
        "Equalizer 4 Q|Equalizer 4 Q|Integer \nmin(6) \nmax(5120) \nfactor(64)|",
        "Equalizer 4 On|Equalizer 4 On|Boolean|",
        "Equalizer 4 Slope|Equalizer 4 Slope|Integer \nmin(0) \nmax(2)|\n6dB/oct0\n12dB/oct1\n18dB/oct2",
        "Equalizer 4 Type|Equalizer 4 Type|Integer \nmin(1)\nmax(5)|\nBell    1\nHi Pass 2\nLo Shelv5",
      ];
      }
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
        newOption.title = "Type: " + pair[2] + pair[3];
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

   if (slct3.value == ""){
     oscAddr.value = "/Channels/" + slct0.value + "/" + chanNumbPrefix.value + "   " + chanNumb.value + "/" + slct1.value + "/" + slct2.value;
   }else {
     oscAddr.value = "/Channels/" + slct0.value + "/" + chanNumbPrefix.value + "   " + chanNumb.value + "/" + slct1.value + "/" + slct2.value + "/" + slct3.value;
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
     //no clue what to put here?
     var p=o.parentNode.parentNode;
         p.parentNode.removeChild(p);
    }

function sendConnection(o){
    var table = document.getElementById("tableOfConnection");
    var p=o.parentNode.parentNode;
    var myRow = p.rowIndex;
    console.log(myRow);
    var ePath = table.rows[myRow].cells[0].innerHTML;
    var oAddr = table.rows[myRow].cells[4].innerHTML;
    console.log("ePath",ePath);
    console.log("oAddr",oAddr);

    ipcRenderer.send('newConnection', ePath, oAddr, myRow);

  }
