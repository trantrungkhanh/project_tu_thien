import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Logo from '../../../assets/images/logo_new.png';
import { visuallyHidden } from '@mui/utils';
import { styled } from '@mui/material/styles';
const images = [
  '/resource/home/home_landing_1.png',
  '/resource/home/home_landing_2.png',
  '/resource/home/home_landing_3.png',
  // Thêm URL ảnh khác tại đây
];
const StyledBox = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  width: '100%',
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  outline: '6px solid',
  outlineColor: 'hsla(220, 25%, 80%, 0.2)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.grey[200],
  boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transition: 'background-image 1s ease-in-out',
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(10),
    height: 700,
  },
  ...theme.applyStyles('dark', {
    boxShadow: '0 0 24px 12px hsla(210, 100%, 25%, 0.2)',
    outlineColor: 'hsla(220, 20%, 42%, 0.1)',
    borderColor: (theme.vars || theme).palette.grey[700],
  }),
}));

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Thay đổi ảnh mỗi 3 giây

    return () => clearInterval(intervalId); // Dọn dẹp interval khi unmount
  }, []);
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
          'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
        ...theme.applyStyles('dark', {
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
        }),
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              fontSize: 'clamp(3rem, 10vw, 3.5rem)',
              color: '#b58449'
            }}
          >
            Chào&nbsp;mừng&nbsp;bạn&nbsp;đến&nbsp;với&nbsp;chúng&nbsp;tôi&nbsp;
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              width: { sm: '100%', md: '80%' },
              fontSize: '1.2rem'
            }}
          >
            <Typography
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
            </Typography>&nbsp;
            là nền tảng quản lý chiến dịch từ thiện – nơi kết nối những tấm lòng nhân ái với những người thực sự cần giúp đỡ!
            Chúng tôi không chỉ là một trang web, mà còn là người bạn đồng hành cùng bạn trên hành trình sẻ chia yêu thương, lan tỏa sự quan tâm đến cộng đồng.
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              width: { sm: '100%', md: '80%' },
              fontSize: '1.2rem'
            }}
          >
            Với sứ mệnh hỗ trợ các tổ chức từ thiện tổ chức và quản lý các chiến dịch, chúng tôi cung cấp công cụ để các chiến dịch được triển khai minh bạch và dễ dàng hơn.
            Dù bạn là người đóng góp muốn hỗ trợ bằng bất cứ hình thức nào, hay là người cần nhận hỗ trợ, nền tảng này cho phép bạn theo dõi tình hình đóng góp và sự phát triển của từng chiến dịch. Từ những chiến dịch cộng đồng nhỏ đến những đợt quyên góp quy mô lớn, tất cả đều được chúng tôi tối ưu để tạo sự thuận tiện và minh bạch nhất.
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              width: { sm: '100%', md: '80%' },
              fontSize: '1.2rem'
            }}
          >
            Hãy cùng chúng tôi lan tỏa tình yêu thương và xây dựng một cộng đồng vững mạnh, sẵn sàng sát cánh vì tương lai tươi sáng hơn!
          </Typography>
        </Stack>
        <StyledBox
          sx={{
            backgroundImage: `url(${images[currentImageIndex]})`,
          }}
        />
      </Container>
    </Box>
  );
}
