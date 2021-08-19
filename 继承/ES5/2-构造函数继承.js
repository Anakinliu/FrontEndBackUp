// 父类
function SuperType(name) {
    this.name = name; // 父类属性
}
SuperType.prototype.sayName = function () { // 父类原型方法
    return this.name;
};

// 子类
function SubType() {
    // 调用 SuperType 构造函数
    SuperType.call(this, 'SuperType'); // 在子类构造函数中，向父类构造函数传参
    // 为了保证子父类的构造函数不会重写子类的属性，需要在调用父类构造函数后，定义子类的属性
    this.subName = "SubType"; // 子类属性
};
// 子类实例
let instance = new SubType(); // 运行子类构造函数，并在子类构造函数中运行父类构造函数，this绑定到子类
console.log(instance.name);
console.log(instance instanceof SuperType);
console.log(instance.sayName());