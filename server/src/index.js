import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*', methods: ['GET', 'POST'], credentials: false }));
app.use(express.json());

const dataDir = process.env.DATA_DIR ? process.env.DATA_DIR : path.join(__dirname, '..', 'data');
const usersFile = path.join(dataDir, 'users.json');

function ensureDataFiles() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, JSON.stringify([]), 'utf-8');
  }
}

function readUsers() {
  ensureDataFiles();
  try {
    const raw = fs.readFileSync(usersFile, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf-8');
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const users = readUsers();
    const exists = users.find(u => u.email.toLowerCase() === String(email).toLowerCase());
    if (exists) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const allowedRoles = ['customer', 'affiliate', 'business_partner', 'admin'];
    const finalRole = allowedRoles.includes(role) ? role : 'customer';
    const user = {
      id: 'user' + Date.now(),
      name,
      email,
      courses: [],
      role: finalRole,
      password: hashed
    };
    users.push(user);
    try {
      writeUsers(users);
    } catch (e) {
      return res.status(500).json({ error: 'Failed to persist user' });
    }

    const { password: _pw, ...publicUser } = user;
    res.status(201).json({ user: publicUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }

  const users = readUsers();
  const user = users.find(u => u.email.toLowerCase() === String(email).toLowerCase());
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const { password: _pw, ...publicUser } = user;
  res.json({ user: publicUser });
});

app.post('/api/purchase', (req, res) => {
  const { userId, courseId } = req.body || {};
  if (!userId || !courseId) {
    return res.status(400).json({ error: 'Missing userId or courseId' });
  }

  const users = readUsers();
  const idx = users.findIndex(u => u.id === userId);
  if (idx === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  const user = users[idx];
  if (!Array.isArray(user.courses)) {
    user.courses = [];
  }
  if (!user.courses.includes(courseId)) {
    user.courses.push(courseId);
  }
  users[idx] = user;
  writeUsers(users);
  const { password: _pw, ...publicUser } = user;
  res.json({ user: publicUser });
});

const withdrawalsFile = path.join(dataDir, 'withdrawals.json');

function readWithdrawals() {
  ensureDataFiles();
  if (!fs.existsSync(withdrawalsFile)) {
    fs.writeFileSync(withdrawalsFile, JSON.stringify([]), 'utf-8');
  }
  try {
    const raw = fs.readFileSync(withdrawalsFile, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeWithdrawals(items) {
  fs.writeFileSync(withdrawalsFile, JSON.stringify(items, null, 2), 'utf-8');
}

app.post('/api/affiliate/withdraw', (req, res) => {
  const { userId, amount, method, details } = req.body || {};
  if (!userId || !amount || !method) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const minWithdraw = 1000;
  if (Number(amount) < minWithdraw) {
    return res.status(400).json({ error: 'Amount below minimum' });
  }
  const users = readUsers();
  const user = users.find(u => u.id === userId);
  if (!user || user.role !== 'affiliate') {
    return res.status(403).json({ error: 'Not allowed' });
  }
  const items = readWithdrawals();
  const item = {
    id: 'wd' + Date.now(),
    userId,
    amount: Number(amount),
    method,
    details: details || {},
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  items.push(item);
  writeWithdrawals(items);
  res.status(201).json({ withdrawal: item });
});

app.get('/api/affiliate/withdraw', (req, res) => {
  const { userId } = req.query || {};
  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }
  const items = readWithdrawals().filter(w => w.userId === userId);
  res.json({ withdrawals: items });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});