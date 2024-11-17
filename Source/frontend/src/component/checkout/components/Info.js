import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Stack } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { formatCurrency , formatDateTime} from '../../../services/Ultis'

// Danh sách hình ảnh cho slider
const images = [];

// Thông tin chiến dịch mẫu
const campaignInfo = {
  title: 'Chiến dịch cứu trợ miền Trung',
  description: 'Chiến dịch nhằm hỗ trợ các gia đình bị ảnh hưởng bởi bão lũ tại miền Trung.',
  organizer: 'Quỹ từ thiện XYZ',
  totalRaised: '$50,000',
  goal: '$100,000',
};
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
    ...theme.applyStyles('dark', {
      backgroundColor: '#308fe8',
    }),
  },
}));

export default function CampaignPage(campaignData) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [percentProgress, setPercentProgress] = useState(0);
  for (const campaignImage of campaignData.data.campaign_image) {
    images.push(campaignImage.path)
  }
  // Chuyển hình ảnh trước đó
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // Chuyển hình ảnh kế tiếp
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  // Tự động chuyển hình ảnh sau mỗi 5 giây
  useEffect(() => {
    const autoSlide = setInterval(() => {
      nextSlide();
    }, 5000); // 5 giây

    return () => clearInterval(autoSlide); // Xóa interval khi component unmount
  }, []);

  useEffect(() => {
    setPercentProgress(Math.floor((parseInt(campaignData.data.budget, 10) * 100) / parseInt(campaignData.data.budget_requirement, 10)))
  }, [campaignData]);

  return (
    <Box sx={{ width: '100%', margin: '0 auto', mt: 4 }}>
      {/* Slider hình ảnh */}
      <Box
        sx={{
          position: 'relative',
          mb: 3,
          width: '100%',
          height: '300px', // Cố định chiều cao
          overflow: 'hidden', // Ẩn phần hình ảnh dư ra
          borderRadius: '8px',
        }}
      >
        <Box
          component="img"
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover', // Đảm bảo ảnh lấp đầy khung
          }}
        />

        {/* Nút điều hướng */}
        <IconButton
          onClick={prevSlide}
          sx={{
            position: 'absolute',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>

        <IconButton
          onClick={nextSlide}
          sx={{
            position: 'absolute',
            top: '50%',
            right: 0,
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      {/* Thông tin chiến dịch */}
      <Stack spacing={2} sx={{ textAlign: 'center', p: 2, backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <Typography variant="h4" fontWeight="bold">
          {campaignData.data.name}
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          {campaignData.data.charity_name}
        </Typography>
        <BorderLinearProgress variant="determinate" value={percentProgress} />
        <Typography variant="body1">
          {formatCurrency(campaignData.data.budget)} / {formatCurrency(campaignData.data.budget_requirement)}
        </Typography>
      </Stack>
    </Box>
  );
}
