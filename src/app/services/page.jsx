"use client";
import React, { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Typography from '@mui/material/Typography';
import { Button, Card, CardActions, CardContent, CardMedia, Slide } from '@mui/material';

const Service = () => {
  const [expanded, setExpanded] = useState(false);
  const [currentProcess, setCurrentProcess] = useState(null);

  const processes = [
    {
      title: "Eye Witness",
      content: [
        "Revolutionizing Crime Reporting: The Crime Recording App transforms the way individuals contribute to societal safety by providing an advanced platform for documenting and sharing crime events securely and transparently.",
        "User-Centric Design: With its intuitive interface, the app empowers users to easily log detailed information about crime events, including descriptions, locations, timestamps, and supporting multimedia evidence.",
        "Blockchain Integration: By leveraging blockchain technology, the app ensures the integrity and immutability of recorded data, instilling trust in the authenticity of reported incidents and enhancing the platform's credibility.",
        "Privacy and Security: The app prioritizes user privacy and security, employing robust encryption and authentication measures to safeguard sensitive information. Users retain full control over their data and can manage permissions to share details with authorized parties.",
        "Meta-Transaction Support: One of the app's standout features is its support for meta-transactions, enabling users to interact with the blockchain without the need for cryptocurrency or gas fees, thus lowering barriers to participation.",
        "Community Engagement: Beyond documentation, the app fosters community engagement and collaboration towards crime prevention and intervention. Users can share insights, collaborate on initiatives, and address safety concerns within their neighborhoods, empowering individuals to make tangible contributions to a safer society."
      ]
    },
    {
      title: "Agreement",
      content: [
        "Create Agreements: Users can create new legal agreements by providing the agreement content, the address of the second party, and details about the first party.",
        "Sign Agreements: The second party can sign an agreement by providing their full name and valid ID. Once signed, the agreement status is updated to reflect this action.",
        "Validate Signatures: The creator of an agreement can validate the signatures of both parties, confirming that the agreement has been signed by all relevant parties.",
        "Access Agreement Details: Users can retrieve details of specific agreements, including the creator, content, second party's address, first party's name and valid ID, and the signed status.",
        "List All Agreements: Users can retrieve a list of all agreement IDs for easy access to agreement details."
      ]
    }
  ];

  const handleToggle = (process) => {
    if (currentProcess === process) {
      setExpanded(!expanded);
    } else {
      setCurrentProcess(process);
      setExpanded(true);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url('/hero.jpg')` }}>
        <div className="absolute inset-0 bg-[#090909] opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold">Custos Diretriz Services</h1>
        </div>
      </div>

      <div className="flex mx-auto my-8">
        {processes.map((process, index) => (
          <div key={index} className="mr-8">
            <Card sx={{ border: '2px solid', borderRadius: '10px', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}>
              <CardMedia
                component="img"
                height="200"
                image={`/${process.title.toLowerCase()}_image.jpg`}
                alt={`${process.title} Image`}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ color: '#333', fontWeight: 'bold' }}>
                  {process.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {process.content[0]}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button size="small" color="primary" onClick={() => handleToggle(process)}>
                  {expanded && currentProcess === process ? 'Close' : 'How it works'}
                </Button>
              </CardActions>
            </Card>
            {expanded && currentProcess === process && (
              <div className="my-8">
                <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: '16px' }}>{currentProcess.title}</Typography>
                <div className="sliding-div">
                  {currentProcess.content.map((step, index) => (
                    <Slide direction="up" in={expanded} timeout={index * 500} key={index}>
                      <div className="slide-content">
                        <Typography variant="body2" color="text.secondary">
                          {step}
                        </Typography>
                      </div>
                    </Slide>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
