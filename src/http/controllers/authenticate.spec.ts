import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/users').send({
      nome: 'Felippe Mariano',
      telefone: '998123456',
      email: 'felippe@fakemail.com',
      senha: '9494894849',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'felippe@fakemail.com',
      senha: '9494894849',
    })

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
