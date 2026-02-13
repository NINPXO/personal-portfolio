import { Router, Request, Response } from 'express';
import path from 'path';
import { readJson, writeJson } from '../utils/fileStore.js';
import { Contact } from '../types.js';
import { DATA_DIR } from '../config.js';

const router = Router();

const contactPath = path.join(DATA_DIR, 'contact.json');

// GET /api/contact
router.get('/', async (req: Request, res: Response) => {
  try {
    const contact = await readJson<Contact>(contactPath);
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read contact' });
  }
});

// PUT /api/contact
router.put('/', async (req: Request, res: Response) => {
  try {
    const contact: Contact = req.body;
    await writeJson(contactPath, contact);
    res.json({ message: 'Contact updated', contact });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

export default router;
