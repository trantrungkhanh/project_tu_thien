import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import PageviewIcon from '@mui/icons-material/Pageview';
import { useNavigate } from 'react-router-dom';
import {formatCurrency, formatDateTime} from '../../../services/Ultis'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Charity({ data, ref }) {
  const navigate = useNavigate();

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleViewDetail = (campaignId) => {
    navigate(`/campaign-detail/${campaignId}`);
  }

  const status = {
    0: 'Chuẩn bị',
    1: 'Đang tổ chức',
    2: 'Đã kết thúc',
  };

  return (
    <Container
      ref={ref}
      id="faq"
      sx={{
        pt: { xs: 4, sm: 10 },
        pb: { xs: 6, sm: 12 },
        px: { xs: 2, sm: 4 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        backgroundColor: 'background.default',
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        sx={{
          color: '#b58449',
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
          mb: { xs: 2, sm: 4 },
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
          fontWeight: 'bold',
        }}
      >
        Danh sách tổ chức <br /> Các chiến dịch từ thiện
      </Typography>

      <Box sx={{ width: '100%' }}>
        {data.map((charity, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            sx={{
              mb: 2,
              borderRadius: 1,
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              sx={{
                bgcolor: '#b58449',
                borderBottom: '1px solid',
                borderColor: 'divider',
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                },
                '&:hover': {
                  backgroundColor: '#584840', // Màu nền khi hover
                }
              }}
            >
              <Typography component="h3" variant="subtitle1" sx={{ fontWeight: 'bold', color: 'white' }}>
                {charity.name}
              </Typography>
            </AccordionSummary>

            {charity.campaign_list.map((campaign, idx) => (
              <AccordionDetails key={idx} sx={{ bgcolor: 'grey.20', pl: 4, borderBottom: '1px solid', borderColor: '#163980', }}>
                <Grid container alignItems="center" spacing={3} sx={{ py: 1, justifyContent: 'space-between' }}>
                  {/* Tên chiến dịch */}
                  <Grid item sx={{ width: '30%' }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary', fontWeight: 'bold', fontSize: '1.5rem' }}>
                      {campaign.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>Tỉnh/ Thành phố: </span> {campaign.location}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>Địa chỉ: </span> {campaign.address}
                    </Typography>
                  </Grid>

                  {/* Ngân sách */}
                  <Grid item sx={{ width: '15%' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>Ngân sách dự kiến: </span>{formatCurrency(campaign.budget_requirement)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>Ngân sách hiện tại: </span>{formatCurrency(campaign.budget)}
                    </Typography>
                  </Grid>

                  <Grid item sx={{ width: '25%' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>Trạng thái: </span>{status[campaign.status] || 'Chưa xác định'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>Ngày bắt đầu: </span>{formatDateTime(campaign.started_at)}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>Ngày kết thúc: </span>{formatDateTime(campaign.ended_at)}
                    </Typography>
                  </Grid>

                  {/* Nút Đóng góp */}
                  <Grid item textAlign="right" sx={{ display: 'flex', justifyContent: 'flex-end', width: '15%' }}>
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => handleViewDetail(campaign.id)}
                      sx={{
                        textTransform: 'none',
                        fontSize: '0.875rem',
                        padding: '6px 16px',
                        color: 'white',
                        backgroundColor: '#b58449', // Màu nền
                        '&:hover': {
                          backgroundColor: '#584840', // Màu nền khi hover
                        }
                      }}
                    >
                      <PageviewIcon /> &nbsp; Xem chi tiết
                    </Button>
                  </Grid>
                </Grid>
              </AccordionDetails>
            ))}
          </Accordion>
        ))}
      </Box>
    </Container>
  );
}