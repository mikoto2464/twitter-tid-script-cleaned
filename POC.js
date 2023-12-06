const header = "1/+dpeUe1JOQrHPcWPad/KVM1V8miCo17v1N1vC/hSzBUEPBhSBXZ+4vvamCZ5MvGdMD99ZnXBdD2qaxuO24qoY6SDeZ1g"
let headerBytes = atob(header).split("").map(n => n.charCodeAt(0))
let XOR_BYTE = headerBytes[0]

let map = {}

for(var i = 0; i < 256; i++) {
    map[i^XOR_BYTE] = i
}

let outputBytes = [XOR_BYTE]
for(var i = 1; i < headerBytes.length; i++) {
    outputBytes.push(map[headerBytes[i]])
}
console.log(outputBytes)
let timeCreated = 0
let keyBytes = []
let timeBytes = []
let shaBytes = []
for(var i = 1; i < outputBytes.length; i++) {
    if(i-1 < keyBytes.length && keyBytes[i-1] != outputBytes[i]) {
        break;
    }
    if(i == outputBytes.length && outputBytes[i] != 1) {
        break;
    }
    if(i < 49) {
        keyBytes.push(outputBytes[i])
        continue
    }
    if(i >= 49 && timeBytes.length != 4) {
        timeBytes.push(outputBytes[i])
        continue
    }
    if(i >= 53 && i != outputBytes.length-1) {
        shaBytes.push(outputBytes[i])
    }
}
console.log(keyBytes)
console.log(timeBytes)
timeCreated = timeBytes[0] + (timeBytes[1] << 8) + (timeBytes[2] << 16) + (timeBytes[3] << 24)
console.log(timeCreated)
console.log(shaBytes)