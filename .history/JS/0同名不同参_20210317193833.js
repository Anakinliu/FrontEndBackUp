function fff (a,b) {
    console.log('fff 1');
}

// 后面的参数会覆盖前面的参数
function fff (a,b,c) {
    console.log('fff 2');
}

fff(1,2,3);
fff(1,2);