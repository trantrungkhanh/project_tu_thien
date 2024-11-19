import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Divider, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import callProtectedApi from '../../services/ProtectedApi';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import { formatCurrency, formatDateTime } from '../../services/Ultis'

const DonationHistory = () => {
  // Giả sử bạn đã có dữ liệu từ API
  const [donationHistory, setDonationHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { accountId } = useParams();
  const navigate = useNavigate();

  const statusMap = {
    0: 'Đang chờ xử lý',
    1: 'Đã hoàn thành',
    2: 'Đã hủy',
  };

  const transferTypeMap = {
    1: 'Ví Momo',
    2: 'Chuyển khoản ngân hàng',
    3: 'Tiền mặt trực tiếp',
  };

  const getCardBackgroundColor = (status) => {
    switch (status) {
      case 0:
        return '#fcd19f'; // Trạng thái "Đang chờ xử lý"
      case 1:
        return '#91f2ab'; // Trạng thái "Đã hoàn thành"
      case 2:
        return '#a19689'; // Trạng thái "Đã hủy"
      default:
        return 'lightgray'; // Trạng thái mặc định
    }
  };

  useEffect(() => {
    // Gọi API khi component được render
    const callAuthenApi = async () => {
      const isAuthen = await callProtectedApi(accountId);
      if (!isAuthen) {
        navigate('/403')
      }
    };

    callAuthenApi();

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/donation-by-account', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token"),
          },
          body: JSON.stringify({ accountId: accountId }),
        });
        if (response.ok) {
          const data = await response.json();
          setDonationHistory(data.data.donation_list)
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
        <Box sx={{ padding: '2rem', paddingTop: '11vh' }}>
          <Typography variant="h4" sx={{
            color: '#b58449',
            textAlign: 'center', marginBottom: '1.5rem', fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },  // Tăng kích thước chữ
            fontWeight: 'bold'
          }}>
            Lịch sử quyên góp
          </Typography>
          <Grid container spacing={2}>
            {donationHistory.map((donation, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card variant="outlined" sx={(theme) => ({
                  backgroundColor: getCardBackgroundColor(donation.status),  // Gọi hàm ở đây
                  marginBottom: 2,
                  padding: 2,
                  color: 'white',  // Màu chữ trắng để tương phản với màu nền
                })}>
                  <CardContent>
                    <Typography variant="h6">{donation.donorName}</Typography>
                    <Typography variant="body2" color="text.primary">
                    <span style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>Mã quyên góp: #{donation.id}</span>
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                    <span style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>Chiến dịch: </span> {donation.campaign_name}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                    <span style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>Tổ chức: </span> {donation.charity_name}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                    <span style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>Số tiền: </span> {formatCurrency(donation.amount)}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                    <span style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>Hình thức: </span> {transferTypeMap[donation.transfer_type] || 'Chưa xác định'}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                    <span style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>Trạng thái: </span> {statusMap[donation.status] || 'Chưa xác định'}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                    <span style={{ fontWeight: 'bold', fontSize: '1.0rem' }}>Ngày: </span> {formatDateTime(donation.created_at)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default DonationHistory;