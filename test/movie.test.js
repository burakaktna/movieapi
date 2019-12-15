const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const mongoose = require('mongoose');

const server = require('../app');
const movie_id = mongoose.Types.ObjectId();
chai.use(chaiHttp);

describe('/api/movies test', () => {
    describe('/GET movies', () => {
        it('it should GET all the movies', (done) => {
            chai.request(server)
                .get('/api/movies')
                .end(((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                }));
        });
    });
    describe('/POST movie', () => {
        it('should POST a movie', (done) => {
            const movie = {
                _id: movie_id,
                director_id: '5df5416789cfd01968d34acf',
                title: 'Test',
                category: 'Test',
                country: 'Test',
                year: new Date().getFullYear(),
                imdb_score: '10',
            };
            chai.request(server)
                .post('/api/movies')
                .send(movie)
                .end(((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status', 1);
                    res.body.should.have.property('message', 'The movie has been saved!');
                    done();
                }));
        });
    });
    describe('/GET/:movie_id movie', () => {
        it('should GET a movie by the given id', (done) => {
            chai.request(server)
                .get('/api/movies/' + movie_id)
                .end(((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    res.body.should.have.property('_id').eql(''+movie_id+'');
                    done();
                }))
        });
    });
    describe('/PUT/:movie_id movie', () => {
        it('should UPDATE a movie given by id', (done) => {
            const movie = {
                _id: movie_id,
                director_id: '5df5416789cfd01968d34acf',
                title: 'Test UPDATE',
                category: 'Test UPDATE',
                country: 'Test UPDATE',
                year: new Date().getFullYear() + 1,
                imdb_score: '9',
            };
            chai.request(server)
                .put('/api/movies/' + movie_id)
                .send(movie)
                .end(((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status', 1);
                    res.body.should.have.property('message', 'The movie has been updated!');
                    done();
                }));
        });
    });
    describe('/DELETE/:movie_id movie', () => {
        it('should DELETE a movie given by id', (done) => {
            chai.request(server)
                .delete('/api/movies/'+movie_id)
                .end(((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status', 1);
                    res.body.should.have.property('message', 'The movie has been deleted!');
                    done();
                }))
        });
    });
});
