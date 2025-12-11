const express = require('express')
const cors = require('cors');
const app = express()
app.use(cors());
const port = 4000

function degToRad(deg){
    return (deg/180) * Math.PI
}

function gcdLat(lat,pi,ang){
    return Math.asin(Math.sin(lat) * Math.cos(pi) + Math.cos(lat) * Math.sin(pi) * Math.cos(ang))
}

function gcdLng(lat,lng,pi,ang){
    let latTemp = gcdLat(lat,pi,ang)
    let lngTemp = Math.atan2(Math.sin(ang) * Math.sin(pi) * Math.cos(lat), Math.cos(pi) - Math.sin(lat) * Math.sin(latTemp))
    return ml(lng - lngTemp)
}

function ml(lng){
    return md(lng + Math.PI, 2 * Math.PI) - Math.PI
}

function md(y,x) {
    return y - x * parseInt(String(y/x))
}

function gcva(lat1,lng1,lat2,lng2) {
    return Math.sin(lat1-lat2) * Math.sin((lng1+lng2)/2) * Math.cos((lng1-lng2)/2) - Math.sin(lat1+lat2) * Math.cos((lng1+lng2)/2) * Math.sin((lng1-lng2)/2)
}

function gcvb(lat1,lng1,lat2,lng2) {
    return Math.sin(lat1-lat2) * Math.cos((lng1+lng2)/2) * Math.cos((lng1-lng2)/2) + Math.sin(lat1+lat2) * Math.sin((lng1+lng2)/2) * Math.sin((lng1-lng2)/2)
}

function gcvc(lat1,lng1,lat2,lng2) {
    return Math.cos(lat1) * Math.cos(lat2) * Math.sin(lng1-lng2)
}

function vToLat(x1,x2,x3){
    return Math.atan2(x3,Math.sqrt(x1**2+x2**2))
}

function vToLng(x1,x2){
    return Math.atan2(-x2,x1)
}

function radToDeg(rad){
    return (rad/Math.PI) * 180
}

function haversineDistance(lat1,lng1,lat2,lng2){
    return Math.acos(Math.cos(degToRad(90 - lat1))*Math.cos(degToRad(90-lat2))+Math.sin(degToRad(90-lat1))*Math.sin(degToRad(90-lat2))*Math.cos(degToRad(lng1-lng2)))*20902230.97
}

app.get('/', (req, res) => {
    let lat1 = Number(req.query.lat1);
    let lng1 = Number(req.query.lng1);
    let ang1 = Number(req.query.ang1);
    let lat2 = Number(req.query.lat2);
    let lng2 = Number(req.query.lng2);
    let ang2 = Number(req.query.ang2);
    const pi2 = Math.PI / 2
    if (
        (Number.isNaN(lat1)||Number.isNaN(lng1)||Number.isNaN(ang1)||Number.isNaN(lat2)||Number.isNaN(lng2)||Number.isNaN(ang2)) || 
        (lat1<-90||lat2<-90) ||
        (lat1>90||lat2>90) ||
        (lng1>180||lng2>180) ||
        (lng1<-180||lng2<-180) ||
        (ang1<0||ang2<0) ||
        (ang1>360||ang2>360)
    )
        {res.send(`Bad Request. Please use correct two sets of valid coordinate/direction combinations.`)
    } else {
        lat1 = degToRad(lat1)
        lng1 = degToRad(lng1) * -1
        ang1 = degToRad(ang1)
        lat1a = gcdLat(lat1,pi2,ang1)
        lng1a = gcdLng(lat1,lng1,pi2,ang1)
        gcv1 = gcva(lat1,lng1,lat1a,lng1a)
        gcv2 = gcvb(lat1,lng1,lat1a,lng1a)
        gcv3 = gcvc(lat1,lng1,lat1a,lng1a)

        lat2 = degToRad(lat2)
        lng2 = degToRad(lng2) * -1
        ang2 = degToRad(ang2)
        lat2a = gcdLat(lat2,pi2,ang2)
        lng2a = gcdLng(lat2,lng2,pi2,ang2)
        gcv4 = gcva(lat2,lng2,lat2a,lng2a)
        gcv5 = gcvb(lat2,lng2,lat2a,lng2a)
        gcv6 = gcvc(lat2,lng2,lat2a,lng2a)

        x1 = gcv2 * gcv6 - gcv3 * gcv5
        x2 = gcv3 * gcv4 - gcv1 * gcv6
        x3 = gcv1 * gcv5 - gcv2 * gcv4

        lat3 = vToLat(x1,x2,x3)
        lng3 = vToLng(x1,x2)
        lat4 = lat3 * -1
        lng4 = ml(lng3 + Math.PI)

        lat3 = radToDeg(lat3)
        lng3 = radToDeg(lng3) * -1
        lat4 = radToDeg(lat4)
        lng4 = radToDeg(lng4) * -1
        lat1 = radToDeg(lat1)
        lng1 = radToDeg(lng1) * -1

        d1 = haversineDistance(lat3,lng3,lat1,lng1)
        d2 = haversineDistance(lat4,lng4,lat1,lng1)

        if (d1 > d2) {
            res.send(JSON.stringify([lat4,lng4]));
        } else {
            res.send(JSON.stringify([lat3,lng3]));
        }
    }
  });

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})