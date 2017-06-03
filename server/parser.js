var atob = require('atob')
var xml2json = require('xml2json')

function hexToAscii(hex) {
    if (hex === undefined) return

    var hecks = hex.toString()
    var str = ''
    for (var i = 0; i < hecks.length; i += 2) {
        let h = hecks.substr(i, 2)
        str += String.fromCharCode(parseInt(h, 16))
    }
    return str
}

function parseItem(item) {
    let type = hexToAscii(item.type)
    let code = hexToAscii(item.code)
    let length = item.length
    var data
    if (item.data !== undefined) {
        data = atob(item.data)
    }

    result = {
        type: type,
        code: code,
        length: length,
        data: data,
    }
    console.log('----\n' + JSON.stringify(result) + '\n----')
    return result
}

function parseMetadata(metadata) {
    try {
        var result = JSON.parse(xml2json.toJson(metadata))
        let rawData = result.item
        item = parseItem(rawData)
        return item 
    } catch (err) {
        console.error('There was an error parsing the following line: ' + err + '\n' + metadata)
    }
}

module.exports = parseMetadata
