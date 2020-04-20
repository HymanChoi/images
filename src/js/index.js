const { ipcRenderer: ipc } = require('electron')

// 按键类型
let btnType = "";
let imgPath = "";

// 按钮事件
btnClick = type => {
    this.btnType = type;
    switch (this.btnType) {
        // 最小化窗口
        case 'min':
            ipc.send('min');
            break;
        // 关闭窗口
        case 'close':
            ipc.send('close');
            break;
        // 选择
        case 'select':
            ipc.send('open-directory-dialog', 'openFile');
            ipc.once('selectedItem', this.getPath);
            break;
        // 转换
        case 'change':
            console.log('change');
            break;
        // 保存
        case 'save':
            ipc.send('open-directory-dialog', 'openDirectory');
            ipc.once('selectedItem', this.getPath);
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

    for (const f of e.dataTransfer.files) {
        console.table(f)
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

// 菜单栏切换
$('.list>.list-item').on('click', function (e) {
    $(this).addClass('list-item_active');
    $(this).siblings().removeClass('list-item_active');
    $('.content').siblings().hide();
    switch (e.toElement.innerText) {
        case '介绍':
            $('.introduction').show();
            break;
        case '压缩':
            $('.compression').show();
            break;
        case '裁剪':
            $('.cutting').show();
            break;
        case '调色':
            $('.toning').show();
            break;
        case '旋转':
            $('.spin').show();
            break;
        case '水印':
            $('.watermark').show();
            break;
        case '其他':
            $('.other').show();
            break;
    }
})