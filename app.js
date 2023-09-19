const fs = require("fs")
const express = require("express")

const app = express()

// middleware dari express
// memodifikasi incoming body ke api kita
app.use(express.json())

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))
app.get("/api/v1/tours", (req,res)=>{
    res.status(200).json({
        status: "succes",
        data: {
            tours
        }
    })
})

app.get("/api/v1/tours/:id", (req,res)=>{
    const id = req.params.id * 1

    const tour = tours.find(el => el.id === id)
    if(!tour){
        return res.status(404).json({
            status: "NOT FOUND",
            message: `data with id ${id} not found`
        })
    }
    res.status(200).json({
        status: "succes",
        data: {
            tour
        }
    })
})

app.post("/api/v1/tours", (req,res)=>{
    // generate id
    const newId = tours[tours.length - 1].id + 1
    const newData = Object.assign({id: newId}, req.body) // method yang membuat object baru dengan menggabungkan 2 object yang sudah ada
    tours.push(newData)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err =>{ // karena json sudah dibuah ke object maka harus dijadikan jeson dulu menggunakan json.stringify
        // 201 = created
        res.status(201).json({
            status: "succes",
            data: {
                tour: newData
            }
        })
    })
})

app.patch("/api/v1/tours/:id", (req,res)=>{
    const id = req.params.id * 1

    const tourIndex = tours.findIndex(el=>el.id === id)
    if(tourIndex === -1){
        return res.status(404).json({
            status: "NOT FOUND",
            message: `data with id ${id} not found`
        })
    }
    
    tours[tourIndex] = {...tours[tourIndex], ...req.body}
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err=>{
        res.status(200).json({
            status: "success",
            message: `data with id ${id} updated`,
            data: {
                tours: tourIndex
            }
        })
    })
})

app.delete("/api/v1/tours/:id", (req,res)=>{
    const id = req.params.id * 1
    const tourIndex = tours.findIndex(el => el.id === id)
    if(tourIndex === -1){
        return res.status(404).json({
            status: "NOT FOUND",
            message: "Data not found"
        })
    }

    tours.splice(tourIndex, 1)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err=>{
        res.status(200).json({
            status: "success",
            message: "Berhasil menghapus",
            data: null
        })
    })
})

const port = process.env.port || 3000

app.listen(port, ()=>{
    console.log(`app is running on port ${port}`)
})