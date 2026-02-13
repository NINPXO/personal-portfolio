'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

export function DeployButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDeploy = async () => {
    setLoading(true);
    setMessage('Deploying...');
    setIsSuccess(false);

    try {
      const result = await api.deploy();

      if (result.success) {
        setMessage('✓ Deployed successfully!');
        setIsSuccess(true);
      } else {
        setMessage('✗ Deployment failed: ' + result.message);
      }
    } catch (error) {
      setMessage('✗ Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  return (
    <div className="p-4 border-t">
      <button
        onClick={handleDeploy}
        disabled={loading}
        className={`w-full py-3 rounded font-semibold text-white transition ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : isSuccess
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin">⏳</span> Deploying...
          </span>
        ) : (
          '🚀 Deploy to Production'
        )}
      </button>

      {message && (
        <p
          className={`mt-2 text-sm text-center ${
            isSuccess ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
