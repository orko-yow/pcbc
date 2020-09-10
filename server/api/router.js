require("dotenv/config");
const express = require("express");
const jwt = require("jsonwebtoken");const router = express.Router();
const Card = require("../model/Card");
const Backup = require("../model/Backup");
const APIUtils = require("../utils/ApiUtils");

// get list of backups
router.get('/backups', authenticateToken, async (req, res) => {
    try {
        let backups = await Backup.find({}, {_id:0, name: 1, createdAt:1});
        res.json(backups);    
    } catch (error) {
        res.json({ status: 401, message: "failed to receive any data" + error });
    }
});

router.get('/backups/:backupId', authenticateToken, async (req, res) => {
    const backupId = req.params.backupId;
    if (backupId) {
        try {
            let cards = await Card.find({backupId: backupId}, {_id: 0, __v: 0, backupId: 0});
            res.json(cards);        
        } catch (error) {
            res.json({ status: 401, message: "failed to retrieve any data" + error });
        }
    }
});

// remove individual backup
router.delete('/backups/:backupId', authenticateToken, async (req, res) => {
    const backupId = req.params.backupId;
    if (backupId) {
        try {
            // remove cards for this back up
            let cardRemoved = await Card.remove({backupId: backupId});
            // remove backup entry
            let backupRemoved = await Backup.remove({name:backupId});
            res.json({cardRemoved: cardRemoved, backupRemoved: backupRemoved})
        } catch (error) {
            res.json({ status: 401, message: "failed to delete data" + error });
        }
    } else {
        res.json({message: "A backup Id needs to be mentioned."})
    }
});

// Backup cards for a particular set
router.post('/backups', authenticateToken, async (req, res) => {
    const setCode = req.body.setCode;
    if(!setCode) {
        console.log("WARN: A set code was not sent.")
        res.json({message: "A `seCode` needs to be set."})
    } else {
        const backupName = setCode + "_" + Date.now();

        try {
            let pokeCards = await APIUtils.GetPokeCards(setCode, backupName);
            await Card.insertMany(pokeCards);
            let backup = new Backup({
                name: backupName
            });
            await backup.save();
            console.log("INFO: Successfully backed up all cards for set: " + setCode);
            res.json({message: "All cards are successfully backed up for set: " +setCode, backupId: backupName});                    
        } catch (error) {
            res.json({ status: 401, message: "failed to save any data" + error });
        }
    }
});

// search by name, rarity, hitpoint
router.get('/cards', authenticateToken, async (req, res) => {
    let query = {};
    if(req.query.rarity) {
        query.rarity = req.query.rarity;
    }
    if(req.query.name) {
        query.name = req.query.name;
    }
    if(req.query.hp && req.query.op) {
        query.hp = {};
        query.hp["$"+req.query.op] = parseInt(req.query.hp+ "");
    }
    if(req.query.backupId) {
        query.backupId = req.query.backupId;
    }
    console.log("INFO: Running following filter on cards:", query);
    try {
        let cards = await Card.find(query, {_id:0, __v: 0});
        res.json(cards);    
    } catch (error) {
        res.json({ status: 401, message: "failed to save any data" + error });
    }
});

function authenticateToken(req, res, nextCall) {
    const auth0Header = req.headers['authorization'];
    if (auth0Header) {
        const token = auth0Header.split(" ")[1];
        if (token) {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (error, info) {
                if (error) {
                    res.sendStatus(401);
                }else if (info && info.user === process.env.ALLOWED_USER) {
                    nextCall();
                } else {
                    res.sendStatus(403);
                }
                
            });
        } else {
            res.sendStatus(401);
        }   
    } else {
        res.sendStatus(401);
    }

}

module.exports = router;