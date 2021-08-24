setTimeout(function () {
    console.log('setTime');
}, 0)
console.log('hello');
Promise.resolve().then(function(){
    console.log('p1');
}).then(function () {
    console.log('p2');
})
console.log('end');