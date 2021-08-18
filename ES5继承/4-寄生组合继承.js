function Father() {
    this.age = 666;
}
Father.prototype.sayHi = function () {
    console.log('father ', this.age);
}

function Son() {
    this.len = 111;
}

Son.prototype = Object.create(Father.prototype);
Son.prototype.sayNo = function () {
    console.log('son', this.len);
}

console.log(Son.prototype.__proto__ == Father.prototype);
