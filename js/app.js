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
    pos1Ul.innerHTML += `<li><strong>Distance</strong>: </li>`
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
    pos2Ul.innerHTML += `<li><strong>Distance</strong>: </li>`
    pos2Container.appendChild(pos2Ul)
}

function addPos3() {
    streetLat3 = Math.round(lat3 * 100000) / 100000
    streetLng3 = Math.round(lng3 * 100000) / 100000
    const pos3Div = document.getElementById('pos3')
    pos3Container = document.createElement('div')
    pos3Container.setAttribute('id','pos3Container')
    pos3Div.appendChild(pos3Container)
    pos3Container.innerHTML += '<h2>Triangulated Point</h2>'
    pos3Ul = document.createElement('ul')
    pos3Ul.setAttribute('id','pos3Ul')
    pos3Ul.innerHTML += `<li><strong>Position</strong>: ${streetLat3},${streetLng3}</li>`
    pos3Container.appendChild(pos3Ul)
}

function removePos1() {
    document.getElementById("pos1Container").remove()
    removePos3()
}

function removePos2() {
    document.getElementById("pos2Container").remove()
    removePos3()
}

function removePos3() {
    document.getElementById("pos3Container").remove()
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

async function heading1() {
    try {
        const url = "http://localhost:5000/?lat1=" + streetLat1 + "&lng1=" + streetLng1 + "&ang1=" + streetHeading1 + "&dist1=" + "50"
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`${response.status}`)
        }
        const data = await response
        console.log(data)
        return data
    } catch (error) {
        console.error(error)
    }
}

async function heading2() {
    try {
        const url = "http://localhost:5000/?lat1=" + streetLat2 + "&lng1=" + streetLng2 + "&ang1=" + streetHeading2 + "&dist1=" + "50"
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