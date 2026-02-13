import { Router, Request, Response } from 'express';
import path from 'path';
import { randomUUID } from 'crypto';
import { readJson, writeJson } from '../utils/fileStore.js';
import { Project } from '../types.js';
import { DATA_DIR } from '../config.js';

const router = Router();

const projectsPath = path.join(DATA_DIR, 'projects.json');

// GET /api/projects
router.get('/', async (req: Request, res: Response) => {
  try {
    const projects = await readJson<Project[]>(projectsPath);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read projects' });
  }
});

// GET /api/projects/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const projects = await readJson<Project[]>(projectsPath);
    const project = projects.find((p) => p.id === req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read project' });
  }
});

// POST /api/projects
router.post('/', async (req: Request, res: Response) => {
  try {
    const projects = await readJson<Project[]>(projectsPath);
    const newProject: Project = {
      id: randomUUID(),
      ...req.body,
    };

    projects.push(newProject);
    await writeJson(projectsPath, projects);

    res.status(201).json({ message: 'Project created', project: newProject });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// PUT /api/projects/:id
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const projects = await readJson<Project[]>(projectsPath);
    const index = projects.findIndex((p) => p.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Project not found' });
    }

    projects[index] = {
      id: req.params.id,
      ...req.body,
    };

    await writeJson(projectsPath, projects);
    res.json({ message: 'Project updated', project: projects[index] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// DELETE /api/projects/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const projects = await readJson<Project[]>(projectsPath);
    const filtered = projects.filter((p) => p.id !== req.params.id);

    if (filtered.length === projects.length) {
      return res.status(404).json({ error: 'Project not found' });
    }

    await writeJson(projectsPath, filtered);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

export default router;
