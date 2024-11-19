import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Sitemark from './SitemarkIcon';
import ColorModeIconDropdown from '../../shared-theme/ColorModeIconDropdown';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../assets/images/logo_new.png';
import { Avatar, Menu } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Charity from './Charity';


const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

export default function AppAppBar({ onCharityClick, onChartClick, onTestimonialClick, onNewsClick, onFAQClick }) {
  const [open, setOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({});
  const [charity, setCharity] = React.useState({});
  const [loading, setLoading] = React.useState(false)
  const [isCharityLive, setIsCharityLive] = React.useState(false);
  const location = useLocation();
  React.useEffect(() => {
    const fetchCharityInfo = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
        setUserInfo(JSON.parse(localStorage.getItem('user_info')));

        try {
          const response = await fetch('http://localhost:5000/api/charity-info', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accountId: JSON.parse(localStorage.getItem('user_info')).id }),
          });

          if (response.ok) {
            const data = await response.json();
            if (data.data.charity[0].status === 1) {
              setIsCharityLive(true);
            }
          } else {
            const errorData = await response.json();
            console.error('Error:', errorData);
          }
        } catch (error) {
          console.error('Fetch error:', error);
        }
      }
    };

    fetchCharityInfo();
  }, []);

  const navigate = useNavigate();
  const handleSignInClick = () => {
    localStorage.setItem('prev_location', location.pathname);
    navigate('/sign-in'); // Chuyển hướng đến trang đăng ký
  };

  const handleSignUpClick = () => {
    navigate('/sign-up'); // Chuyển hướng đến trang đăng ký
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    // Xử lý đăng xuất
    localStorage.removeItem("token");
    localStorage.removeItem('user_info');
    localStorage.removeItem('token_expiry');
    localStorage.removeItem('prev_location');
    setIsLoggedIn(false);
    navigate('/home')
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfilePage = () => {
    setAnchorEl(null);
    navigate(`/profile-edit/${userInfo.id}`);
  }

  const handleDonateHistoryPage = () => {
    setAnchorEl(null);
    navigate(`/donate-history/${userInfo.id}`)
  }

  const handlCampaignManagementPage = () => {
    setAnchorEl(null);
    navigate(`/campaign-management/${userInfo.id}`)
  }

  const handlCampaignTimelinePage = () => {
    setAnchorEl(null);
    navigate(`/campaign-timeline/${userInfo.id}`)
  }

  const handleLogoClick = () => {
    navigate("/home");
  }

  const UserAvatar = ({ username }) => {
    // Lấy chữ cái đầu tiên của username
    const initial = username.charAt(0).toUpperCase();

    return (
      <Avatar sx={{ bgcolor: '#b58449' }}>{initial}</Avatar>
    );
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Box
              component="button"
              onClick={handleLogoClick} // Đặt hàm xử lý hành động ở đây
              sx={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                display: 'inline-flex',
              }}
            >
              <img src={Logo} alt="Logo" style={{ height: 'auto', width: '6vw' }} />
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex', marginLeft: '2vw' } }}>
              <Button variant="text" color="info" size="medium" onClick={onCharityClick} sx={{ fontWeight: 'bold' }}>
                Tổ chức từ thiện
              </Button>
              {/* <Button variant="text" color="info" size="medium" onClick={onChartClick} sx={{ fontWeight: 'bold' }}>
                Tình hình quyên góp
              </Button> */}
              <Button variant="text" color="info" size="medium" onClick={onTestimonialClick} sx={{ fontWeight: 'bold' }}>
                Đánh giá
              </Button>
              <Button variant="text" color="info" size="medium" sx={{ minWidth: 0, fontWeight: 'bold' }} onClick={onNewsClick}>
                Tin tức
              </Button>
              <Button variant="text" color="info" size="medium" sx={{ minWidth: 0, fontWeight: 'bold' }} onClick={onFAQClick}>
                FAQ
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            {isLoggedIn ? (
              <>
                {/* Avatar Icon with Dropdown */}
                <IconButton onClick={handleAvatarClick} sx={{ p: 0, border: 'none', background: 'none' }}>
                  <UserAvatar username={userInfo.username} />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={isMenuOpen}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={() => { /* Navigate to profile */ handleProfilePage(); }}>Hồ sơ cá nhân</MenuItem>
                  {userInfo.role === 'contributor' && (
                    <MenuItem onClick={() => { /* Navigate to settings */ handleDonateHistoryPage(); }}>Lịch sử quyên góp</MenuItem>
                  )}
                  {userInfo.role === 'charity' && isCharityLive ? (
                    <>
                      <MenuItem onClick={() => { /* Navigate to settings */ handlCampaignManagementPage(); }}>Quản lí chiến dịch</MenuItem>
                      <MenuItem onClick={() => { /* Navigate to settings */ handlCampaignTimelinePage(); }}>Tình hình chiến dịch</MenuItem></>

                  ) : (
                    null
                  )}
                  <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                </Menu>
              </>
            ) : (
              <div>
                <Button color="primary" variant="text" size="medium" onClick={handleSignInClick}>
                  Đăng nhập
                </Button>
                <Button variant="text" size="medium" onClick={handleSignUpClick} sx={{
                  color: 'white',
                  backgroundColor: '#b58449', // Màu nền
                  '&:hover': {
                    backgroundColor: '#584840', // Màu nền khi hover
                  }
                }}>
                  Đăng kí
                </Button>
              </div>
            )}
            <ColorModeIconDropdown size="medium" />
          </Box>

        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
