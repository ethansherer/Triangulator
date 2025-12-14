// console.log('Other JavaScript here.');
let streetLat1
let streetLng1
let streetHeading1
let streetPitch1
let streetLat2
let streetLng2
let streetHeading2
let streetPitch2
let streetLat3
let streetLng3

function testTriangulate() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      let lat1 = "38.8895"
      let lng1 = "-77.0353"
      let ang1 = "45"
      let lat2 = "34.0522"
      let lng2 = "-118.2437"
      let ang2 = "60"
      let url = "http://localhost:4000/?lat1=" + lat1 + "&lng1=" + lng1 + "&ang1=" + ang1 + "&lat2=" + lat2 + "&lng2=" + lng2 + "&ang2=" + ang2

      fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => console.log("triangulation.js working: " + result))
        .catch(error => console.log('error', error));
}

function testHeading() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      let lat1 = "38.1269194"
      let lng1 = "-85.6532982"
      let ang1 = "50"
      let dist1 = "50"
      let url = "http://localhost:5000/?lat1=" + lat1 + "&lng1=" + lng1 + "&ang1=" + ang1 + "&dist1=" + dist1

      fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => console.log("heading.js working: " + result))
        .catch(error => console.log('error', error));
}

function testAPIs(){
    testTriangulate()
    testHeading()
}

function addPos1() {
    streetLat1 = Math.round(streetLat * 100000) / 100000
    streetLng1 = Math.round(streetLng * 100000) / 100000
    streetHeading1 = Math.round(streetHeading * 100) / 100
    streetPitch1 = Math.round(streetPitch * 100) / 100
    const pos1Div = document.getElementById('pos1')
    pos1Container = document.createElement('div')
    pos1Container.setAttribute('id','pos1Container')
    pos1Div.appendChild(pos1Container)
    pos1Container.innerHTML += '<h2>Position 1</h2>'
    pos1Ul = document.createElement('ul')
    pos1Ul.setAttribute('id','pos1Ul')
    pos1Ul.innerHTML += `<li><strong>Position</strong>: ${streetLat1},${streetLng1}</li>`
    pos1Ul.innerHTML += `<li><strong>Heading</strong>: ${streetHeading1}</li>`
    pos1Ul.innerHTML += `<li><strong>Pitch</strong>: ${streetPitch1}</li>`
    pos1Container.appendChild(pos1Ul)
}

function addPos2() {
    streetLat2 = Math.round(streetLat * 100000) / 100000
    streetLng2 = Math.round(streetLng * 100000) / 100000
    streetHeading2 = Math.round(streetHeading * 100) / 100
    streetPitch2 = Math.round(streetPitch * 100) / 100
    const pos2Div = document.getElementById('pos2')
    pos2Container = document.createElement('div')
    pos2Container.setAttribute('id','pos2Container')
    pos2Div.appendChild(pos2Container)
    pos2Container.innerHTML += '<h2>Position 2</h2>'
    pos2Ul = document.createElement('ul')
    pos2Ul.setAttribute('id','pos2Ul')
    pos2Ul.innerHTML += `<li><strong>Position</strong>: ${streetLat2},${streetLng2}</li>`
    pos2Ul.innerHTML += `<li><strong>Heading</strong>: ${streetHeading2}</li>`
    pos2Ul.innerHTML += `<li><strong>Pitch</strong>: ${streetPitch2}</li>`
    pos2Container.appendChild(pos2Ul)
}

function addPos3() {
    streetLat3 = Math.round(lat3 * 100000) / 100000
    streetLng3 = Math.round(lng3 * 100000) / 100000
    const pos3Div = document.getElementById('pos3')
    pos3Container = document.createElement('div')
    pos3Container.setAttribute('id','pos3Container')
    pos3Div.appendChild(pos3Container)
    pos3Container.innerHTML += '<h2>Position 3: Triangulated Point</h2>'
    pos3Ul = document.createElement('ul')
    pos3Ul.setAttribute('id','pos3Ul')
    pos3Ul.innerHTML += `<li><strong>Position</strong>: ${streetLat3},${streetLng3}</li>`
    pos3Container.appendChild(pos3Ul)
    hDistance1 = haversineDistance(streetLat1,streetLng1,streetLat3,streetLng3)
    hDistance1 = Math.round(hDistance1 * 100) / 100
    pos1Ul = document.getElementById('pos1Ul')
    pos1Ul.innerHTML += `<li><strong>Distance</strong>: ${hDistance1}</li>`
    hDistance2 = haversineDistance(streetLat2,streetLng2,streetLat3,streetLng3)
    hDistance2 = Math.round(hDistance2 * 100) / 100
    pos2Ul = document.getElementById('pos2Ul')
    pos2Ul.innerHTML += `<li><strong>Distance</strong>: ${hDistance2}</li>`
}

