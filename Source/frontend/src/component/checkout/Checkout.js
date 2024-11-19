import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Info from './components/Info';
import InfoMobile from './components/InfoMobile';
import Review from './components/Review';
import AppTheme from '../shared-theme/AppTheme';
import { useLocation, useParams } from 'react-router-dom';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';

import Alert from '@mui/material/Alert';
import CardActionArea from '@mui/material/CardActionArea';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';


import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

import { QRPay, BanksObject } from 'vietnam-qr-pay';
import { QRCodeCanvas } from 'qrcode.react';
import callProtectedApi from '../../services/ProtectedApi';
import { useNavigate } from 'react-router-dom';

const images = [];
const donationInfo = {};

const banks = Object.entries(BanksObject).map(([key, value]) => ({
  ...value,
  code: key
}));

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

function removeDiacriticsAndSpecialChars(str) {
  // Loại bỏ dấu bằng cách chuẩn hóa và thay thế
  const noDiacritics = str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  
  // Loại bỏ ký tự đặc biệt, chỉ giữ lại chữ cái và số
  const cleanString = noDiacritics.replace(/[^a-zA-Z0-9\s]/g, "");

  return cleanString;
}

const Card2 = styled(Card)(({ theme }) => ({
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  width: '100%',
  '&:hover': {
    background:
      'linear-gradient(to bottom right, hsla(210, 100%, 97%, 0.5) 25%, hsla(210, 100%, 90%, 0.3) 100%)',
    borderColor: 'primary.light',
    boxShadow: '0px 2px 8px hsla(0, 0%, 0%, 0.1)',
    ...theme.applyStyles('dark', {
      background:
        'linear-gradient(to right bottom, hsla(210, 100%, 12%, 0.2) 25%, hsla(210, 100%, 16%, 0.2) 100%)',
      borderColor: 'primary.dark',
      boxShadow: '0px 1px 8px hsla(210, 100%, 25%, 0.5) ',
    }),
  },
  [theme.breakpoints.up('md')]: {
    flexGrow: 1,
    maxWidth: `calc(50% - ${theme.spacing(1)})`,
  },
  variants: [
    {
      props: ({ selected }) => selected,
      style: {
        borderColor: (theme.vars || theme).palette.primary.light,
        ...theme.applyStyles('dark', {
          borderColor: (theme.vars || theme).palette.primary.dark,
        }),
      },
    },
  ],
}));

const PaymentContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  height: 375,
  padding: theme.spacing(3),
  borderRadius: `calc(${theme.shape.borderRadius}px + 4px)`,
  border: '1px solid ',
  borderColor: (theme.vars || theme).palette.divider,
  background:
    'linear-gradient(to bottom right, hsla(220, 35%, 97%, 0.3) 25%, hsla(220, 20%, 88%, 0.3) 100%)',
  boxShadow: '0px 4px 8px hsla(210, 0%, 0%, 0.05)',
  [theme.breakpoints.up('xs')]: {
    height: 300,
  },
  [theme.breakpoints.up('sm')]: {
    height: 350,
  },
  ...theme.applyStyles('dark', {
    background:
      'linear-gradient(to right bottom, hsla(220, 30%, 6%, 0.2) 25%, hsla(220, 20%, 25%, 0.2) 100%)',
    boxShadow: '0px 4px 8px hsl(220, 35%, 0%)',
  }),
}));

const steps = ['Thông tin người đóng góp', 'Thông tin thanh toán'];
function getStepContent(step, campaignData) {
  switch (step) {
    case 0:
      return <GetAddressForm />;
    case 1:
      return <GetPaymentForm data={campaignData}/>;
    default:
      throw new Error('Unknown step');
  }
}

