// ! Elements
const regionsDiv = document.querySelector(".regions");
const villesDiv = document.querySelector(".villes");

// ! Request
let req = new XMLHttpRequest();
let link;
let regions;
let villes;
getRegions();

// ! Functions
function getRegions() {
    link = "https://raw.githubusercontent.com/mboussaid/Maroc_Regions_Villes_API/main/json/Regions.json";
    req.open("GET", link, true);
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            regions = JSON.parse(this.responseText);
            // console.log(regions);
            getVilles();
            regions.map(r => {
                let region = document.createElement("div");
                region.classList.add("region");
                region.textContent = r["region"];
                region.addEventListener("click", () => getVillesById(r["id"]));
                regionsDiv.appendChild(region);
            })
        }
    }
    req.send();
}

function getVilles() {
    link = "https://raw.githubusercontent.com/mboussaid/Maroc_Regions_Villes_API/main/json/Villes.json";
    req.open("GET", link, true);
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            villes = JSON.parse(this.responseText);
        }
    }
    req.send();
}

function getVillesById(id) {
    while (villesDiv.lastElementChild) {
        villesDiv.removeChild(villesDiv.lastElementChild);
    }
    villes.map(v => {
        if (v["region"] == id) {
            let ville = document.createElement("div");
            ville.classList.add("ville");
            ville.textContent = v["ville"];
            villesDiv.appendChild(ville);
        }
    })
}