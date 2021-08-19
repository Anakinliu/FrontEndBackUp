// 你不知道的JS 上卷 第138页
function Father() {
    this.age = 666;
}
Father.prototype.sayHi = function () {
    console.log('father,sayHi: age: ', this.age);
}

// 寄生类
function Son() {
    let s = new Father();
    s.len = 111;
    let fatherHi = s.sayHi;  // 保存引用
    s.sayHi = function () {  // 重写sayHi
        fatherHi.call(this);
        console.log('son,sayHi: len: ', this.len);
    }
    return s;
}

let s = new Son();
s.sayHi();


console.log(Son.__proto__ == Father.prototype);
console.log(Son.__proto__);
