import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      nome: 'Felippe Mariano',
      telefone: '998123456',
      email: 'felippe@fakemail.com',
      senha: '9494894849',
    })

    expect(response.statusCode).toEqual(201)
  })

  it('should NOT be able to register if email already exists', async () => {
    await request(app.server).post('/users').send({
      nome: 'Felippe Mariano',
      telefone: '998123456',
      email: 'felippe@fakemail.com',
      senha: '9494894849',
    })

    const response = await request(app.server).post('/users').send({
      nome: 'Impostor',
      telefone: '998123456',
      email: 'felippe@fakemail.com',
      senha: '9494894849',
    })

    expect(response.statusCode).toEqual(409)
  })

  it('should be NOT able to register with bad password', async () => {
    const response = await request(app.server).post('/users').send({
      nome: 'Felippe Mariano',
      telefone: '998123456',
      email: 'felippe@fakemail.com',
      senha: '123',
    })

    expect(response.statusCode).toEqual(400)
  })
})
