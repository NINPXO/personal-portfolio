import { Router, Request, Response } from 'express';
import path from 'path';
import { randomUUID } from 'crypto';
import { readJson, writeJson } from '../utils/fileStore.js';
import { BlogPost } from '../types.js';
import { DATA_DIR } from '../config.js';

const router = Router();

const blogPath = path.join(DATA_DIR, 'blog.json');

// GET /api/blog
router.get('/', async (req: Request, res: Response) => {
  try {
    const blog = await readJson<BlogPost[]>(blogPath);
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read blog posts' });
  }
});

// GET /api/blog/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const blog = await readJson<BlogPost[]>(blogPath);
    const post = blog.find((p) => p.id === req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read blog post' });
  }
});

// POST /api/blog
router.post('/', async (req: Request, res: Response) => {
  try {
    const blog = await readJson<BlogPost[]>(blogPath);
    const newPost: BlogPost = {
      id: randomUUID(),
      ...req.body,
    };

    blog.push(newPost);
    await writeJson(blogPath, blog);

    res.status(201).json({ message: 'Blog post created', post: newPost });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create blog post' });
  }
});

// PUT /api/blog/:id
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const blog = await readJson<BlogPost[]>(blogPath);
    const index = blog.findIndex((p) => p.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    blog[index] = {
      id: req.params.id,
      ...req.body,
    };

    await writeJson(blogPath, blog);
    res.json({ message: 'Blog post updated', post: blog[index] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update blog post' });
  }
});

// DELETE /api/blog/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const blog = await readJson<BlogPost[]>(blogPath);
    const filtered = blog.filter((p) => p.id !== req.params.id);

    if (filtered.length === blog.length) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    await writeJson(blogPath, filtered);
    res.json({ message: 'Blog post deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
});

export default router;
