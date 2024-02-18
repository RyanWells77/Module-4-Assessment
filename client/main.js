const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")
const starWarsShipsBtn = document.getElementById("starWars-ships")
const starShipSubmitBtn = document.getElementById("starShip-button")
const starShipList = document.getElementById("Ship-list")
const starShipElement = document.createElement("div")
const shipForm = document.getElementById("shipForm")
// const shipList = document.getElementById("shipList")
const baseURL = ("http://localhost:4000/api")

const deleteShip = id => axios.delete(`${baseURL}/${id}`).then().catch(errCallback)


const displayStarships = (starships) => {
    starShipList.innerHTML = ""

    starships.forEach(starship => {
        const shipNameElement = document.createElement("h2")
        const newStarShipElement = document.createElement("div")

        shipNameElement.textContent = starship.name
        shipNameElement.addEventListener('click', () => {
            shipDetails(`${baseURL}/getShips`, newStarShipElement)
        })
        newStarShipElement.appendChild(shipNameElement)
        starShipList.appendChild(newStarShipElement)
    })
}

const shipList = () => {
    axios.get(`${baseURL}/getShips`)
        .then(response => {
            console.log("response.data:", response.data)
            const ships = response.data
            console.log("ships:", ships)
            ships.forEach(starShip => {
                const shipNameElement = document.createElement("h2")
                const newStarShipElement = document.createElement("div")

                shipNameElement.textContent = starShip.name
                shipNameElement.addEventListener('click', () => {
                    shipDetails(`${baseURL}/getShips/${starShip.name}`, newStarShipElement)
                })
                newStarShipElement.appendChild(shipNameElement)
                starShipList.appendChild(newStarShipElement)
            })
        })
}


const shipDetails = (url, starShipElement) => {
    axios.get()
        .then(res => {
            const shipDetails = res.data
            const moreShipDetails = document.createElement("div")
            const shipAdditonalDetailsLs = document.createElement("ul")

            for (const [key, value] of Object.entries(shipDetails)) {
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

const addShip = (event) => {
    event.preventDefault()

    const formData = new FormData(shipForm)
    const shipData = {}
    formData.forEach((value, key) => {
        shipData[key] = value
    })
}



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

shipForm.addEventListener("submit", addShip)
starWarsShipsBtn.addEventListener("click", shipList)
// starWarsShipsBtn.addEventListener("click", () => {
//     axios.get(`${baseURL}/getShips`)
//         .then(res => {
//             const starships = res.data.results;
//             displayStarships(starships);
//         })
//         .catch(error => {
//             console.log("Error fetching ships.", error)
//         })
// })
fortuneBtn.addEventListener("click", getFortune)
complimentBtn.addEventListener('click', getCompliment)