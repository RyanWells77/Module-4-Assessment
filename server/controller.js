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
    
    addShip:  (req, res) => {
        const { name, model, manufacturer, cost_in_credits, length } = req.body;
        const newShip = {
            name: body.name,
            model: body.model,
            manufacturer: body.manufacturer,
            cost_in_credits: cost_in_credits,
            }
    
        console.log("New ship added:");
        console.log("Name:", name);
        console.log("Model:", model);
        console.log("Manufacturer:", manufacturer);
        console.log("Cost in credits:", cost_in_credits);
        console.log("Length:", length);
    
        res.status(200).send("")
    }

}