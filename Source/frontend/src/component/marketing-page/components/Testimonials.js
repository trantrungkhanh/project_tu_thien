import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/system';
import Logo from '../../../assets/images/logo_new.png';
import { Star, StarBorder } from '@mui/icons-material';


const UserAvatar = ({ username }) => {
  // Lấy chữ cái đầu tiên của username
  const initial = username.charAt(0).toUpperCase();

  return (
    <Avatar sx={{ bgcolor: '#b58449' }}>{initial}</Avatar>
  );
};

const Testimonials = React.forwardRef((data, ref) => {

  const ratingListData = [];
  for (const charity of data.data) {
    const campaignList = charity.campaign_list;
    for (const campaign of campaignList) {
      const ratingList = campaign.campaign_rating;
      for (const rating of ratingList) {
        rating["campaign_name"] = campaign.name;
        rating["charity_name"] = charity.name;
        ratingListData.push(rating);
      }
    }
  }

  const shuffled = ratingListData.sort(() => Math.random() - 0.5);
  // Lấy `count` phần tử đầu tiên
  const ratingListDataRandom =  shuffled.slice(0, 9);

  return (
    <Container
      ref={ref}
      id="testimonials"
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
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{
            color: '#b58449',
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },  // Tăng kích thước chữ
            fontWeight: 'bold', // Làm chữ đậm
          }}
        >
          Đánh giá về các tổ chức từ thiện
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.2rem' }}>
          Hãy xem các bình luận, đánh giá về các tổ chức từ thiện và các chiến dịch trên hệ thống của &nbsp;<Typography
            component="span"
            variant="h1"
            sx={(theme) => ({
              fontSize: 'inherit',
              color: 'primary.main',
              ...theme.applyStyles('dark', {
                color: 'primary.light',
              }),
            })}
          >
            <img src={Logo} alt="Logo" style={{ height: 'auto', width: '4vw' }} />
          </Typography>&nbsp; nhé
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {ratingListDataRandom.map((ratingData, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index} sx={{ display: 'flex' }}>
            <Card
              variant="outlined"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
              }}
            >
              <CardContent>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ color: 'text.secondary' }}
                >
                  {ratingData.comment}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <CardHeader
                  avatar={<UserAvatar username={ratingData.username} />}
                  title={ratingData.username}
                  subheader={<Typography variant="body2" color="text.secondary">
                    {ratingData.charity_name}
                    <br />
                    {ratingData.campaign_name}
                  </Typography>}
                />
                <Box sx={{ display: 'flex' }}>
                  {[...Array(5)].map((_, i) => (
                    i < ratingData.rating ? (
                      <Star key={i} sx={{ color: 'gold', fontSize: '1.5rem' }} />
                    ) : (
                      <StarBorder key={i} sx={{ color: 'gold', fontSize: '1.5rem' }} />
                    )
                  ))}
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
});

export default Testimonials;
