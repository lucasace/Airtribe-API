const e = require('express');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        let id;
        if(req.method == 'GET' && !req.headers.id_token){
            return res.status(401).send('Unauthorized');
        } 
        else if(req.method == 'GET')
            id = req.headers.id_token;
        else if(!req.body.id)
            return res.status(400).send('Bad request. Missing parameters.');
        else
            id = req.body.id;
        const token = req.headers.authorization.split(' ')[1];
        if(!token) return res.status(401).send('Access denied. No token provided.');
        const decoded = jwt.verify(token, process.env.JWT_TOKEN||'secret');
        if(!decoded.id) return res.status(401).send('Access denied. Invalid token.');
        if(decoded.id != id)
            return res.status(401).send('Access denied. Invalid token.');
        next();
    }
    catch(err){
        res.status(500).send(err);
    }
}

