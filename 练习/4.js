const map = {
    jack: { age: 18 },
    jobn: { age: 30 }
}
const arr = [map.john, map.jack];

// arr[1].age++;
// arr.filter(t => t.age++)
const t = arr[1];
t.age++;
console.log(map.jack.age);