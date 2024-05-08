"use client"
import React, { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Typography from '@mui/material/Typography';
import { Button, Card, CardActions, CardContent } from '@mui/material';

const Service = () => {
  // State to track whether the content is expanded or not
  const [expanded, setExpanded] = useState(false);

  // Function to toggle content expansion
  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Navbar />
      {/* Hero section with full-width background image */}
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url('/hero.jpg')` }}>
        <div className="absolute inset-0 bg-[#090909] opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold">Custos Diretriz Services</h1>
        </div>
      </div>

      {/* Card section */}
      <div className="container mx-auto my-8">
        <div className="flex flex-col">
          {/* Card 1 */}
          <Card sx={{ border: '2px solid', borderColor: 'linear-gradient(to bottom right, #3c1e3a, #8a2be2)', borderRadius: '10px', transition: 'transform 0.2s', '&:hover': { border: '2px solid transparent', background: 'linear-gradient(to bottom right, #3c1e3a, #8a2be2)', color: 'white', boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)' } }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" sx={{ color: 'white' }}>
                Agreement
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ color: 'white' }}>
                The Agreement smart contract enables the creation, signing, and validation of legal agreements between two parties on the Ethereum blockchain.
              </Typography>
              {expanded && (
                <Typography variant="body2" color="text.secondary" sx={{ color: 'white' }}>
                  Additional details about the agreement...
                </Typography>
              )}
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button size="small" color="primary" onClick={handleToggle}>
                {expanded ? 'Show Less' : 'Show More'}
              </Button>
            </CardActions>
          </Card>

          {/* Card 2 */}
          <Card sx={{ border: '2px solid', borderColor: 'linear-gradient(to bottom right, #3c1e3a, #8a2be2)', borderRadius: '10px', transition: 'transform 0.2s', '&:hover': { border: '2px solid transparent', background: 'linear-gradient(to bottom right, #3c1e3a, #8a2be2)', color: 'white', boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)' } }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" sx={{ color: 'white' }}>
                Eye witness
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ color: 'white' }}>
                The Witness Eye revolutionizes the way individuals contribute to societal safety by offering a cutting-edge platform for documenting and sharing crime events securely and transparently.
              </Typography>
              {expanded && (
                <Typography variant="body2" color="text.secondary" sx={{ color: 'white' }}>
                  Additional details about the Eye Witness service...
                </Typography>
              )}
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button size="small" color="primary" onClick={handleToggle}>
                {expanded ? 'Show Less' : 'Show More'}
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Service;
