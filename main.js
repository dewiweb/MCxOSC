const osc = require('osc')
const oUDPport = 0;
const oServerIP = "";
const lib = require('./mainFunctions')
const { EmberClient } = require('./emberLib')
const electron = require('electron')
const ipcMain = require('electron').ipcMain
const nativeTheme = electron.nativeTheme;
nativeTheme.themeSource = 'dark';
const { app, BrowserWindow } = require('electron');
const mainFunctions = require('./mainFunctions');
const { dialog } = require('electron')
const fs = require('fs');
const { openFile } = require('./mainFunctions');
const recOptions = {
  defaultPath: app.getPath('documents') + '/MySession.session',
}


function createWindow() {

    let win = new BrowserWindow({
    width: 1000,
    height: 900,
    webPreferences: {
      nodeIntegration: true
    },
    icon: `${__dirname}/assets/icons/64x64.png`
  })

  win.loadFile('index.html')

  //---Menu interactions Section---//

  ipcMain.on('sendSaveAs', function (event, content) {
    //console.log(content);
    filename = dialog.showSaveDialog(null, recOptions, {}
    ).then(result => {
      filename = result.filePath;
      if (filename === undefined) {
        console.log('the user clicked the btn but didn\'t created a file');
      }
      fs.writeFile(filename, content, (err) => {
        if (err) {
          console.log('an error ocurred with file creation ' + err.message);
        }
        console.log('WE CREATED YOUR FILE SUCCESFULLY');
        win.webContents.send('sendFilename', filename);
      })
    })
  })

  ipcMain.on('sendSave', function (event, content, rSfilename) {
    //console.log("sendsave filepath", rSfilename);
    //console.log("sendsave content", content);
    if (rSfilename === undefined) {
      console.log('the user clicked the btn but didn\'t created a file');
    }
    fs.writeFile(rSfilename, content, (err) => {
      if (err) {
        console.log('an error ocurred with file creation ' + err.message);
      }
      console.log('WE CREATED YOUR FILE SUCCESFULLY');
      //win.webContents.send('sendFilename', filename);
    })
  })

  ipcMain.on('openFile', function (event) {
    filename = dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] })
      .then(result => {
        filename = result.filePaths;
        //console.log(filename);
        const file = filename[0];
        //console.log(file);
        const content = fs.readFileSync(file, 'utf-8');
        //console.log(content);
        var sendedContent = JSON.stringify(content);
        //console.log('sendedContent:', sendedContent);
        win.webContents.send("sendFileContent", sendedContent)
        win.webContents.send('sendFilename', file)
      })
  })
  
  //---End of Menu Interactions Section---//
  /////////////////////////////////////////
  //---Network Settings Section---//

  //Setting local OSC UDP Port
  ipcMain.on('sendUDPport', function (event, oUDPport) {
    console.log('Port de reception OSC:', oUDPport);
    oscCli = new osc.UDPPort({
      localAddress: "0.0.0.0",
      localPort: Number(oUDPport),
      metadata: true
    })
    oscCli.open()
    win.webContents.send('udpportOK');
  })

  //Setting Remote Ember+ provider IP and Port
  ipcMain.on('sendEmberServerIP', function (event, arg) {
    eServerIP = arg;
    console.log('IP du server Ember+ distant:', arg);

    ipcMain.on('sendEmberServerPort', function (event, arg) {
      eserverPort = arg;
      console.log('Port du server Ember+ distant:', arg);

      //Initiating connection to Remote Ember+ provider
      c = new EmberClient(eServerIP, eserverPort);
      console.log("Connection au server Ember+:", eServerIP, ":", eserverPort, "initiated");

      async function main() {
        await c.connect()
        console.log("connection ok");

        win.webContents.send('eServerOK');
        await (await c.getDirectory(c.tree)).response

        //Setting Remote OSC Server IP and Port
        ipcMain.on('sendOSCserverIP', function (event, oServerIP) {
          console.log('IP du server OSC distant:', oServerIP);

          ipcMain.on('sendOSCserverPort', function (event, oServerPort) {
            console.log('Port du server OSC distant:', oServerPort);
            win.webContents.send('oServerOK');

  //---End of Network Settings Section---//
  ////////////////////////////////////////
  //---Connections Section---//          

            //Creating Ember+ subscription when connection "Go!" sends from Front-End
            ipcMain.on('newConnection', async function (event, ePath, oAddr, myRow, eVarType, sFactor, eMin, eMax, oMin, oMax, eVarCurve) {
              //console.log("sFactor", sFactor);
              sFactor = Number(sFactor);
              const req = await c.getElementByPath(ePath)
              c.subscribe(req, () => {
                var emberValue = req.contents.value;
                //console.log("emberValue", emberValue);

                event.sender.send('sendEmberValue', emberValue, myRow, 1);
                var stringEpath = JSON.stringify(ePath);
                //console.log("ePath", ePath);

                console.log("stringEpath", stringEpath);

                //Sending received values from Ember+ to OSC
                if (eVarType == "Integer" && eVarCurve == "lin") {
                  const value = mainFunctions.mapToScale(Number(emberValue), [Number(eMin), Number(eMax)], [Number(oMin), Number(oMax)], 2)
                  oscCli.send({
                    address: oAddr,
                    args: [
                      {
                        type: "f",
                        value: Number(value),
                      }
                    ]
                  }, oServerIP, oServerPort);
                  console.log('EMBER+ -lin-> OSC : ', value)
                 } else if (eVarType == "Integer" && eVarCurve == "log") {
                  const value = mainFunctions.mapToScale(Number(emberValue), [Number(eMin), Number(eMax)], [Number(oMin), Number(oMax)], 2, true)
                  oscCli.send({
                    address: oAddr,
                    args: [
                      {
                        type: "f",
                        value: Number(value),
                      }
                    ]
                  }, oServerIP, oServerPort);
                  console.log('EMBER+ -log-> OSC : ', value)
                }
                else if (eVarType == "Boolean" | evartype == "String") {

                  oscCli.send({
                    address: oAddr,
                    args: [
                      {
                        type: "s",
                        value: emberValue.toString(),
                      }
                    ]
                  }, oServerIP, oServerPort);
                  console.log('EMBER+ -bool-> OSC : ', emberValue)
                }
              })

              //Sending received values from OSC to Ember+
              oscCli.on("message", function (oscBundle) {
                console.log('oscBundle : ', oscBundle);
                const oRaddr = JSON.stringify(oscBundle.address);
                console.log("Adresse osc reçue", oRaddr);
                const oRargs = mainFunctions.oscToEmber(oscBundle);
                win.webContents.send('oReceivedAddr', oRaddr, oRargs);
              })
            })
            ipcMain.on('reSendOrArgs', async function (event, rOrArgs, rEaddr, sFactor, eVarType, oMin, oMax, eMin, eMax, eVarCurve) {
              const rereq = await c.getElementByPath(rEaddr);
              if (eVarType == "Integer" && eVarCurve == "lin") {
                const value = mainFunctions.mapToScale(Number(rOrArgs), [Number(eMin), Number(eMax)], [Number(oMin), Number(oMax)], 2)
                c.setValue((rereq), value.toFixed(0));
                console.log('OSC -lin-> EMBER+ : ', value.toFixed(0));
              } else if (eVarType == "Integer" && eVarCurve == "log") {
                const value = mainFunctions.mapToScale(Number(rOrArgs), [Number(eMin), Number(eMax)], [Number(oMin), Number(oMax)], 2, true, -1)
                c.setValue((rereq), value.toFixed(0));
                console.log('OSC -log-> EMBER+ : ', value.toFixed(0));
              } else {
                c.setValue((rereq), rOrArgs);
                console.log(("OSC -bool-> EMBER+", rOrArgs));
              }
            })
            ipcMain.on("deleteConnection", async function (event, ePath, oAddr, myRow, eVarType, sFactor) {
              const req = await c.getElementByPath(ePath)
              c.unsubscribe(req)
              console.log('unsuscribe to ', ePath);
            })
          })
        })
      }
      main()

    })
  })

  win.autoHideMenuBar = "true"
  win.menuBarVisible = "false"
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})