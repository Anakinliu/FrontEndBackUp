const testMath = require('./mymath');
const { add } = testMath;

test('测试加法 1+1 ', () => {
    expect(add(1, 1)).toBe(2);
})