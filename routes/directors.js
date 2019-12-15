const express = require('express');
const router = express.Router();

// Models
const Director = require('../models/Director');

router.get('/', (req, res) => {
    const promise = Director.aggregate([
        // TODO WATCH THİS EPİSODE AGAİN: NO 134
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio',
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                bio: '$_id.bio',
                movies: '$movies',
            }
        }
    ]);
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
});

router.post('/', (req, res) => {
    const director = new Director(req.body);
    const promise = director.save();
    promise.then((data) => {
        res.json({status: 1, message: 'The director has been saved!'});
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/:director_id', (req, res) => {
    const director_id = req.params.director_id;
    const promise = Director.findById(director_id);
    promise.then((director) => {
        if (director) {
            res.json(director);
        } else {
            res.json({error: {message: 'The director was not found!', code: 1678}});
        }
    }).catch((err) => {
        res.json(err);
    });
});
router.put('/:director_id', (req, res) => {
    const director_id = req.params.director_id;
    const promise = Director.findByIdAndUpdate(director_id, req.body);
    promise.then((data) => {
        if (data) {
            res.json({status: 1, message: 'The director has been updated!'});
        } else {
            res.json({error: {message: 'The director was not found!', code: 1671}});
        }
    }).catch((err) => {
        res.json(err);
    });
});

router.delete('/:director_id', (req, res) => {
    const director_id = req.params.director_id;
    const promise = Director.findByIdAndRemove(director_id);
    promise.then((director) => {
        if (director) {
            res.json({status: 1, message: 'The director has been deleted!'});
        } else {
            res.json({error: {message: 'The director was not found!', code: 1655}});
        }
    }).catch((err) => {
        res.json(err)
    });
});


module.exports = router;
