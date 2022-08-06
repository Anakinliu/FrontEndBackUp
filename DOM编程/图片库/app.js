function showImg(aLinkEle) {
    const imgSrc = aLinkEle.getAttribute('href');
    imgEle.setAttribute('src', imgSrc);
}
const imgEle = document.getElementById('img');
