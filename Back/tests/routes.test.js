const request = require('supertest')
const app = require('../index')

describe('POST /api/register', function() {

    it('nom trop court → 400', async function() {
        const response = await request(app)
            .post('/api/register')
            .send({ nom: 'A', email: 'test@test.fr', password: 'motdepasse123' })
        expect(response.status).toBe(400)
        expect(response.body.erreur).toBeDefined()
    })

    it('email invalide → 400', async function() {
        const response = await request(app)
            .post('/api/register')
            .send({ nom: 'Thomas Martin', email: 'pasunemail', password: 'motdepasse123' })
        expect(response.status).toBe(400)
        expect(response.body.erreur).toBeDefined()
    })



})