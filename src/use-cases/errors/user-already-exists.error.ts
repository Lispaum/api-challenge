export class UserAlreadyExistsError extends Error {
  constructor() {
    super('User with that email already exists')
  }
}
