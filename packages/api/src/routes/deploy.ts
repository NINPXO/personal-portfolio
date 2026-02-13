import { Router, Request, Response } from 'express';
import { runDeploy, getLastDeployStatus } from '../utils/gitOps.js';

const router = Router();

// POST /api/deploy
router.post('/', async (req: Request, res: Response) => {
  try {
    const result = await runDeploy();
    res.status(result.success ? 200 : 500).json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Deployment failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// GET /api/deploy/status
router.get('/status', (req: Request, res: Response) => {
  const status = getLastDeployStatus();

  if (!status) {
    return res.json({
      success: false,
      message: 'No deployment has been run yet',
    });
  }

  res.json(status);
});

export default router;
