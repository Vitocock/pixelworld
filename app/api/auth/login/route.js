export async function POST(req) {
  const { username, password } = await req.json()

  // Usuario hardcodeado (puedes cambiar a DB si quieres)
  const validUser = {
    username: 'admin',
    password: '123'
  }

  if (username !== validUser.username || password !== validUser.password) {
    return new Response(JSON.stringify({ message: 'Credenciales inválidas' }), {
      status: 401
    })
  }

  const { createJWT } = await import('@/lib/auth')
  const token = await createJWT({ username })

  return new Response(JSON.stringify({ token }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}