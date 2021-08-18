// 父类
function SuperType(name) {
    this.colors = ["red", "blue", "green"];
    this.name = name; // 父类属性
}
SuperType.prototype.sayName = function () { // 父类原型方法
    return this.name;
};

// 子类
function SubType(name, subName) {
    // 调用 SuperType 构造函数
    SuperType.call(this, name); // ----第二次调用 SuperType----
    this.subName = subName;
};

// ----第一次调用 SuperType----
SubType.prototype = new SuperType(); // 重写原型对象，代之以一个新类型的实例

SubType.prototype.constructor = SubType; // 组合继承需要修复构造函数指向
SubType.prototype.saySubName = function () { // 子类原型方法
    return this.subName;
}

console.log(SubType.prototype.__proto__ == (new SuperType()).__proto__);
console.log(SubType.prototype.__proto__ == SuperType.__proto__);  // false