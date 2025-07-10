import { api } from '@/lib/axios'

interface SignInRequest {
  email: string
  password: string
}

export default async function signIn({ email, password }: SignInRequest) {
  const response = await api.post('/sessions', { email, password })

  const { token, refreshToken, user } = response.data

  localStorage.setItem('token', token)
  localStorage.setItem('refreshToken', refreshToken)
  localStorage.setItem('user', JSON.stringify(user))

  api.defaults.headers.common.Authorization = `Bearer ${token}`

  return { token, refreshToken, user }
}
