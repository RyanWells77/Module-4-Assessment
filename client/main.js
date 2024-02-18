const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")
const starWarsShipsBtn = document.getElementById("starWars-ships")
const starShipSubmitBtn = document.getElementById("starShip-button")
const starShipList = document.getElementById("Ship-list")
const starShipElement = document.createElement("div")
const shipForm = document.getElementById("shipForm")

const baseURL = ("http://localhost:4000/api")


const shipNameClick = (shipName, newStarShipElement) => {
    getShipDetails(shipName, newStarShipElement)
}
const deleteButtonClick = (starShip) => {
    deleteShip(starShip)
}

const shipList = () => {
    axios.get(`${baseURL}/getShips`)
        .then(response => {
            // console.log("response.data:", response.data)
            const ships = response.data
        })
}

const getShipsList = () => {
    starShipList.innerHTML = ""
    axios.get(`${baseURL}/getShipsList`)
        .then(response => {
            // console.log("response.data:", response.data)
            const ships = response.data
            // console.log("ships:", ships)
            ships.forEach(starShip => {
                const shipNameElement = document.createElement("h2")
                const newStarShipElement = document.createElement("div")
                const deleteBtn = document.createElement("button")


                shipNameElement.textContent = starShip.name
                shipNameElement.addEventListener('click', () => {
                    shipNameClick(starShip.name, newStarShipElement)
                })
                deleteBtn.textContent = "X"
                deleteBtn.addEventListener('click', () => {
                    deleteButtonClick(starShip)
                })

                shipNameElement.appendChild(deleteBtn)
                newStarShipElement.appendChild(shipNameElement)
                starShipList.appendChild(newStarShipElement)
            })
        })
        .catch(error => {
            console.error("Failed to get ship list.", error)
        })
}

const getShipDetails = (shipName, newStarShipElement) => {
    // console.log("Sending request for ship:", shipName)
    axios.get(`${baseURL}/getShipDetails/${encodeURIComponent(shipName)}`)
        .then(response => {
            // console.log("ship data", response.data)
            const shipDetailsElement = document.createElement("div")
            shipDetailsElement.classList.add("ship-details")

            for (const key in response.data) {
                if (response.data.hasOwnProperty(key)) {
                    const detailElement = document.createElement("p")
                    detailElement.textContent = `${key}: ${response.data[key]}`
                    shipDetailsElement.appendChild(detailElement)
                }
            }
            newStarShipElement.appendChild(shipDetailsElement)
        })
        .catch(error => {
            console.error("Failed to get details", error)
        })
}




const addShip = (event) => {
    event.preventDefault()

    const formData = new FormData(shipForm)
    const shipData = {}
    formData.forEach((value, key) => {
        shipData[key] = value
    })
    console.log("data sent:", shipData)

    axios.post(`${baseURL}/addShip`, shipData)
        .then(response => {
            console.log("Ship added", response.data)
            getShipsList()
        })
        .catch(error => {
            console.error("Failed to add ship", error)
        })
}

const deleteShip = starShip => {
    axios.delete(`${baseURL}/deleteShip/${encodeURIComponent(starShip.name)}`)
        .then(response => {
            console.log("Ship deleted successfully:", response.data);
            getShipsList();
        })
        .catch(error => {
            console.error("Failed to delete ship:", error);
        });
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


document.addEventListener('DOMContentLoaded', () => {
    shipList()
})

shipForm.addEventListener("submit", addShip)
starWarsShipsBtn.addEventListener("click", getShipsList)
fortuneBtn.addEventListener("click", getFortune)
complimentBtn.addEventListener('click', getCompliment)