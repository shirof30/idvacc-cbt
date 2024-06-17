import React, { useState } from 'react';
import axios from 'axios';

const VerifyCode = () => {
  const [code, setCode] = useState('');
  const [verificationResult, setVerificationResult] = useState<{ isValid: boolean; name?: string; idNumber?: string } | null>(null);

  const handleVerify = async () => {
    try {
      const response = await axios.post('/api/verify-code', { code });
      if (response.data.success) {
        setVerificationResult({ isValid: true, name: response.data.name, idNumber: response.data.idNumber });
      } else {
        setVerificationResult({ isValid: false });
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      setVerificationResult({ isValid: false });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Verify Code</h1>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          placeholder="Enter your code"
        />
        <button
          onClick={handleVerify}
          className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Verify
        </button>
        {verificationResult !== null && (
          <p className={`mt-4 ${verificationResult.isValid ? 'text-green-500' : 'text-red-500'}`}>
            {verificationResult.isValid
              ? `Valid Code for ${verificationResult.name} (${verificationResult.idNumber})`
              : 'Invalid Code'}
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyCode;
