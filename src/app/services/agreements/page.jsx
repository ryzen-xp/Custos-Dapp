"use client"
import { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';

function AgreementList() {
  const [loading, setLoading] = useState(true);
  const [agreements, setAgreements] = useState([]);

  useEffect(() => {
    // Mock agreements data
    const mockAgreements = [
      {
        id: 1,
        creator: 'Alice',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        secondPartyAddress: '0x123456789...'
      },
      {
        id: 2,
        creator: 'Bob',
        content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        secondPartyAddress: '0x987654321...'
      },
      {
        id: 2,
        creator: 'Bob',
        content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        secondPartyAddress: '0x987654321...'
      },
      {
        id: 2,
        creator: 'Bob',
        content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        secondPartyAddress: '0x987654321...'
      },
      // Add more mock agreements as needed
    ];

    // Simulate loading delay
    setTimeout(() => {
      setAgreements(mockAgreements);
      setLoading(false);
    }, 1500); // Adjust delay time as needed

  }, []);
  return (
    <div className="w-full">
        <Navbar />
      <h1 className="text-3xl font-bold text-purple-900 my-4">Agreements</h1>
      {loading ? (
        <div className="text-center py-8">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 mx-auto"></div>
          <p className="mt-2">Loading agreements...</p>
        </div>
      ) : (
        agreements.length === 0 ? (
          <p className="text-gray-600">No agreements found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agreements.map(agreement => (
              <div key={agreement.id} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-purple-800 mb-2">Agreement ID: {agreement.id}</h2>
                <p className="text-sm text-gray-600">Creator: {agreement.creator}</p>
                <p className="text-sm text-gray-600">Content: {agreement.content}</p>
                <p className="text-sm text-gray-600">Second Party Address: {agreement.secondPartyAddress}</p>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
export default AgreementList;
