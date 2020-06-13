const osc = require ('osc')
const oUDPport = 0 ;
const oServerIP = "";
const lib = require('./mainFunctions')
const { EmberClient } = require('/home/dewi/tv-automation-emberplus-connection-0.0.2/dist')
const electron = require('electron')
const ipcMain = require('electron').ipcMain
const nativeTheme = electron.nativeTheme;
      nativeTheme.themeSource = 'dark';
const { app, BrowserWindow } = require('electron')


function createWindow () {

  // Cree la fenetre du navigateur.
  let win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
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
            ipcMain.on('newConnection', async function(event, ePath, oAddr, myRow){
              const req = await c.getElementByPath(ePath)
              c.subscribe(req, () => {
                var emberValue = req.contents.value;
                console.log("emberValue", emberValue);

                event.sender.send('sendEmberValue', emberValue, myRow, 1);
                var stringEpath = JSON.stringify(ePath);
                console.log("ePath", ePath);

                console.log("stringEpath", stringEpath);

                faderOrNot = stringEpath.includes("Prout");
                panOrNot = stringEpath.includes("Left-Right Panning");
                if(faderOrNot = true){
                  console.log("faderOrNot", faderOrNot);

                  oscCli.send({
                    address: oAddr,
                    args: [
                      {
                        type: "f",
                        value: Number(req.contents.value)/32,
                      }
                          ]
                              },  oServerIP, oServerPort);

           console.log('EMBER+ --> OSC : ', req.contents.value)

          }else if (panOrNot = true) {
            console.log("panOrNot", panOrNot);

            oscCli.send({
                  address: oAddr,
                  args: [
                     {
                       type: "f",
                       value: Number(req.contents.value),
                     }
                        ]
                        },  oServerIP, oServerPort);
                        console.log('EMBER+ --> OSC : ', req.contents.value)
                      }
                    })
                  })
                })
              })
            }
      main()

    })
  })
//end of create window
 }

// Cette méthode sera appelée quant Electron aura fini
// de s'initialiser et prêt à créer des fenêtres de navigation.
// Certaines APIs peuvent être utilisées uniquement quand cet événement est émit.
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

// Dans ce fichier, vous pouvez inclure le reste de votre code spécifique au processus principal. Vous pouvez également le mettre dans des fichiers séparés et les inclure ici.
