// 面试也写不了太多, 简单,没有考虑边界条件的,例如bind后无法new:
Function.prototype.myBind = function (obj) {
    return (...args) => {
        return this.apply(obj, args)
    };
}

var age = 6;
function func(a, b) {
    console.log(this.age, a + b);
}

const theObj = {
    age: 999
}

const bindFunc = func.bind(theObj);
const bindFunc2 = func.myBind(theObj);
bindFunc(1, 2);
bindFunc2(1, 2);