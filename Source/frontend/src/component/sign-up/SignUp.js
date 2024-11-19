import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../shared-theme/AppTheme';
import { MenuItem, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import Logo from '../../assets/images/logo_new.png';
import { CircularProgress } from '@mui/material';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
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

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignUp(props) {
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [charityNameError, setCharityNameError] = React.useState(false);
  const [charityNameErrorMessage, setcharityNameErrorMessage] = React.useState('');
  const [otpError, setOtpError] = React.useState(false);
  const [otpErrorMessage, setOtpErrorMessage] = React.useState('');
  const [role, setRole] = React.useState('contributor');
  const [otp, setOtp] = React.useState('');
  const [countryCode, setCountryCode] = React.useState('+84');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [charityName, setCharityName] = React.useState('');
  const [isSignUpSuccess, setIsSignUpSuccess] = React.useState(false);
  const [loadingSendOtp, setLoadingSendOtp] = React.useState(false);
  const navigate = useNavigate();

  const validateInputs = () => {

    let isValid = true;

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Mật khẩu phải có độ dài lớn hơn 6 kí tự.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!name || name.length < 1) {
      setNameError(true);
      setNameErrorMessage('Vui lòng nhập tên');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    if (!username || username.length < 1) {
      setUsernameError(true);
      setUsernameErrorMessage('Vui lòng nhập tài khoản');
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage('');
    }

    if (!otp || otp.length < 1) {
      setOtpError(true);
      setOtpErrorMessage('Vui lòng nhập OTP');
      isValid = false;
    } else {
      setOtpError(false);
      setOtpErrorMessage('');
    }

    if (role === 'charity') {
      if (!charityName || charityName.length < 1) {
        setCharityNameError(true);
        setcharityNameErrorMessage('Vui lòng nhập tên tổ chức từ thiện.');
        isValid = false;
      } else {
        setCharityNameError(false);
        setcharityNameErrorMessage('');
      }
    }


    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('Vui lòng nhập đúng định dạng email');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    return isValid;
  };


  const handleSubmit = (event) => {
    if (nameError || usernameError || passwordError || emailError || charityNameError || otpError) {
      event.preventDefault();
      return;
    }
    event.preventDefault();

    window.confirmationResult.confirm(otp).then((result) => {
      handleRegister()
    }).catch((error) => {
      setOtpError(true);
      setOtpErrorMessage('OTP không đúng, vui lòng thử lại');
      console.log(error)
    });

    handleRegister()

  };

  const handleSigninClick = (event) => {
    event.preventDefault(); // Ngăn chặn tải lại trang
    navigate('/sign-in'); // Điều hướng đến trang đăng ký
  };

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // OK
      },
      'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
      }
    });
  }

  const handleSendOtp = async (e) => {
    setLoadingSendOtp(true)
    const phoneNumberWithCountryCode = countryCode + phoneNumber;
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumberWithCountryCode, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoadingSendOtp(false)
      }).catch((error) => {
        setOtpError(true);
        setOtpErrorMessage('Có lỗi khi gửi OTP, vui lòng thử lại sau');
        setLoadingSendOtp(false)
      });
  };

  const handleRegister = async (e) => {
    //e.preventDefault();
    const phoneNumberWithCountryCode = countryCode + phoneNumber;
    try {
      const response = await fetch('http://localhost:5000/api/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, name, role, password, phoneNumberWithCountryCode, email, charityName }),
      });

      if (response.ok) {
        setIsSignUpSuccess(true)
        setMessage("Tạo tài khoản thành công! Vui lòng đăng nhập");
      } else {
        const errorData = await response.json();
        setIsSignUpSuccess(false)
        setMessage(errorData.message);
      }
    } catch (error) {
      setIsSignUpSuccess(false)
      setMessage('Lỗi tạo tài khoản không thành công');
    }
  }

  React.useEffect(() => {
    setupRecaptcha();
  }, [role]);

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <img src={Logo} alt="Logo" style={{ height: 'auto', width: '6vw' }} />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Đăng kí tài khoản
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="role">Chọn vài trò</FormLabel>
              <Select
                labelId="role-select-label"
                id="role-select"
                value={role}
                label="Chọn vai trò"
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="contributor">Người đóng góp</MenuItem>
                <MenuItem value="charity">Tổ chức từ thiện</MenuItem>
                <MenuItem value="recipient">Người nhận hỗ trợ</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="name">Họ và tên</FormLabel>
              <TextField
                autoComplete="name"
                name="name"
                fullWidth
                id="name"
                placeholder='Họ và tên'
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? 'error' : 'primary'}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            {role === 'charity' ? (
              <FormControl>
                <FormLabel htmlFor="name">Tên tổ chức từ thiện</FormLabel>
                <TextField
                  autoComplete="charityName"
                  name="charityName"
                  fullWidth
                  id="charityName"
                  placeholder='Tên tổ chức'
                  error={charityNameError}
                  helperText={charityNameErrorMessage}
                  color={charityNameError ? 'error' : 'primary'}
                  onChange={(e) => setCharityName(e.target.value)}
                />
              </FormControl>
            ) : (
              null
            )}
            <FormControl>
              <FormLabel htmlFor="username">Tên tài khoản</FormLabel>
              <TextField
                fullWidth
                id="username"
                placeholder="Tên tài khoản"
                name="username"
                variant="outlined"
                error={usernameError}
                helperText={usernameErrorMessage}
                color={usernameError ? 'error' : 'primary'}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Mật khẩu</FormLabel>
              <TextField
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? 'error' : 'primary'}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email/Thư điện tử</FormLabel>
              <TextField
                fullWidth
                id="email"
                placeholder="Email/Thư điện tử"
                name="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={emailError ? 'error' : 'primary'}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="phoneNumber">Số điện thoại</FormLabel>
              <Box display="flex" alignItems="center">
                <Select
                  labelId="country-code-label"
                  id="country-code-select"
                  value={countryCode}
                  label="Mã vùng"
                  sx={{ marginRight: 1 }}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  <MenuItem value="+1">+1 (US)</MenuItem>
                  <MenuItem value="+84">+84 (VN)</MenuItem>
                  <MenuItem value="+44">+44 (UK)</MenuItem>
                  <MenuItem value="+61">+61 (AU)</MenuItem>
                </Select>
                <TextField
                  fullWidth
                  name="phoneNumber"
                  placeholder="123 987 789"
                  type="text"
                  id="phoneNumber"
                  variant="outlined"
                  color="primary"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Box>
            </FormControl>

            <Box display="flex" alignItems="center">
              <TextField
                label="Nhập OTP"
                variant="filled"
                value={otp}
                error={otpError}
                helperText={otpErrorMessage}
                color={otpError ? 'error' : 'primary'}
                onChange={(e) => setOtp(e.target.value)}
                sx={{ marginRight: 1 }}
              />
              <Button
                variant="text"
                color="primary"
                onClick={handleSendOtp}
                sx={{
                  width: '50%',
                  color: 'white',
                  backgroundColor: '#b58449', // Màu nền
                  '&:hover': {
                    backgroundColor: '#584840', // Màu nền khi hover
                  }
                }}
                disabled={loadingSendOtp}
              >
                {loadingSendOtp ? <CircularProgress size={24} color="inherit" /> : 'Gửi OTP'}
              </Button>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="text"
              onClick={validateInputs}
              sx={{
                color: 'white',
                backgroundColor: '#b58449', // Màu nền
                '&:hover': {
                  backgroundColor: '#584840', // Màu nền khi hover
                }
              }}
            >
              Đăng kí
            </Button>
            <Typography
              color={isSignUpSuccess ? 'green' : 'red'}
              sx={{ textAlign: 'center' }}>
              {message}
            </Typography>
            <Typography sx={{ textAlign: 'center', fontSize: '1.0rem', fontWeight: 'bold' }}>
              Đã có tài khoản?{' '}
              <span>
                <Link
                  onClick={handleSigninClick}
                  variant="body2"
                  sx={{ cursor: 'pointer', alignSelf: 'center', color: '#b58449', fontSize: '1.0rem', fontWeight: 'bold' }}
                >
                  Đăng nhập
                </Link>
              </span>
            </Typography>
            <div id="sign-in-button"></div>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
