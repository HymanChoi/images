const { ipcMain, dialog } = require('electron')

// 绑定打开对话框事件
ipcMain.on('open-directory-dialog', (e, property) => {
    dialog.showOpenDialog({
        properties: [property]
    }).then(result => {
        e.sender.send('selectedItem', result.filePaths[0])
    }).catch(err => {
        console.log(err)
    })
});