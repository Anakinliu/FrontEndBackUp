window.onload = function() {
    let box = document.getElementById("box");
    let imgs = box.querySelectorAll("img");
    console.log(imgs);
    // 单张图片的宽度
    let imgWidth = imgs[0].offsetWidth;  //图片加上border

    // 设置露出的宽度
    var exposeWidth = 150;

    // 设置容器总宽度
    let boxWidth = imgWidth + (imgs.length - 1) * exposeWidth;
    console.log(boxWidth);
    box.style.width = boxWidth + 'px';

    //每个图片初始位置
    const resetImgsPos = () => {
        for (let i=1; i < imgs.length; i++) {
            imgs[i].style.left = imgWidth + exposeWidth * (i-1) + 'px';
        }
    }
    resetImgsPos();

    // 计算每道门打开时移动的距离
    let translate = imgWidth - exposeWidth;

    for (let i=0; i < imgs.length; i++) {
        imgs[i].onmouseover = function() {
            resetImgsPos();
            // 打开门
            for (let j=0; j <= i; j++) {
                imgs[j].style.left = parseInt(imgs[j].style.left, 10) - translate + 'px';
            }
        }
    }

}