export async function createUser(name: string, email: string) {
  // verificar email
  if (!email.includes('@')) {
    return false
  }


  // validar password strong

  return {
    name,
    email
  }
}