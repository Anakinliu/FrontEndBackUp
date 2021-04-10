
// day6.js
let clickScroll = function() {
    let dBox = document.getElementById('d');
    if (dBox) {
        let left = dBox.offsetLeft;
        let navBox = document.getElementById('nav-box');
        if (navBox) {
           // clientWidth 元素的宽度
            navBox.scrollTo(navBox.clientWidth / 2 - dBox.clientWidth / 2 - 15, 0);
        }
    }
}