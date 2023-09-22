const fs = require("fs")

const tours = JSON.parse(
    fs.readFileSync(
        `${__dirname}/../dev-data/data/tours-simple.json`
    )
)

const checkId = (req, res, next, val) => {
    const tour = tours.find(
        (el) => el.id === val * 1
    )
    if (!tour) {
        return res.status(404).json({
            status: "failed",
            message: `data with ${val} this not found`,
        })
    }
    next()
}

module.exports = checkId
