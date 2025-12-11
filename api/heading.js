const express = require('express')
const cors = require('cors');
const app = express()
app.use(cors());
const port = 5000

function degToRad(deg){
    return (deg/180) * Math.PI
}

function radToDeg(rad){
    return (rad/Math.PI) * 180
}

app.get('/', (req, res) => {
    let lat1 = Number(req.query.lat1);
    let lng1 = Number(req.query.lng1);
    let ang1 = Number(req.query.ang1);
    let dist1 = Number(req.query.dist1);
        if 
            ((Number.isNaN(lat1)||Number.isNaN(lng1)||Number.isNaN(ang1)||Number.isNaN(dist1))|| 
            (lat1<-90) ||
            (lat1>90) ||
            (lng1>180) ||
            (lng1<-180) ||
            (ang1<0) ||
            (ang1>360) ||
            (dist1<0))

            {res.send(`Bad Request. Please use correct a set of valid coordinates/direction.`)}

            else

            {lat1 = degToRad(lat1)
            lng1 = degToRad(lng1)
            ang1 = degToRad(ang1)
            dist1 = dist1/20925524
            newLat = Math.asin(Math.sin(lat1) * Math.cos(dist1) + Math.cos(lat1) * Math.sin(dist1) * Math.cos(ang1))
            newLng = lng1 + Math.atan2(Math.sin(ang1) * Math.sin(dist1) * Math.cos(lat1), Math.cos(dist1) - Math.sin(lat1) * Math.sin(newLat))
            res.send(JSON.stringify([radToDeg(newLat),radToDeg(newLng)]))}
    });

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})  