import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Update Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to update user profile', async () => {
    await request(app.server).post('/users').send({
      nome: 'Felippe Mariano',
      telefone: '998123456',
      email: 'felippe@fakemail.com',
      senha: '9494894849',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'felippe@fakemail.com',
      senha: '9494894849',
    })

    const { token } = authResponse.body

    const profileResponse = await request(app.server)
      .put('/update')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'Felippe Mariano',
        telefone: '123123123',
        email: 'felippe@fakemail.com',
        senha: '9494894849',
      })

    expect(profileResponse.statusCode).toEqual(200)
    console.error(profileResponse.body.user)
    // TODO: fix this test
    // expect(profileResponse.body.user).toEqual(
    //   expect.objectContaining({
    //     user: {
    //       email: 'felippe@fakemail.com',
    //     },
    //   }),
    // )
  })
})
