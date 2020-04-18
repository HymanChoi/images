const { ipcRenderer } = require('electron')

// 按键类型
let btnType = "";
let imgPath = "";

// 按钮事件
btnClick = type => {
    this.btnType = type;
    switch (this.btnType) {
        // 选择
        case 'select':
            ipcRenderer.send('open-directory-dialog', 'openFile');
            ipcRenderer.once('selectedItem', this.getPath);
            break;

        // 转换
        case 'change':
            console.log('change');
        // 保存
        case 'save':
            ipcRenderer.send('open-directory-dialog', 'openDirectory');
            ipcRenderer.once('selectedItem', this.getPath);
            break;
    }
}

// 获取路径
getPath = (e, path) => {
    // 未选择文件
    if (path == null) {
        alert('请选择一个文件/文件夹');
    } else {
        switch (this.btnType) {
            // 选择
            case 'select':
                this.imgPath = path;
                $('#holder').hide()
                $('.img').show().attr('src', path)
                break;
            // 保存
            case 'save':
                console.log(path);
                alert("保存成功")
                break;
        }
    }
}

document.addEventListener('drop', e => {
    e.preventDefault();
    e.stopPropagation();

    console.log(e.dataTransfer.files);
    for (const f of e.dataTransfer.files) {
        console.log('File(s) you dragged here: ', f)
        // 限制上传类型
        if (f.type != 'image/jpeg' && f.type != 'image/png') {
            alert('只能上传图片文件')
            return
        }

        // 显示图片大小
        if (f.size > 2048000) {
            alert('图片大小不超过2M')
            return
        }

        // 显示上传图片
        $('#holder').hide()
        $('.img').show().attr('src', f.path)
    }
});

document.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
});