let response, data;

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
    section.innerHTML = ""; 
    const region = document.getElementById('regions').value;

    const filteredData = data.filter(country => {
        return region === "" || country.region === region;
    });

    for (let i = 0; i < filteredData.length; i++) {
        let s = document.createElement("div");
        s.setAttribute("class", "project");
        createGrid(s, filteredData[i]);
        section.appendChild(s);
    }
}

async function get(request) {
    try {
        response = await fetch("./data.json", request);
        data = await response.json();
        parse(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

document.getElementById('regions').addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    const request = {
        method: 'GET',
        headers: {
            'Region': selectedValue
        }
    };
    get(request);
});
get({ method: 'GET' });

document.getElementsByClassName('search_input').addEventListener(onblur, (event) => {
   const searchKey = event.target.value;
    const request = {
        method: 'GET',
        headers: {
            'name': searchKey
        }
    };
   get(request);
});

