import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';


const Highlights = React.forwardRef((props, ref) => {
  const [visibleArticles, setVisibleArticles] = React.useState([]);
  const [intervalId, setIntervalId] = React.useState(null);

  // Hàm để chọn 9 item ngẫu nhiên
  const getRandomItems = (items) => {
    const shuffled = [...items].sort(() => 0.5 - Math.random()); // Xáo trộn mảng
    return shuffled.slice(0, 9); // Lấy 9 item đầu tiên
  };

  React.useEffect(() => {
    // Khởi tạo danh sách 9 item đầu tiên
    setVisibleArticles(getRandomItems(props.articles));

    // Cập nhật danh sách mỗi 5 giây
    const id = setInterval(() => {
      setVisibleArticles(getRandomItems(props.articles));
    }, 5000); // Cập nhật mỗi 5000ms (5 giây)

    // Cleanup khi component bị unmount
    return () => clearInterval(id);
  }, [props.articles]); // Chỉ thực thi lại khi props.articles thay đổi

  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
      }}
    >
      <Container
        ref={ref}
        sx={{
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
          <Typography component="h2" variant="h4" gutterBottom sx={{
            color: '#b58449',
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },  // Tăng kích thước chữ
            fontWeight: 'bold', // Làm chữ đậm
          }}>
            Tin tức trong ngày
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
            Luôn cập nhật tin tức từ các trang báo uy tín, nhầm mang lại thông tin nhanh và chính xác nhất cho người dùng 🔥🔥🔥
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {visibleArticles.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'white'}}>
                <Stack
                  direction="column"
                  component={Card}
                  spacing={1}
                  useFlexGap
                  sx={{
                    color: 'inherit',
                    p: 3,
                    height: '100%',
                    borderColor: 'hsla(220, 25%, 25%, 0.3)',
                    backgroundColor: '#b58449',
                  }}
                >
                  <img src={item.thumbnail} alt="image_thumbnail" />
                  <div>
                    <Typography gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'white' }}>
                      {item.summary}
                    </Typography>
                  </div>
                </Stack>
              </a>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
});

export default Highlights;
