const { remote } = require('electron');
let { dialog } = require('electron').remote;
let win = remote.getCurrentWindow()

clickBtn = type => {
    switch (type) {
        // 最小化
        case 'min':
            win.minimize();
            break;
        // 最大化
        case 'max':
            win.isMaximized() ? win.unmaximize() : win.maximize();
            break;
        // 关闭
        case 'close':
            win.close();
            break;
        // 打开图片
        case 'open':
            dialog.showOpenDialog({
                properties: ['openFile'],
                filters: [
                    { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
                ]
            }).then(res => {
                console.log(res.filePaths);
                if (res.canceled) return
                if (res.filePaths[0]) {
                    $('.tip').hide()
                    $('#img').attr('src', res.filePaths[0])
                }
            })
            break;
        // 移除图片
        case 'remove':
            $('#img').attr('src', '')
            $('.tip').show()
            break;
        // 保存图片
        case 'save':
            dialog.showSaveDialog({
                properties: ['openFile', 'openDirectory'],
                defaultPath: '/Users/hyman/Desktop/img.jpg'
            }).then(res => {
                console.log(res.canceled);
                console.log(res.filePath);
            }).catch(err => {
                console.log(err);
            })
            break;
        case 'crop':
            console.log('crop');
            break;
        case 'zoom':
            console.log('zoom');
            break;
        case 'flip':
            console.log('flip');
            break;
        case 'rotation':
            console.log('rotation');
            break;
        case 'color':
            console.log('color');
            break;
        case 'text':
            console.log('text');
            break;
        case 'icon':
            console.log('icon');
            break;
        case 'mosaic':
            console.log('mosaic');
            break;
    }
}

// 拖拽图片
document.getElementById('placeholder').addEventListener('drop', e => {
    e.preventDefault();
    e.stopPropagation();

    for (const f of e.dataTransfer.files) {
        // 限制上传类型
        if (f.type != 'image/jpeg' && f.type != 'image/png') {
            alert('只能上传图片文件')
            return
        }

        $('.tip').hide()
        $('#img').attr('src', f.path)
    }
});

document.getElementById('placeholder').addEventListener('dragover', e => {
    e.preventDefault();
    e.stopPropagation();
});

