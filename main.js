let response, data;

const section = document.getElementsByClassName("section")[0];
let isDarkMode = localStorage.getItem('isDarkMode') === 'true';
function printList(array) {
    let content = ``;
    for (let i = 0; i < array.length; i++) {
        content += array[i].name;
        if (i + 1 < array.length)
            content += ",";
    }
    return content;
}
function togglemode(element) {
    localStorage.setItem('isDarkMode', `${isDarkMode}`);
    let txt;
    if (localStorage.getItem('isDarkMode')===`true`) {
        txt = "&#x263C;Light mode";
        element.classList.add("darkmode");
    }
    else {   
        txt = "&#x263D;Dark mode";
        element.classList.remove("darkmode");
    }
    element.querySelector(".toggleBtn").innerHTML = txt;
}

function addToNewTab(countryData) {
    let content = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${countryData.name}</title>
        <link rel="stylesheet" href="./style.css" />
    </head>
    <body class="newtabbody">

        <header class="newheader">
            <div class="mytitle">Where in the world?</div>
            <button class="toggleBtn" type="button">&#x263D;Dark mode</button>
        </header>

        <button class="Backbtn" onclick="https://ahmed-haz.github.io/FrontEnd._Project/" title="back to homepage">&larr; Back</button>
        
        <section class="content">
            <div class="media">
                <img class="image" src="${countryData.flags.png}" alt="${countryData.name}" />
            </div>
        <div class="info">
                <h1>${countryData.name}</h1>
                <div class="flexData">
            <div class="liftData">
                <p class="data"><strong>Native Name:</strong> ${countryData.nativeName}</p>
                <p class="data"><strong>Population:</strong> ${countryData.population}</p>
                <p class="data"><strong>Region:</strong> ${countryData.region}</p>
                <p class="data"><strong>Sub Region:</strong> ${countryData.subregion}</p>
                <p class="data"><strong>Capital:</strong> ${countryData.capital}</p>
                </div>
            <div class="rightData">
                <p class="data"><strong>Top Level Domain:</strong> ${countryData.topLevelDomain}</p>
                <p class="data"><strong>Currencies:</strong>${printList(countryData.currencies)} </p>
                <p class="data"><strong>Languages:</strong>${ printList(countryData.languages)}</p>
            </div>
        </div>
                ${('borders' in countryData)? `
        <div class="borders">
            <div>
                <h2 class="bordertitle">Borders:</h2>
            </div>
                    <div class="bordercountries">
        `:""}
           </div>
                </div>
            </div>
        </section>
    </body>
</html> `;

    const newTab = window.open();
    newTab.document.write(content);
    newTab.document.close();

    if ('borders' in countryData) {
        const filteredData = data.filter(country => {
            return countryData.borders.includes(country.alpha3Code);
        });

        const countries = newTab.document.getElementsByClassName("bordercountries")[0];
        for (let i = 0; i < filteredData.length; i++) {
            let p = newTab.document.createElement('p');
            p.innerText = filteredData[i].name;
            countries.appendChild(p);
            p.addEventListener("click", () => {
                addToNewTab(filteredData[i]);
            });
        }
    }
    togglemode(newTab.document.body);
    newTab.document.querySelector(".toggleBtn").addEventListener("click",()=>{
        isDarkMode=!isDarkMode;
        togglemode(newTab.document.body)}
    );
  
}


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
    s.addEventListener("click", () => {
        addToNewTab(data);
    });
}

function parse(data) {
    togglemode(document.body);
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


document.querySelector(".toggleBtn").addEventListener("click",()=>{
    isDarkMode=!isDarkMode;
    togglemode(document.body);
}
);