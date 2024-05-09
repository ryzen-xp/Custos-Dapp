"use client";
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Content, Slide } from '@mui/material';
import { Box } from '@mui/system'; 
import Navbar from '@/components/navbar';

const Service = () => {
  const [expanded, setExpanded] = useState(false);
  const [currentProcess, setCurrentProcess] = useState(null);

  const ExpandMore = styled(Button)(({ theme, expand }) => ({
    transform:!expand? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  
  const processes = [
    {
      title: "Eye Witness",
      imageUrl: "eyewitness.jpeg", // Corrected property name
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
      imageUrl: "legalagreement.png", 
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
    setCurrentProcess(process);
    console.log(process);
    setExpanded(!expanded);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col px-6 mx-auto my-8 w-2/3">
        {processes.map((process, index) => (
          <div key={index} className="mb-8">
            <Card sx={{ border: '2px solid', borderRadius: '10px', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.05)' } }}>
              <Typography gutterBottom={true} variant="h5" component="div" sx={{ color: '#333', fontWeight: 'bold', textAlign: 'center' }}>
                {process.title}
              </Typography>
              <CardMedia
                component="img"
                height="200" 
                src={`/${process.imageUrl}`}
                alt={`${process.title}`}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {process.content[0]}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <ExpandMore
                  expand={expanded && currentProcess == process}
                  onClick={() => handleToggle(process)}
                  aria-expanded={expanded && currentProcess === process}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
            </Card>
            <Collapse in={expanded && currentProcess == process}>
              <CardContent>
                <Box className="my-8">
                  {currentProcess?.content.map((step, index) => (
                    <div key={index} className="text-white">
                      <Typography variant="body2" color="text.primary">
                        {step}
                      </Typography>
                    </div>
                  ))}
                </Box>
              </CardContent>
            </Collapse>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;