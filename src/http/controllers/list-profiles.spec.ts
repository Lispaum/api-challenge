import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('List All Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list all users profiles', async () => {
    await request(app.server).post('/users').send({
      nome: 'Felippe Mariano',
      telefone: '998123456',
      email: 'felippe@fakemail.com',
      senha: '9494894849',
    })

    for (let i = 1; i <= 22; i++) {
      await request(app.server)
        .post('/users')
        .send({
          nome: 'Fulano ' + i,
          telefone: '998481234' + i,
          email: 'fulano@fakemail.com' + i,
          senha: '12843456' + i,
        })
    }

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'felippe@fakemail.com',
      senha: '9494894849',
    })

    const { token } = authResponse.body

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'felippe@fakemail.com',
      }),
    )
  })
})
