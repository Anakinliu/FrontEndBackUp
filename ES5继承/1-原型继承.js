// 父类
function SuperType() {
    this.name = 'SuperType'; // 父类属性
}
SuperType.prototype.sayName = function () { // 父类原型方法
    return this.name;
};

// 子类
function SubType() {
    this.subName = "SubType"; // 子类属性
};

SubType.prototype = new SuperType(); // 重写原型对象，代之以一个新类型的实例
// 这里实例化一个 SuperType 时， 实际上执行了两步
// 1，新创建的对象复制了父类构造函数内的所有属性及方法
// 2，并将原型 __proto__ 指向了父类的原型对象

SubType.prototype.saySubName = function () { // 子类原型方法
    return this.subName;
}

// 子类实例
let instance = new SubType();

console.log(instance.__proto == (new SuperType).__proto__.prototype);

// instanceof 通过判断对象的 prototype 链来确定对象是否是某个类的实例
instance instanceof SubType; // true
instance instanceof SuperType; // true

// 注意这里
SubType instanceof SuperType; // false
SubType.prototype instanceof SuperType; // true

