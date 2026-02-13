import { Router, Request, Response } from 'express';
import path from 'path';
import { readJson, writeJson } from '../utils/fileStore.js';
import { SkillsData } from '../types.js';
import { DATA_DIR } from '../config.js';

const router = Router();

const skillsPath = path.join(DATA_DIR, 'skills.json');

// GET /api/skills
router.get('/', async (req: Request, res: Response) => {
  try {
    const skills = await readJson<SkillsData>(skillsPath);
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read skills' });
  }
});

// PUT /api/skills
router.put('/', async (req: Request, res: Response) => {
  try {
    const skills: SkillsData = req.body;
    await writeJson(skillsPath, skills);
    res.json({ message: 'Skills updated', skills });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update skills' });
  }
});

export default router;
