import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'
import { verifyJwt } from './controllers/middlewares/verify-jwt'
import { deleteProfile } from './controllers/delete-profile'
import { updateProfile } from './controllers/update-profile'
import { listProfiles } from './controllers/list-profiles'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** Authenticated **/
  app.get('/me', { onRequest: [verifyJwt] }, profile)
  app.get('/all', { onRequest: [verifyJwt] }, listProfiles)
  app.patch('/update', { onRequest: [verifyJwt] }, updateProfile)
  app.delete('/delete', { onRequest: [verifyJwt] }, deleteProfile)
}
