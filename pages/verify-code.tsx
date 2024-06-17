import React, { useState } from 'react';

export default function VerifyCode() {
  const [code, setCode] = useState('');
  const [verificationResult, setVerificationResult] = useState<string | null>(null);

  const handleVerify = async () => {
    const response = await fetch(`/api/verify-code?code=${code}`);
    const result = await response.json();
    setVerificationResult(result.valid ? 'Valid Code' : 'Invalid Code');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Verify Code</h1>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="p-2 border rounded w-full mb-4"
          placeholder="Enter code"
        />
        <button
          onClick={handleVerify}
          className="p-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Verify
        </button>
        {verificationResult && (
          <p className="mt-4 font-bold">{verificationResult}</p>
        )}
      </div>
    </div>
  );
}
