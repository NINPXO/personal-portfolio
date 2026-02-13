import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface DeployResult {
  success: boolean;
  stdout: string;
  stderr: string;
  message: string;
}

let lastDeployResult: DeployResult | null = null;

/**
 * Run full deployment: build → git add data/ → commit → push
 */
export async function runDeploy(): Promise<DeployResult> {
  try {
    // Note: In a real scenario, the portfolio build would happen here
    // For now, we just handle the git operations

    // Check git status
    const statusCmd = await execAsync('git status --porcelain data/');
    const hasChanges = statusCmd.stdout.trim().length > 0;

    if (!hasChanges) {
      const result: DeployResult = {
        success: true,
        stdout: 'No changes to deploy',
        stderr: '',
        message: 'No changes in data/ folder',
      };
      lastDeployResult = result;
      return result;
    }

    // Stage data/ folder
    await execAsync('git add data/');

    // Create commit
    const timestamp = new Date().toISOString();
    const commitMsg = `chore: update portfolio content (${timestamp})`;
    await execAsync(`git commit -m "${commitMsg}"`);

    // Push to remote
    const pushResult = await execAsync('git push');

    const result: DeployResult = {
      success: true,
      stdout: pushResult.stdout,
      stderr: pushResult.stderr,
      message: 'Deployment successful',
    };
    lastDeployResult = result;
    return result;
  } catch (error: unknown) {
    const err = error as { stdout?: string; stderr?: string; message?: string };

    // If there's nothing to commit, that's ok
    if (err.stderr?.includes('nothing to commit')) {
      const result: DeployResult = {
        success: true,
        stdout: err.stdout || '',
        stderr: err.stderr || '',
        message: 'No changes to commit',
      };
      lastDeployResult = result;
      return result;
    }

    const result: DeployResult = {
      success: false,
      stdout: err.stdout || '',
      stderr: err.stderr || err.message || 'Unknown error',
      message: 'Deployment failed',
    };
    lastDeployResult = result;
    return result;
  }
}

/**
 * Get the result of the last deploy
 */
export function getLastDeployStatus(): DeployResult | null {
  return lastDeployResult;
}
