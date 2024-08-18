let response, data;
let divs = [];
const section = document.getElementsByClassName("section")[0];

function createImg(s, data) {
    let img = document.createElement("img");
    img.setAttribute("src", data.flags.png);
    img.setAttribute("alt", data.name);
    s.appendChild(img);
}

function createText(s, data) {
    let txt = document.createElement("h3");
    txt.innerText = data.name;
    s.appendChild(txt);

    let population = document.createElement("p");
    population.innerText = `Population: ${data.population}`;
    s.appendChild(population);

    let region = document.createElement("p");
    region.innerText = `Region: ${data.region}`;
    s.appendChild(region);

    let capital = document.createElement("p");
    capital.innerText = `Capital: ${data.capital}`;
    s.appendChild(capital);
}

function createGrid(s, data) {
    createImg(s, data);
    createText(s, data);
}

function parse(data) {
    for (let i = 0; i < data.length; i++) {
        let s = document.createElement("div");
        s.setAttribute("class", "project");
        createGrid(s, data[i]);
        divs.push(s);
        section.appendChild(s);
    }
}

async function get() {
    response = await fetch("./data.json");
    data = await response.json();
    parse(data);
}
get();

 


