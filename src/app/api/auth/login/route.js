import jwt from 'jsonwebtoken';

const users = [
  { id: 1, email: 'a@b', password: '1' }
];

export async function POST(request) {
  const { email, password } = await request.json(); // DB

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return new Response(JSON.stringify({ message: 'Wrong credentials' }), { status: 401 });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });

  return new Response(JSON.stringify({ token }), { status: 200 });
}