import { Router, Request, Response } from 'express';
import path from 'path';
import { readJson, writeJson } from '../utils/fileStore.js';
import { Profile } from '../types.js';
import { DATA_DIR } from '../config.js';

const router = Router();

const profilePath = path.join(DATA_DIR, 'profile.json');

// GET /api/profile
router.get('/', async (req: Request, res: Response) => {
  try {
    const profile = await readJson<Profile>(profilePath);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read profile' });
  }
});

// PUT /api/profile
router.put('/', async (req: Request, res: Response) => {
  try {
    const profile: Profile = req.body;
    await writeJson(profilePath, profile);
    res.json({ message: 'Profile updated', profile });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

export default router;
