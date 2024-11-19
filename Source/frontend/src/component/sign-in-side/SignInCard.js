import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';

import ForgotPassword from './ForgotPassword';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

export default function SignInCard() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignupClick = (event) => {
    event.preventDefault(); // Ngăn chặn tải lại trang
    navigate('/sign-up'); // Điều hướng đến trang đăng ký
  };

  const expirationTime = new Date().getTime() + 60 * 60 * 1000;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);
      const response = await fetch('http://localhost:5000/api/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.get('username'),
          password: data.get('password'),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.code === 200) {
          localStorage.setItem('token', data.token); // Lưu token vào localStorage
          localStorage.setItem('user_info', JSON.stringify(data.user_info))
          localStorage.setItem('token_expiry', expirationTime.toString());
          const prevLocation = localStorage.getItem("prev_location");
          if (prevLocation !== '/home' && prevLocation) {
            navigate(prevLocation)
          } else {
            if (data.user_info.role === 'admin') {
              navigate('/home-admin');
            } else {
              navigate('/home'); // Chuyển hướng sang trang Home sau khi đăng nhập thành công
            }
          }


        } else {
          setMessage(data.message);
        }

      } else {
        const errorData = await response.json();
        setMessage(errorData.message);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate('/home')
    }

  }, []);

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', color: '#b58449' }}
      >
        Đăng Nhập
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="username">Tài khoản</FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="username"
            type="text"
            name="username"
            placeholder="Tài khoản"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={emailError ? 'error' : 'primary'}
          />
        </FormControl>
        <FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormLabel htmlFor="password">Mật khẩu</FormLabel>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: 'baseline' }}
            >
              Quên mật khẩu
            </Link>
          </Box>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            required
            fullWidth
            variant="outlined"
            color={passwordError ? 'error' : 'primary'}
          />
        </FormControl>
        <ForgotPassword open={open} handleClose={handleClose} />
        <Typography sx={{ textAlign: 'center', color: 'red' }}>
          {message}
        </Typography>
        <Button type="submit" fullWidth variant="text" sx={{
          color: 'white',
          backgroundColor: '#b58449', // Màu nền
          '&:hover': {
            backgroundColor: '#584840', // Màu nền khi hover
          }
        }}>
          Đăng nhập
        </Button>
        <Typography sx={{ textAlign: 'center' }}>
          Chưa có tài khoản?{' '}
          <span>
            <Link
              onClick={handleSignupClick}
              variant="body2"
              sx={{ cursor: 'pointer', alignSelf: 'center' }}
            >
              Đăng kí ngay!
            </Link>
          </span>
        </Typography>
      </Box>
    </Card>
  );
}
