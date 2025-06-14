import { SignJWT, jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export async function createJWT(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(secret)
}

export async function verifyJWT(token) {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch (err) {
    return null
  }
}