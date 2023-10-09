export interface UserCredential {
  username: string,
  password: string,
}

export interface User extends UserCredential{
  name: string
}

