import { Router, Request, Response } from 'express';
import path from 'path';
import { randomUUID } from 'crypto';
import { readJson, writeJson } from '../utils/fileStore.js';
import { Experience } from '../types.js';
import { DATA_DIR } from '../config.js';

const router = Router();

const experiencePath = path.join(DATA_DIR, 'experience.json');

// GET /api/experience
router.get('/', async (req: Request, res: Response) => {
  try {
    const experience = await readJson<Experience[]>(experiencePath);
    res.json(experience);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read experience' });
  }
});

// GET /api/experience/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const experience = await readJson<Experience[]>(experiencePath);
    const entry = experience.find((e) => e.id === req.params.id);

    if (!entry) {
      return res.status(404).json({ error: 'Experience entry not found' });
    }

    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read experience' });
  }
});

// POST /api/experience
router.post('/', async (req: Request, res: Response) => {
  try {
    const experience = await readJson<Experience[]>(experiencePath);
    const newEntry: Experience = {
      id: randomUUID(),
      ...req.body,
    };

    experience.push(newEntry);
    await writeJson(experiencePath, experience);

    res.status(201).json({ message: 'Experience entry created', entry: newEntry });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create experience' });
  }
});

// PUT /api/experience/:id
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const experience = await readJson<Experience[]>(experiencePath);
    const index = experience.findIndex((e) => e.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Experience entry not found' });
    }

    experience[index] = {
      id: req.params.id,
      ...req.body,
    };

    await writeJson(experiencePath, experience);
    res.json({ message: 'Experience entry updated', entry: experience[index] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update experience' });
  }
});

// DELETE /api/experience/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const experience = await readJson<Experience[]>(experiencePath);
    const filtered = experience.filter((e) => e.id !== req.params.id);

    if (filtered.length === experience.length) {
      return res.status(404).json({ error: 'Experience entry not found' });
    }

    await writeJson(experiencePath, filtered);
    res.json({ message: 'Experience entry deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete experience' });
  }
});

export default router;
