const express = require('express')
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const router = express.Router()

const Usuarios = require('../models/Usuario')

router.get('/', async (req, res) => {
    res.status(503).json({ errors: {status: 503, msg: 'Service Unavailable'} });
})

router.post('/login', 
    body('password').isLength({ min: 5 }).trim(), 
    body('email').isEmail().normalizeEmail().trim(), 
    async (req, res) => {
    const { email, password } = req.body
    const errors = validationResult(req);
    
    if ( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    await Usuarios.findOne({
        where: {
            email,
            password
        }
    }).then(async(e) => {
        const token = jwt.sign( e.dataValues , 'keysecret' )
        await Usuarios.update({ token }, {
            where: {
                id: e.dataValues.id
            }
        });
        res.json( {status: 200, ...e.dataValues, token, password: undefined} )  
    }).catch(( err ) => {
        res.json({
            status: 404,
            response: null,
            msg: 'Unable to find user data'
        })
    })
})

router.get('/register', async (req, res) => {
    res.send('Pagen register')
})

async function verificarToken(req, res, next) { 
    if( req.body.headers.Authorization ){
        const token = req.body.headers.Authorization.split(' ')[1]
        jwt.verify(token,'keysecret', async(err, data) => {
            if(err){
                return res.status(500).json({
                    status: 500,
                    response: null,
                    msg: err
                })
            }
            req.body.data = data
            req.body.token = token
        })
    } 
    next()
}

router.post('/verify-token', verificarToken, async (req, res) => {
    if( req.body.token ){
        let token = req.body.token
    
        await Usuarios.findOne({
            where: {
                id: req.body.data.id
            }
        }).then((e) => { 
            res.status(200).json({
                data: {...req.body.data, active: e.active, token},
                status: 200
            }) 
        })      
    }
})

module.exports = {AccessRoute: router}
