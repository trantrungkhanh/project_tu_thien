import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQ = React.forwardRef((data, ref) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container
      ref={ref}
      id="faq"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        sx={{
          color: '#b58449',
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },  // Tăng kích thước chữ
          fontWeight: 'bold', // Làm chữ đậm
        }}
      >
        Các câu hỏi thường gặp
      </Typography>
      <Box sx={{ width: '100%' }}>
        {data.data.map((faq, index) => (
          <Accordion
            key={faq.id}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography component="h3" variant="subtitle2" size="medium" sx={{fontWeight: 'bold', fontSize: '1.2rem'}}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                variant="body2"
                size="medium"
                gutterBottom
                sx={{ maxWidth: { sm: '100%', md: '70%' }, fontSize: '1.1rem' }}
              >
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
});

export default FAQ;