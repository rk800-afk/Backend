const { createFilter } = require('./filter');
const { Car } = require('../../../db/models');

module.exports.getCars = async (req, res) => {
    try {
        const filter = createFilter(req)
        const fetchCars = await Car.find(filter)
        if (!fetchCars) res.status(404).json({ message: "Not Found Car(s)" })
        res.status(200).send({ cars: fetchCars })
    } catch (error) {
        console.log(error?.message);
    }
};