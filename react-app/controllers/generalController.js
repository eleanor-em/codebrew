const sendHello = function(req, res) {
    res.send({'message': 'hello react'});
}

module.exports = {
    sendHello: sendHello
}