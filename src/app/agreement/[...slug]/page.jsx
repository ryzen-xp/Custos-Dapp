"use client";
import React, { useEffect, useState } from 'react';
import Slugnav from '../components/slugnav';
import { format } from 'date-fns';
import Image from 'next/image';
import Modal from 'react-modal';
import ReactMarkdown from 'react-markdown';

const Page = ({ params }) => {
  const [agreement, setAgreement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null); // State for access token
  const [isEditorOpen, setIsEditorOpen] = useState(false); // State for editor modal
  const [editorContent, setEditorContent] = useState(''); // State for editor content

  const slug = params?.slug || [];
  const [key, value] = slug;

  useEffect(() => {
    if (key === "access_token") {
      setAccessToken(value); // Set access token
      fetchAgreementByAccessToken(value);
    } else {
      fetchAgreementById(key);
    }
  }, [key, value]);

  const fetchAgreementById = async (agreementId) => {
    try {
      const response = await fetch(`/api/agreement/${agreementId}`);
      if (response.ok) {
        const data = await response.json();
        setAgreement(data);
        setEditorContent(data.content); // Set initial editor content
      } else {
        console.error('Failed to fetch agreement by ID');
      }
    } catch (error) {
      console.error('Error fetching agreement by ID:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAgreementByAccessToken = async (token) => {
    try {
      const response = await fetch(`https://custosbackend.onrender.com/agreement/agreement/access_token/?access_token=${token}`);
      if (response.ok) {
        const data = await response.json();
        setAgreement(data);
        setEditorContent(data.content); // Set initial editor content
      } else {
        console.error('Failed to fetch agreement by access token');
      }
    } catch (error) {
      console.error('Error fetching agreement by access token:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditorOpen(true);
  };

  const handleSave = async () => {
    // Save the edited content to the server
    try {
      const response = await fetch(`/api/agreement/${agreement.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...agreement, content: editorContent }),
      });
      if (response.ok) {
        const updatedAgreement = await response.json();
        setAgreement(updatedAgreement);
        setIsEditorOpen(false); // Close the editor modal on successful save
      } else {
        console.error('Failed to save edited agreement');
      }
    } catch (error) {
      console.error('Error saving edited agreement:', error);
    }
  };

  if (loading) {
    return <div className='text-[#EAFBFF]'>Loading...</div>;
  }

  if (!agreement) {
    return <div className='text-[#EAFBFF]'>Agreement not found</div>;
  }

  const formattedDate = format(new Date(agreement?.created_at), "EEEE, do MMMM yyyy. hh:mm:ss aaaa");

  return (
    <div className="space-y-4 text-[#EAFBFF] w-full overflow-clip flex flex-col">
      <Slugnav agreement={agreement} />
      <div className="p-4 rounded-lg shadow-lg bg-gradient-to-r w-full ">
        <div className="w-full flex header flex-col md:flex-row align-baseline justify-start gap-4 mb-8">
          <div className='w-full px-3 '>
            <span className="">Agreement Type</span>
            <span className="text-[0.8em] mt-2 w-fit flex text-wrap font-bold bg-gradient-to-r br border-slate-800 px-2 py-[0.8em] border border-gradient from-[#19B1D2] to-[#0094FF] bg-clip-text text-transparent">
              {agreement.agreementType}
            </span>
          </div>
          <div className='w-full px-3 '>
            <span className="">Second Party Address</span>
            <span className="br w-fit mt-2 overflow-hidden flex border-slate-800 px-2 py-[0.8em] border border-gradient text-[0.7em] text-[#9B9292] whitespace-nowrap overflow-ellipsis">
              {`${agreement.second_party_address}`}
            </span>
          </div>

          <div className="flex-col w-full items-end text-end gap-3 flex">
            {accessToken && (
              <div className="w-full gap-2 flex items- justify-end cursor-pointer" onClick={handleEditClick}>
                <span className="bg-gradient-to-r from-[#19B1D2] to-[#0094FF] text-[1.2em] bg-clip-text text-transparent">
                  Edit Agreement
                </span>
                <Image src="/edit-blue.svg" alt="Edit Icon" width={20} height={20} />
              </div>
            )}
            <div className='w-full  flex flex-col md:flex-row gap-2 justify-end'>
              <span className="flex-shrink-0">Time Stamp:</span>
              <span className="bg-gradient-to-r from-[#19B1D2] to-[#0094FF] bg-clip-text text-transparent">{formattedDate}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <strong>ID:</strong> {agreement.id}
          </div>
          <div>
            <strong>Content:</strong> <ReactMarkdown>{agreement.content}</ReactMarkdown>
          </div>
          <div>
            <strong>Email:</strong> {agreement.email || 'N/A'}
          </div>
          <div>
            <strong>Access Token:</strong> {agreement.access_token}
          </div>
          <div>
            <strong>Agreement ID:</strong> {agreement.agreement_id || 'N/A'}
          </div>
          <div>
            <strong>First Party Address:</strong> {agreement.first_party_address}
          </div>
          <div>
            <strong>First Party Valid ID:</strong> {agreement.first_party_valid_id || 'N/A'}
          </div>
          <div>
            <strong>First Party Country:</strong> {agreement.first_party_country || 'N/A'}
          </div>
          <div>
            <strong>First Party ID Type:</strong> {agreement.first_party_id_type}
          </div>
          <div>
            <strong>First Party Signature:</strong> {agreement.first_party_signature || 'N/A'}
          </div>
          <div>
            <strong>Second Party Address:</strong> {agreement.second_party_address}
          </div>
          <div>
            <strong>Second Party Valid ID:</strong> {agreement.second_party_valid_id || 'N/A'}
          </div>
          <div>
            <strong>Second Party Country:</strong> {agreement.second_party_country || 'N/A'}
          </div>
          <div>
            <strong>Second Party ID Type:</strong> {agreement.second_party_id_type || 'N/A'}
          </div>
          <div>
            <strong>Second Party Signature:</strong> {agreement.second_party_signature || 'N/A'}
          </div>
          <div>
            <strong>Created At:</strong> {new Date(agreement.created_at).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Modal for editing agreement */}
      <Modal
        isOpen={isEditorOpen}
        onRequestClose={() => setIsEditorOpen(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Edit Agreement</h2>
          <textarea
            value={editorContent}
            onChange={(e) => setEditorContent(e.target.value)}
            rows="10"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="mt-4">
            <button
              onClick={handleSave}
              className="mr-2 p-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditorOpen(false)}
              className="p-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Page;
