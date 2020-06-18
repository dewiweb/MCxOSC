const osc = require ('osc')
const oUDPport = 0 ;
const oServerIP = "";
const lib = require('./mainFunctions')
const { EmberClient } = require('./emberLib')
const electron = require('electron')
const ipcMain = require('electron').ipcMain
const nativeTheme = electron.nativeTheme;
      nativeTheme.themeSource = 'dark';
const { app, BrowserWindow } = require('electron');
const mainFunctions = require('./mainFunctions');


function createWindow () {

  // Cree la fenetre du navigateur.
  let win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    },
    icon: `${__dirname}/assets/icons/64x64.png`
  })

  // et charger le fichier index.html de l'application.
  win.loadFile('index.html')

  // Ouvre les DevTools.
  //win = null

  //Setup du port UDP de reception OSC
  ipcMain.on('sendUDPport', function(event, oUDPport) {
      console.log('Port de reception OSC:', oUDPport);
       oscCli = new osc.UDPPort({
          localAddress: "0.0.0.0",
          localPort: Number(oUDPport),
          metadata: true
      })
      oscCli.open()
      win.webContents.send('udpportOK');
  })

  //Setup  IP:Port du serveur ember+ distant
  ipcMain.on('sendEmberServerIP', function(event, arg) {
      eServerIP = arg;
      console.log('IP du server Ember+ distant:', arg);

      ipcMain.on('sendEmberServerPort', function(event, arg) {
        eserverPort = arg;
        console.log('Port du server Ember+ distant:', arg);

  //initiation de la connection
       c = new EmberClient(eServerIP, eserverPort);
       console.log("Connection au server Ember+:", eServerIP, ":", eserverPort, "initiated");

       async function main() {
      	await c.connect()
        console.log("connection ok");

        win.webContents.send('eServerOK');      
      	await (await c.getDirectory(c.tree)).response

        //Setup IP:Port du serveur OSC distant
        ipcMain.on('sendOSCserverIP', function(event, oServerIP) {
          console.log('IP du server OSC distant:', oServerIP);

          ipcMain.on('sendOSCserverPort', function(event, oServerPort) {
            console.log('Port du server OSC distant:', oServerPort);
            win.webContents.send('oServerOK');

            //Create ember+ subscription when connection send
            ipcMain.on('newConnection', async function(event, ePath, oAddr, myRow, eVarType, sFactor){
              console.log("sFactor",sFactor);
              sFactor= Number(sFactor);
              const req = await c.getElementByPath(ePath)
              c.subscribe(req, () => {
                var emberValue = req.contents.value;
                console.log("emberValue", emberValue);

                event.sender.send('sendEmberValue', emberValue, myRow, 1);
                var stringEpath = JSON.stringify(ePath);
                console.log("ePath", ePath);

                console.log("stringEpath", stringEpath);

               // faderOrNot = stringEpath.includes("Fader");
               // panOrNot = stringEpath.includes("Panning");
               // booleanOrNot = stringEpath.includes("Mute")||stringEpath.includes("On")||stringEpath.includes("States");
                if(eVarType == "Integer"){
                 // console.log("fader", faderOrNot);

                  oscCli.send({
                    address: oAddr,
                    args: [
                      {
                        type: "f",
                        value: Number(req.contents.value)/Number(sFactor),
                      }
                          ]
                              },  oServerIP, oServerPort);

           console.log('EMBER+ --> OSC : ', req.contents.value)

          }else if (eVarType == "Boolean") {
            
                        oscCli.send({
                          address: oAddr,
                        args: [
                          {
                            type: "s",
                            value: req.contents.value.toString(),
                          }
                        ]                        }, oServerIP, oServerPort);
                        console.log('EMBER+ --> OSC : ', req.contents.value)

                      }
                    })
                    oscCli.on("message", function (oscBundle) {

                      console.log('oscBundle : ', oscBundle);
                      const oRaddr = JSON.stringify(oscBundle.address);
                      console.log("Adresse osc reçue",oRaddr);           
                      const oRargs = mainFunctions.oscToEmber(oscBundle);
                       win.webContents.send('oReceivedAddr', oRaddr, oRargs);
                       
                        
                  })
                    
                  })
                  ipcMain.on('reSendOrArgs', async function(event, rOrArgs, rEaddr, sFactor){
                    const rereq = await c.getElementByPath(rEaddr);
                    sFactor = Number(sFactor);
                   c.setValue((rereq), (rOrArgs*sFactor).toFixed(0));
         
                   console.log('OSC --> EMBER+ : ', (rOrArgs*sFactor).toFixed(0));
                  })
                })
              })
            }
      main()

    })
  })
//end of create window
 }


app.whenReady().then(createWindow)
//console.log('voilà cest pret')
// Quitter si toutes les fenêtres ont été fermées.
app.on('window-all-closed', () => {
  // Sur macOS, il est commun pour une application et leur barre de menu
  // de rester active tant que l'utilisateur ne quitte pas explicitement avec Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // Sur macOS, il est commun de re-créer une fenêtre de l'application quand
  // l'icône du dock est cliquée et qu'il n'y a pas d'autres fenêtres d'ouvertes.
  if (win === null) {
    createWindow()
  }
})