function GetAddressForm() {
  const [fullName, setFullName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [city, setCity] = React.useState('');
  const [state, setState] = React.useState('');
  const [amount, setAmount] = React.useState('');

  const formatToVND = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const handleChange = (event) => {
    // Loại bỏ dấu phân cách, chỉ giữ lại chữ số
    const value = event.target.value.replace(/\D/g, '');
    setAmount(value);
    donationInfo["amount"] = value;
  }

  const handleChangeFullName = (event) => {
    setFullName(event.target.value);
    donationInfo["fullName"] = event.target.value;
  }

  const handleChangeAddress = (event) => {
    setAddress(event.target.value);
    donationInfo["address"] = event.target.value;
  }

  const handleChangeCity = (event) => {
    setCity(event.target.value);
    donationInfo["city"] = event.target.value;
  }

  const handleChangeState = (event) => {
    setState(event.target.value);
    donationInfo["state"] = event.target.value;
  }

  React.useEffect(() => {

  }, []);

  return (
    <Grid container spacing={3}>
      <FormGrid size={{ xs: 24, md: 12 }}>
        <FormLabel htmlFor="first-name" required>
          Họ và tên
        </FormLabel>
        <OutlinedInput
          id="first-name"
          name="first-name"
          type="name"
          placeholder="Người đóng góp"
          required
          onChange={(e) => handleChangeFullName(e)}
          value={donationInfo.fullName}
          size="medium"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="address1" required>
          Địa chỉ
        </FormLabel>
        <OutlinedInput
          id="address1"
          name="address1"
          type="address1"
          placeholder="Địa chỉ người đóng góp"
          onChange={(e) => handleChangeAddress(e)}
          value={donationInfo.address}
          required
          size="meidum"
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="city" required>
          Thành phố
        </FormLabel>
        <OutlinedInput
          id="city"
          name="city"
          type="city"
          placeholder="Nha Trang"
          onChange={(e) => handleChangeCity(e)}
          value={donationInfo.city}
          required
          size="medium"
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="state" required>
          Tỉnh
        </FormLabel>
        <OutlinedInput
          id="state"
          name="state"
          type="state"
          placeholder="Khánh Hòa"
          onChange={(e) => handleChangeState(e)}
          value={donationInfo.state}
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="amount" required>
          Số tiền quyên góp
        </FormLabel>
        <OutlinedInput
          id="amount"
          name="amount"
          type="text"
          placeholder="10000000"
          required
          size="medium"
          value={formatToVND(donationInfo.amount)}
          onChange={handleChange}
        />
      </FormGrid>
    </Grid>
  );
}

function GetPaymentForm(data) {
  const [paymentType, setPaymentType] = React.useState('momo');
  const [cardNumber, setCardNumber] = React.useState('');
  const [cvv, setCvv] = React.useState('');
  const [expirationDate, setExpirationDate] = React.useState('');

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  React.useEffect(() => {
    switch (paymentType) {
      case "momo":
        donationInfo["transfer_type"] = 1
        break;
      case "bankTransfer":
        donationInfo["transfer_type"] = 2
        break;
      case "cash":
        donationInfo["transfer_type"] = 3
        break;
      default:
        donationInfo["transfer_type"] = 1
        break;
    }
  }, [paymentType]);


  const MomoQRCode = ({}) => {
    if (parseInt(donationInfo.amount,10) > 10000000) {
      return (
        <div>
          <p>Không hỗ trợ số tiền vượt quá 10.000.000 VNĐ</p>
        </div>
      );
    }
    // Tạo chuỗi URL cho QR Momo
    const momoQR = QRPay.initVietQR({
      bankBin: data.data.bank,
      bankNumber: data.data.momo_account,
      amount: donationInfo.amount, // Số tiền (không bắt buộc)
      purpose: 'Chuyen tien ung ho ' + removeDiacriticsAndSpecialChars(data.data.name) , // Nội dung (không bắt buộc)
    })

    // Trong mã QR của MoMo có chứa thêm 1 mã tham chiếu tương ứng với STK
    momoQR.additionalData.reference = 'MOMOW2W' + data.data.momo_account.slice(10)

    // Mã QR của MoMo có thêm 1 trường ID 80 với giá trị là 3 số cuối của SỐ ĐIỆN THOẠI của tài khoản nhận tiền
    momoQR.setUnreservedField('80', '046')

    const content = momoQR.build()

    return (
      <div>
        <QRCodeCanvas value={content} size={200} />
      </div>
    );
  };

  const VietQRCode = ({}) => {
    // Tạo chuỗi URL cho QR Momo
    const vietQR = QRPay.initVietQR({
      bankBin: data.data.bank,
      bankNumber: data.data.bank_account,
      amount: donationInfo.amount, // Số tiền (không bắt buộc)
      purpose: 'Chuyen tien ung ho ' + removeDiacriticsAndSpecialChars(data.data.name) , // Nội dung (không bắt buộc)
    })
    const content = vietQR.build()

    return (
      <div>
        <QRCodeCanvas value={content} size={200} />
      </div>
    );
  };

  return (
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          aria-label="Payment options"
          name="paymentType"
          value={paymentType}
          onChange={handlePaymentTypeChange}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
          }}
        >
          <Card selected={paymentType === 'momo'}>
            <CardActionArea
              onClick={() => setPaymentType('momo')}
              sx={{
                '.MuiCardActionArea-focusHighlight': {
                  backgroundColor: 'transparent',
                },
                '&:focus-visible': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CreditCardRoundedIcon
                  fontSize="small"
                  sx={[
                    (theme) => ({
                      color: 'grey.400',
                      ...theme.applyStyles('dark', {
                        color: 'grey.600',
                      }),
                    }),
                    paymentType === 'momo' && {
                      color: 'primary.main',
                    },
                  ]}
                />
                <Typography sx={{ fontWeight: 'medium' }}>Chuyển khoản momo</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card selected={paymentType === 'bankTransfer'}>
            <CardActionArea
              onClick={() => setPaymentType('bankTransfer')}
              sx={{
                '.MuiCardActionArea-focusHighlight': {
                  backgroundColor: 'transparent',
                },
                '&:focus-visible': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccountBalanceRoundedIcon
                  fontSize="small"
                  sx={[
                    (theme) => ({
                      color: 'grey.400',
                      ...theme.applyStyles('dark', {
                        color: 'grey.600',
                      }),
                    }),
                    paymentType === 'bankTransfer' && {
                      color: 'primary.main',
                    },
                  ]}
                />
                <Typography sx={{ fontWeight: 'medium' }}>Chuyển khoản ngân hàng</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card selected={paymentType === 'cash'}>
            <CardActionArea
              onClick={() => setPaymentType('cash')}
              sx={{
                '.MuiCardActionArea-focusHighlight': {
                  backgroundColor: 'transparent',
                },
                '&:focus-visible': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocalAtmIcon
                  fontSize="small"
                  sx={[
                    (theme) => ({
                      color: 'grey.400',
                      ...theme.applyStyles('dark', {
                        color: 'grey.600',
                      }),
                    }),
                    paymentType === 'cash' && {
                      color: 'primary.main',
                    },
                  ]}
                />
                <Typography sx={{ fontWeight: 'medium' }}>Đóng góp trực tiếp</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </RadioGroup>
      </FormControl>
      {paymentType === 'cash' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Alert severity="warning" icon={<WarningRoundedIcon />}>
            Chúng tôi sẽ cập nhật trạng thái lần quyên góp này của bạn khi chúng tôi nhận được tiền quyên góp
          </Alert>
          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
            Đóng góp trực tiếp
          </Typography>
          <Typography variant="body1" gutterBottom>
            Xin vui lòng đến địa điểm nhận đóng góp của chiến dịch
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Tỉnh/Thành phố:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              {data.data.location}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Địa chỉ:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              {data.data.address}
            </Typography>
          </Box>
        </Box>
      )}
      {paymentType === 'bankTransfer' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Alert severity="warning" icon={<WarningRoundedIcon />}>
            Chúng tôi sẽ cập nhật trạng thái lần quyên góp này của bạn khi chúng tôi nhận được tiền quyên góp
          </Alert>
          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
            Chuyển khoản ngân hàng
          </Typography>
          <Typography variant="body1" gutterBottom>
            Xin vui lòng chuyển khoản vào thông tin tài khoản như bên dưới
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Ngân hàng:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              {banks.find(bank => bank.bin === data.data.bank).name}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Số tài khoản:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              {data.data.bank_account}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Nội dung chuyển khoản:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
            Chuyen tien ung ho {removeDiacriticsAndSpecialChars(data.data.name)}
            </Typography>
          </Box>
          <Typography variant="body2" color="#b58449" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            Hoặc quét mã QR
          </Typography>
          <VietQRCode />
        </Box>
      )}
      {paymentType === 'momo' && (
        <Box sx={{
          display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'center',  // Căn giữa theo chiều ngang
          alignItems: 'center'
        }}>
          <Typography variant="body2" color="#ef3bff" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            MoMo QR Code
          </Typography>
          <MomoQRCode />
          <Typography variant="body1" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            Quét mã QR để chuyển khoản
          </Typography>
        </Box>
      )}
    </Stack>
  );
}

export default function Checkout(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const { campaignId } = useParams();
  const [campaignData, setCampaignData] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [accountId, setAccountId] = React.useState('');
  const [transferType, setTransferType] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [donationId, setDonationId] = React.useState('');
  const [messageError, setMessageError] = React.useState('');
  const navigate = useNavigate();
  const handleNext = async () => {
    if (!validateInputs()) {
      return;
    }
    if (activeStep == 1) {
      donationInfo["campaign_id"] = campaignId
      donationInfo["account_id"] = accountId
      try {
        const response = await fetch('http://localhost:5000/api/donation-create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token"),
          },
          body: JSON.stringify({ donationInfo }),
        });
        if (response.ok) {
          setActiveStep(activeStep + 1);
          const data = await response.json();
          setDonationId(data.data.donation_id)
        } else {
          const errorData = await response.json();
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      setActiveStep(activeStep + 1);
    }

  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const validateInputs = () => {
    let isValid = true;
    if (!donationInfo["fullName"] || donationInfo["fullName"].length < 1) {
      setMessageError('Vui lòng nhập họ và tên.');
      isValid = false;
      return isValid;
    }

    if (!donationInfo["address"] || donationInfo["address"].length < 1) {
      setMessageError('Vui lòng nhập địa chỉ');
      isValid = false;
      return isValid;
    }

    if (!donationInfo["city"] || donationInfo["city"].length < 1) {
      setMessageError('Vui lòng nhập thành phố.');
      isValid = false;
      return isValid;
    }

    if (!donationInfo["state"] || donationInfo["state"].length < 1) {
      setMessageError('Vui lòng nhập tỉnh.');
      isValid = false;
      return isValid;
    }

    if (!donationInfo["amount"] || donationInfo["amount"].length < 1) {
      setMessageError('Vui lòng nhập số tiền.');
      isValid = false;
      return isValid;
    }

    setMessageError('')
    return isValid;
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const userInfo = JSON.parse(localStorage.getItem('user_info'));
    if (token) {
      setIsLoggedIn(true);
      setAccountId(userInfo.id)
    } else {
      navigate('/403')
    }


    const callAuthenApi = async () => {
      const isAuthen = await callProtectedApi(userInfo.id);
      if (!isAuthen) {
        navigate('/403')
      }
    };

    callAuthenApi();
    // Gọi API khi component được render
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/campaign-detail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ campaignId }),
        });
        if (response.ok) {
          const data = await response.json();
          setCampaignData(data.data.campaign)
          for (const campaignImg of data.data.campaign.campaign_image) {
            images.push(campaignImg.path)
          }
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
        <Grid
          container
          sx={{
            height: {
              xs: '100%',
              sm: 'calc(100dvh - var(--template-frame-height, 0px))',
            },
            mt: {
              xs: 4,
              sm: 0,
            },
          }}
        >
          <Grid
            size={{ xs: 12, sm: 5, lg: 4 }}
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              backgroundColor: '#e0cab1',
              borderRight: { sm: 'none', md: '1px solid' },
              borderColor: { sm: 'none', md: 'divider' },
              alignItems: 'start',
              mt: 16,
              mb: 16,
              px: 10,
              gap: 4,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                width: '100%',
                maxWidth: 500,
              }}
            >
              <Info data={campaignData} />
            </Box>
          </Grid>
          <Grid
            size={{ sm: 12, md: 7, lg: 8 }}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '100%',
              width: '100%',
              backgroundColor: { xs: 'transparent', sm: 'background.default' },
              alignItems: 'start',
              pt: { xs: 0, sm: 16 },
              px: { xs: 2, sm: 10 },
              gap: { xs: 4, md: 8 },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: { sm: 'space-between', md: 'flex-end' },
                alignItems: 'center',
                width: '100%',
                maxWidth: { sm: '100%', md: 600 },
              }}
            >
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  flexGrow: 1,
                }}
              >
                <Stepper
                  id="desktop-stepper"
                  activeStep={activeStep}
                  sx={{ width: '100%', height: 40 }}
                >
                  {steps.map((label) => (
                    <Step
                      sx={{ ':first-child': { pl: 0 }, ':last-child': { pr: 0 } }}
                      key={label}
                    >
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Box>
            <Typography variant="subtitle2" sx={{ color: 'red' }}>
              {messageError}
            </Typography>
            <Card sx={{ display: { xs: 'flex', md: 'none' }, width: '100%' }}>
              <CardContent
                sx={{
                  display: 'flex',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <Typography variant="subtitle2" gutterBottom>
                    Selected products
                  </Typography>
                  <Typography variant="body1">
                    {activeStep >= 2 ? '$144.97' : '$134.98'}
                  </Typography>
                </div>
                <InfoMobile totalPrice={activeStep >= 2 ? '$144.97' : '$134.98'} />
              </CardContent>
            </Card>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                width: '100%',
                maxWidth: { sm: '100%', md: 600 },
                maxHeight: '720px',
                gap: { xs: 5, md: 'none' },
              }}
            >
              <Stepper
                id="mobile-stepper"
                activeStep={activeStep}
                alternativeLabel
                sx={{ display: { sm: 'flex', md: 'none' } }}
              >
                {steps.map((label) => (
                  <Step
                    sx={{
                      ':first-child': { pl: 0 },
                      ':last-child': { pr: 0 },
                      '& .MuiStepConnector-root': { top: { xs: 6, sm: 12 } },
                    }}
                    key={label}
                  >
                    <StepLabel
                      sx={{ '.MuiStepLabel-labelContainer': { maxWidth: '70px' } }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length ? (
                <Stack spacing={2} useFlexGap>
                  <Typography variant="h1">❤️</Typography>
                  <Typography variant="h5">Cảm ơn sự đóng góp của bạn!</Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Mã hóa đơn quyên góp của bạn là
                    <strong>&nbsp;#{donationId}</strong>. Chúng tôi sẽ cập nhật trạng thái liên tục về sự đóng góp của bạn
                  </Typography>
                </Stack>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep, campaignData)}
                  <Box
                    sx={[
                      {
                        display: 'flex',
                        flexDirection: { xs: 'column-reverse', sm: 'row' },
                        alignItems: 'end',
                        flexGrow: 1,
                        gap: 1,
                        pb: { xs: 12, sm: 0 },
                        mt: { xs: 2, sm: 0 },
                        mb: '60px',
                      },
                      activeStep !== 0
                        ? { justifyContent: 'space-between' }
                        : { justifyContent: 'flex-end' },
                    ]}
                  >
                    {activeStep !== 0 && (
                      <Button
                        startIcon={<ChevronLeftRoundedIcon />}
                        onClick={handleBack}
                        variant="text"
                        sx={{ display: { xs: 'none', sm: 'flex' } }}
                      >
                        Quay lại
                      </Button>
                    )}
                    {activeStep !== 0 && (
                      <Button
                        startIcon={<ChevronLeftRoundedIcon />}
                        onClick={handleBack}
                        variant="outlined"
                        fullWidth
                        sx={{ display: { xs: 'flex', sm: 'none' } }}
                      >
                        Quay lại
                      </Button>
                    )}
                    <Button
                      variant="text"
                      endIcon={<ChevronRightRoundedIcon />}
                      onClick={handleNext}
                      sx={{
                        width: { xs: '100%', sm: 'fit-content' }, color: 'white',
                        backgroundColor: '#b58449', // Màu nền
                        '&:hover': {
                          backgroundColor: '#584840', // Màu nền khi hover
                        }
                      }}
                    >
                      {activeStep === steps.length - 1 ? 'Hoàn thành' : 'Kế tiếp'}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
