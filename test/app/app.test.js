const { describe, it, expect } = require('@jest/globals');
const request = require('supertest');

const app = require('../../lib/app/app.js');

describe('the web server', () => {

    it('should reply to /hello with Hello, world!', () => {
        return request(app)
            .get('/hello')
            .expect(200)
            .expect('Content-Type', /text\/plain/)
            .expect(/Hello, world!/);
    });

    it('should reply to other URLs with 404 Not found', () => {
        return request(app)
            .get('/something-else')
            .expect(404)
            .expect('Content-Type', /text\/plain/)
            .expect(/Not found/);
    });

});
