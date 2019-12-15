const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const mongoose = require('mongoose');

const server = require('../app');
const director_id = mongoose.Types.ObjectId();
chai.use(chaiHttp);

describe('/api/directors test', () => {
    describe('/GET directors', () => {
        it('it should GET all the directors', (done) => {
            chai.request(server)
                .get('/api/directors')
                .end(((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                }));
        });
    });
    describe('/POST director', () => {
        it('should POST a director', (done) => {
            const director = {
                _id: director_id,
                name: 'Test',
                surname: 'Test',
                bio: 'elit pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas integer eget aliquet nibh praesent tristique',
            };
            chai.request(server)
                .post('/api/directors')
                .send(director)
                .end(((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status', 1);
                    res.body.should.have.property('message', 'The director has been saved!');
                    done();
                }));
        });
    });
    describe('/GET/:director_id director', () => {
        it('should GET a director by the given id', (done) => {
            chai.request(server)
                .get('/api/directors/' + director_id)
                .end(((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql('Test');
                    res.body.should.have.property('surname').eql('Test');
                    res.body.should.have.property('bio').eql('elit pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas integer eget aliquet nibh praesent tristique');
                    res.body.should.have.property('_id').eql(''+director_id+'');
                    done();
                }))
        });
    });
    describe('/PUT/:director_id director', () => {
        it('should UPDATE a director given by id', (done) => {
            const director = {
                _id: director_id,
                name: 'Test UPDATED',
                surname: 'Test UPDATED',
                bio: 'elit pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas integer eget aliquet nibh praesent tristique UPDATED',
            };
            chai.request(server)
                .put('/api/directors/' + director_id)
                .send(director)
                .end(((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status', 1);
                    res.body.should.have.property('message', 'The director has been updated!');
                    done();
                }));
        });
    });
    describe('/DELETE/:director_id director', () => {
        it('should DELETE a director given by id', (done) => {
            chai.request(server)
                .delete('/api/directors/' + director_id)
                .end(((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status', 1);
                    res.body.should.have.property('message', 'The director has been deleted!');
                    done();
                }))
        });
    });
});
