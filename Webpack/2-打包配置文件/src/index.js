import data from "./data.json"


console.log(data);

let div = document.querySelector("#game");
console.log(div);
div.style.color = 'red';
for (let d in data) {
    let newP = document.createElement("p");
    newP.appendChild(document.createTextNode(`${d} - ${data[d]}`));
    div.appendChild(newP);
}

