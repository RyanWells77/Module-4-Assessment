const axios = require('axios')
let shipsList = []
console.log(shipsList)

module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];

        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];

        res.status(200).send(randomCompliment);
    },

    getFortune: (req, res) => {
        const fortunes = ["A lifetime friend shall soon be made.", "All your hard work will soon pay off.", "Chance favors those in motion.", "Don’t just think, act!", "The best prediction of future is the past."]

        let randomFortuneIndex = Math.floor(Math.random() * fortunes.length)
        let randomFortune = fortunes[randomFortuneIndex]

        res.status(200).send(randomFortune)
    },

    getShips: (req, res) => {
        axios.get("https://swapi.dev/api/starships/")
            .then(response => {
                // console.log("response", response.data)
                shipsList = response.data.results.map(ship => {
                    const { name,
                        model,
                        manufacturer,
                        cost_in_credits,
                        length,
                        max_atmosphering_speed,
                        crew, passengers,
                        cargo_capacity,
                        consumables,
                        hyperdrive_rating,
                        MGLT,
                        starship_class
                    } = ship
                    // console.log(ship)
                    return {
                        name,
                        model,
                        manufacturer,
                        cost_in_credits,
                        length,
                        max_atmosphering_speed,
                        crew,
                        passengers,
                        cargo_capacity,
                        consumables,
                        hyperdrive_rating,
                        MGLT,
                        starship_class
                    }
                })
                res.status(200).json(shipsList)
            })
            .catch(error => {
                res.status(500).send("Failed to get Ships.")
            })

    },

    getShipsList: (req, res) => {
        res.status(200).json(shipsList)
    },


    getShipDetails: (req, res) => {
        const { name } = req.params
        const ship = shipsList.find(ship => ship.name === name)
        if (!ship) {
            return res.status(404).json({ message: "Ship not found" })
        }
        delete ship.name
        res.status(200).json(ship)
    },

    //     shipDetails: (req, res) => {
    //         axios.get("https://swapi.dev/api/starships/")
    //             .then(response => {
    //                 const shipDetails = response.data.results.map(ship => ({ name, model, manufacturer, cost_in_credits, length } = response.data.results.map
    //                 const newShip = {
    //                     name: body.name,
    //                     model: body.model,
    //                     manufacturer: body.manufacturer,
    //                     cost_in_credits: cost_in_credits,
    //                 }))
    //         res.status(200).send("Getting Ships.")
    //     })
    //         .catch (error => {
    //     res.status(500).send("Failed to get Ships.")
    // })

    //     },

    // shipDetails: (req, res) => {
    //     const shipName = req.params.shipName
    // }

    addShip: (req, res) => {
        const { name, model, manufacturer, cost_in_credits, length, max_atmosphering_speed, crew, passengers, cargo_capacity, consumables, hyperdrive_rating, MGLT, starship_class } = req.body;
        const existingShip = shipsList.find(ship => ship.name === name)
        if (existingShip) {
            return res.status(400).send("Ship with name already exists.")
        }
        const newShip = {
            name: name,
            model: model,
            manufacturer: manufacturer,
            cost_in_credits: cost_in_credits,
            length: length,
            max_atmosphering_speed: max_atmosphering_speed,
            crew: crew,
            passengers: passengers,
            cargo_capacity: cargo_capacity,
            consumables: consumables,
            hyperdrive_rating: hyperdrive_rating,
            MGLT: MGLT,
            starship_class: starship_class
        }
        shipsList.push(newShip)

        res.status(200).send("")
    },

    deleteShip: (req, res) => {
        const { name } = req.params

        const index = shipsList.findIndex(ship => ship.name === name)
        if (index === -1) {
            res.status(400).send("id is not in data base.")
        }
        shipsList.splice(index, 1)
        res.status(200).send("Ship was deleted")
    }

}