"use client"
import React, { useEffect, useState } from 'react';
import Slugnav from '../components/slugnav';
import { format } from 'date-fns';

const Page = ({ params }) => {
  const [agreement, setAgreement] = useState(null);
  const [loading, setLoading] = useState(true);

  const slug = params?.slug || [];
  const [key, value] = slug;

  useEffect(() => {
    if (key === "access_token") {
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
      } else {
        console.error('Failed to fetch agreement by access token');
      }
    } catch (error) {
      console.error('Error fetching agreement by access token:', error);
    } finally {
      setLoading(false);
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
        <span className="text-[0.8em] mt-2 w-fit flex text-wrap font-bold bg-gradient-to-r br border-slate-800 px-2 py-[0.8] border from-[#19B1D2] to-[#0094FF] bg-clip-text text-transparent">

            {agreement.agreementType}
        </span>
          </div>
          <div className='w-full px-3 '>
  <span className="">Second Party Address</span>
  <span className="br w-fit mt-2 overflow-hidden flex border-slate-800 px-2 py-[0.8] border text-[0.7em] text-[#9B9292] whitespace-nowrap overflow-ellipsis">
    {`${agreement.second_party_address}`}
  </span>
</div>




        <div className='w-full px-3 flex flex-col md:flex-row gap-2'>
  <span className="flex-shrink-0 mr-2">Time Stamp:</span>
  <span className="bg-gradient-to-r from-[#19B1D2] to-[#0094FF] bg-clip-text text-transparent">{formattedDate}</span>
</div>

        

        </div>

        <div className="space-y-2">
          <div>
            <strong>ID:</strong> {agreement.id}
          </div>
          <div>
            <strong>Content:</strong> {agreement.content}
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
            <strong>First Party Valid ID:</strong> {agreement.first_party_valid_id}
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
    </div>
  );
};

export default Page;
