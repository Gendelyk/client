import jwt from 'jsonwebtoken';

const users = [
  { id: 1, email: 'a@b', password: '1' }
];

export async function POST(request) {
  const { email, password } = await request.json();

  const user = users.find(u => u.email === email); // DB

  if (user) {
    return new Response(JSON.stringify({ message: 'User with such email already exists' }), { status: 401 });
  }

  // Add user to DB
  const token = jwt.sign({ id: 2, email }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });

  return new Response(JSON.stringify({ token }), { status: 200 });
}