function removePos1() {
    if(document.getElementById("pos1Container")){
        document.getElementById("pos1Container").remove()}
    if (document.getElementById("pos2Ul")){
        document.getElementById("pos2Ul").removeChild(document.getElementById("pos2Ul").lastElementChild)}
    if (document.getElementById("pos3Ul")){
        removePos3()}

}

function removePos2() {
    if (document.getElementById("pos2Container")){
        document.getElementById("pos2Container").remove()}
    if (document.getElementById("pos1Ul")){
        document.getElementById("pos1Ul").removeChild(document.getElementById("pos1Ul").lastElementChild)}
    if (document.getElementById("pos3Ul")){
        removePos3()}
}

function removePos3() {
    if (document.getElementById("pos3Container")){
    document.getElementById("pos3Container").remove()}
}

async function triangulate() {
    try {
        const url = "http://localhost:4000/?lat1=" + streetLat1 + "&lng1=" + streetLng1 + "&ang1=" + streetHeading1 + "&lat2=" + streetLat2 + "&lng2=" + streetLng2 + "&ang2=" + streetHeading2
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

function degToRad(deg){
    return (deg/180) * Math.PI
}

function radToDeg(rad){
    return (rad/Math.PI) * 180
}

function haversineDistance(lat1,lng1,lat2,lng2){
    return Math.acos(Math.cos(degToRad(90 - lat1))*Math.cos(degToRad(90-lat2))+Math.sin(degToRad(90-lat1))*Math.sin(degToRad(90-lat2))*Math.cos(degToRad(lng1-lng2)))*20902230.97
}

function addPath1(){
    let lat1 = Number(streetLat1);
    let lng1 = Number(streetLng1);
    let ang1 = Number(streetHeading1);
    let dist1 = Number(50);
        if 
            ((Number.isNaN(lat1)||Number.isNaN(lng1)||Number.isNaN(ang1)||Number.isNaN(dist1))|| 
            (lat1<-90)||(lat1>90) ||(lng1>180)||(lng1<-180)||
            (ang1<0) ||
            (ang1>360) ||
            (dist1<0)) 
        { return `Bad input. Please use correct a set of valid coordinates/direction.`
        } else {
            lat1 = degToRad(lat1)
            lng1 = degToRad(lng1)
            ang1 = degToRad(ang1)
            dist1 = dist1/20925524
            newLat = Math.asin(Math.sin(lat1) * Math.cos(dist1) + Math.cos(lat1) * Math.sin(dist1) * Math.cos(ang1))
            newLng = lng1 + Math.atan2(Math.sin(ang1) * Math.sin(dist1) * Math.cos(lat1), Math.cos(dist1) - Math.sin(lat1) * Math.sin(newLat))
            return [radToDeg(newLat),radToDeg(newLng)]
        }
}

function addPath2(){
    let lat1 = Number(streetLat2);
    let lng1 = Number(streetLng2);
    let ang1 = Number(streetHeading2);
    let dist1 = Number(50);
        if 
            ((Number.isNaN(lat1)||Number.isNaN(lng1)||Number.isNaN(ang1)||Number.isNaN(dist1))|| 
            (lat1<-90)||(lat1>90) ||(lng1>180)||(lng1<-180)||
            (ang1<0) ||
            (ang1>360) ||
            (dist1<0)) 
        { return `Bad input. Please use correct a set of valid coordinates/direction.`
        } else {
            lat1 = degToRad(lat1)
            lng1 = degToRad(lng1)
            ang1 = degToRad(ang1)
            dist1 = dist1/20925524
            newLat = Math.asin(Math.sin(lat1) * Math.cos(dist1) + Math.cos(lat1) * Math.sin(dist1) * Math.cos(ang1))
            newLng = lng1 + Math.atan2(Math.sin(ang1) * Math.sin(dist1) * Math.cos(lat1), Math.cos(dist1) - Math.sin(lat1) * Math.sin(newLat))
            return [radToDeg(newLat),radToDeg(newLng)]
        }
}

function startMe(){
    document.getElementById('padding').style.display = 'none'
    document.getElementById('mainDiv').classList.toggle('is-hidden')
}