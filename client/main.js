const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")
const starWarsShipsBtn = document.getElementById("starWars-ships")
const starShipSubmitBtn = document.getElementById("starShip-button")
const starShipList = document.getElementById("Ship-list")
const starShipElement = document.createElement("div")


const displayStarships = (starships) => {
    starShipList.innerHTML = ""

    starships.forEach(starship => {
        const shipNameElement = document.createElement("h2")
        const newStarShipElement = document.createElement("div")

        shipNameElement.textContent = starship.name
        shipNameElement.addEventListener('click', () => {
            shipDetails(starship.url, newStarShipElement)
        })
        newStarShipElement.appendChild(shipNameElement)
        starShipList.appendChild(newStarShipElement)
    })
}


const shipDetails = (url, starShipElement) => {
    axios.get(url)
    .then(res => {
        const shipDetails = res.data
        const moreShipDetails = document.createElement("div")
        const shipAdditonalDetailsLs = document.createElement("ul")
        
        for(const [key, value] of Object.entries(shipDetails)){
            const detailItems = document.createElement("li")
            detailItems.textContent = `${key}: ${value}`
            shipAdditonalDetailsLs.appendChild(detailItems)
        }
        moreShipDetails.appendChild(shipAdditonalDetailsLs)
        starShipElement.appendChild(moreShipDetails)
    })
    .catch(error => {
        console.log("Error cant getting details", error)
    })
}

starWarsShipsBtn.addEventListener("click", () => {
    axios.get("https://swapi.dev/api/starships/")
        .then(res => {
            const starships = res.data.results;
            displayStarships(starships);
        })
        .catch(error => {
            console.log("Error fetching ships", error)
        })
})

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
        });
};

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune")
        .then(res => {
            const data = res.data
            alert(data)
        })
}

fortuneBtn.addEventListener("click", getFortune)
complimentBtn.addEventListener('click', getCompliment)