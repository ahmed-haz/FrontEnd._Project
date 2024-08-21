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

function addToNewTab(countryData) {
    let content = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${countryData.name}</title>
    </head>
    <body>
        <h1>${countryData.name}</h1>
        <img src="${countryData.flags.png}" alt="${countryData.name}" />
        <p><strong>Population:</strong> ${countryData.population}</p>
        <p><strong>Region:</strong> ${countryData.region}</p>
        <p><strong>Capital:</strong> ${countryData.capital}</p>
    `;
    if (countryData.independent) {
        content += `<h2>Borders:</h2>`
        const filteredData = data.filter(country => {
            return countryData.borders.includes(country.alpha3Code);
        });


        for (let i = 0; i < filteredData.length; i++) {
            content += `<p>${filteredData[i].name}</p>`;
        }
    }

    content += `</body>
    </html>`;

    const newTab = window.open();
    newTab.document.write(content);
    newTab.document.close();
}

function createGrid(s, data) {
    createImg(s, data);
    createText(s, data);
    s.addEventListener("click", () => {
        addToNewTab(data);
    });
}

function parse(data) {
    section.innerHTML = "";
    const region = document.getElementById('regions').value;
    const srch = document.getElementById('search').value.toLowerCase();
    const filteredData = data.filter(country => {
        return (region === "" || country.region === region) &&
            (country.name.toLowerCase().includes(srch) || srch === "");
    });

    for (let i = 0; i < filteredData.length; i++) {
        let s = document.createElement("div");
        s.setAttribute("class", "country");
        createGrid(s, filteredData[i]);
        section.appendChild(s);
    }
}

async function get() {
    try {
        response = await fetch("./data.json");
        data = await response.json();
        parse(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

document.getElementById('regions').addEventListener('change', (event) => {
    parse(data);
});

document.getElementById('search').addEventListener('input', (event) => {
    parse(data);
});

get();