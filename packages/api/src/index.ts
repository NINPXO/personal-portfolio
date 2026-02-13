import express from 'express';
import cors from 'cors';
import profileRouter from './routes/profile.js';
import skillsRouter from './routes/skills.js';
import contactRouter from './routes/contact.js';
import projectsRouter from './routes/projects.js';
import experienceRouter from './routes/experience.js';
import blogRouter from './routes/blog.js';
import deployRouter from './routes/deploy.js';

const app = express();
const PORT = 3000;

app.use(cors({ origin: ['http://localhost:3001', 'http://localhost:3002'] }));
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio API is running' });
});

// Register routes
app.use('/api/profile', profileRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/experience', experienceRouter);
app.use('/api/blog', blogRouter);
app.use('/api/deploy', deployRouter);

app.listen(PORT, () => {
  console.log(`✓ API running on http://localhost:${PORT}`);
});
