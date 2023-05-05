const chai = require('chai');
const chaiHttp = require('chai-http');
var request = require('request');
const server = require('../server');


chai.should();

chai.use(chaiHttp);

describe('NOTES APP', ()=>{

    // Test GET route
    describe('GET /notes', ()=>{
        it('It should get all notes', (done)=>{
            chai.request(server)
            .get('/notes')
            .end((err, response)=>{
                response.should.have.status(200);
                response.body.should.be.a('array');
                done();


            })
        });
        it('It should not get notes', (done)=>{
            chai.request(server)
            .get('/note')
            .end((err, response)=>{
                response.should.have.status(400);
                done();


            })
        });
    });

    // Test GET route with id
    describe('GET /notes/:id', ()=>{
        it('It should get single note by id', (done)=>{
            id = request.body._id;
            chai.request(server)            
            .get('/notes' + id)
            .end((err, response)=>{
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('name');
                response.body.should.have.property('content');
                done();


            })
        });
        it('It should not get note by id', (done)=>{
            id = request.body._id;
            chai.request(server)
            .get('/note')
            .end((err, response)=>{
                response.should.have.status(400);
                response.text.should.be.eq('Note doesn"t exists with this id');
                done();


            })
        });
    });
    

    // Test POST route
    describe('POST /notes', ()=>{
        it('It should post new note ', (done)=>{
            const task = {
                name: "Task 2",
                content: "Random text "
            }
            chai.request(server)            
            .post('/notes')
            .send(task)
            .end((err, response)=>{
                response.should.have.status(201);
                response.body.should.be.a('object');
                response.body.should.have.property('name');
                response.body.should.have.property('content');
                done();


            })
        });
        it('It should post new note ', (done)=>{
            const task = {
                name: "Task 2"
            }
            chai.request(server)            
            .post('/notes')
            .send(task)
            .end((err, response)=>{
                response.should.have.status(400);
                response.text.should.be.eq('Name cannot be less than 3');                
                done();


            })
        });
    });
    

    // Test PUT route
    describe('PUT /notes/:id', ()=>{
        it('It should put a note ', (done)=>{
            const noteid = '64537feff6a1709677debcc5';
            const task = {
                name: "Task 2",
                content: "Random text "
            }
            chai.request(server)            
            .put('/notes' + noteid)
            .send(task)
            .end((err, response)=>{
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('_id').eq("64537feff6a1709677debcc5");
                done();


            })
        });
        it('It should not put a note with name less than three characters ', (done)=>{
            const noteid = 1;
            const task = {
                name: "Tas",
                content: "Random text "
            }
            chai.request(server)            
            .put('/notes'+ noteid)
            .send(task)
            .end((err, response)=>{
                response.should.have.status(400);
                response.text.should.be.eq('Name cannot be less than 3');                
                done();


            })
        });
    });
    // Test DELETE route
    describe('DELETE /notes/:id', ()=>{
        it('It should delete a note with given id ', (done)=>{
            const noteid = '64537feff6a1709677debcc5';
            chai.request(server)            
            .delete('/notes' + noteid)
            .end((err, response)=>{
                response.should.have.status(200);
                response.body.should.be.a('object');
                
                done();


            })
        });
        it('It should not delete a note with invalid id ', (done)=>{
            const noteid = '79q84798q34798';
            chai.request(server)            
            .delete('/notes'+ noteid)
            .end((err, response)=>{
                response.should.have.status(404);
                response.text.should.be.eq('Note with this id does not exists');                
                done();


            })
        });
    });

});