import React, { useState, useEffect } from 'react';
import { CssBaseline, Container, Box, List, ListItem, ListItemText, Typography, Stack, TextField, Button, Divider } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import callProtectedApi from '../../services/ProtectedApi';
import { formatCurrency, formatDateTime } from '../../services/Ultis'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { CircularProgress } from '@mui/material';

function CampaignTimelinePage() {
  const [selectedCampaign, setSelectedCampaign] = useState(7);
  const [loading, setLoading] = useState(true);
  const { accountId } = useParams();
  const [campaignData, setCamapaignData] = useState([]);
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const handleCampaignClick = (id) => {
    setSelectedCampaign(id);
  };

  const handleAddTimelineEvent = async () => {
    try {
      setLoadingUpdate(true)
      const response = await fetch('http://localhost:5000/api/campaign-news-add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ campaignId: selectedCampaign, content }),
      });
      if (response.ok) {
        setLoadingUpdate(false)
        navigate(0);
      } else {
        setLoadingUpdate(false)
        const errorData = await response.json();
      }
    } catch (error) {
      setLoadingUpdate(false)
      console.log(error)
    }
  };

  useEffect(() => {
    const callAuthenApi = async () => {
      const isAuthen = await callProtectedApi(accountId);
      if (!isAuthen) {
        navigate('/403')
      }
    };

    callAuthenApi();
    // Gọi API khi component được render
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/campaign-news', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ account_id: accountId }),
        });
        if (response.ok) {
          const data = await response.json();
          setCamapaignData(data.data.campaigns)
          setSelectedCampaign(data.data.campaigns[0].id)
          setLoading(false);
        } else {
          const errorData = await response.json();
          setLoading(false);
        }
      } catch (error) {
        console.log(error)
      }
    };

    fetchData();

  }, []);

  if (loading) {
    return;  // Hoặc bạn có thể hiển thị một spinner
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box sx={{
          display: 'flex', gap: 2, p: 3, marginTop: '10vh', bgcolor: '#bfaf9d',
          height: 'auto', padding: 4,
          borderRadius: 2,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}>
          {/* Left side: Campaign List */}
          <Box sx={{ width: '30%' }}>
            <Typography variant="h6">Danh sách Chiến dịch</Typography>
            <List>
              {campaignData.map((campaign) => (
                <ListItem
                  key={campaign.id}
                  button
                  selected={campaign.id === selectedCampaign}
                  onClick={() => handleCampaignClick(campaign.id)}
                >
                  <ListItemText primary={campaign.name} />
                </ListItem>
              ))}
            </List>
          </Box>
          {/* Divider between the two sections */}
          <Divider orientation="vertical" flexItem sx={{ borderWidth: '2px', borderColor: 'grey.300' }} />

          {/* Right side: Campaign Timeline */}
          <Box sx={{ width: '70%' }}>
            <Typography variant="h6">Tình hình của {campaignData.find(c => c.id === selectedCampaign)?.name}</Typography>
            <Timeline>
              {(campaignData.find(c => c.id === selectedCampaign).campaign_news || []).map((event, index) => (
                <TimelineItem key={index}>
                  <TimelineOppositeContent color="text.secondary">
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold', fontSize: '1.0rem' }}>{formatDateTime(event.created_at)}</Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color={index < campaignData.find(c => c.id === selectedCampaign).campaign_news.length - 1 ? 'success' : 'secondary'} />
                    {index < campaignData.find(c => c.id === selectedCampaign).campaign_news.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1.0rem' }}>{event.content_1}</Typography>
                  </TimelineContent>
                </TimelineItem>


              ))}

            </Timeline>

            {/* Form to Add New Timeline Event */}
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Cập nhật tình hình mới</Typography>
            <Stack spacing={2} direction="row">
              <TextField sx={{ width: '80%' }}
                label="Nội dung"
                variant="filled"
                value={content}
                rows={3}
                multiline
                onChange={(e) => setContent(e.target.value)}
              />
              <Button variant="text" sx={{
                width: '20%',
                color: 'white',
                backgroundColor: '#b58449', // Màu nền
                '&:hover': {
                  backgroundColor: '#584840', // Màu nền khi hover
                }
              }} onClick={handleAddTimelineEvent}
                disabled={loadingUpdate}
              >{loadingUpdate ? <CircularProgress size={24} color="inherit" /> : 'Thêm'}</Button>
            </Stack>'
          </Box>
        </Box>
      </Container>
    </React.Fragment>

  );
}

export default CampaignTimelinePage;
