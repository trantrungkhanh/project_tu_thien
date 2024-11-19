import * as React from 'react';

import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './components/AppNavbar';
import Header from './components/Header';
import MainGrid from './components/MainGrid';
import SideMenu from './components/SideMenu';
import UserManagement from './components/UserManagement';
import CharityManagement from './components/CharityManagement';
import CampaignManagement from './components/CampaignManagement';
import DonateManagement from './components/DonateManagement'
import AppTheme from '../shared-theme/AppTheme';
import { useNavigate } from 'react-router-dom';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './theme/customizations';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props) {
  const navigate = useNavigate();

  const [selectedContent, setSelectedContent] = React.useState('content1'); // Trạng thái lưu nội dung đã chọn

  // Hàm xử lý khi nhấn vào nút trong SideMenu
  const handleMenuClick = (content) => {
    setSelectedContent(content);
  };

  function isTokenExpired() {
    const expirationTime = localStorage.getItem('token_expiry');
    const currentTime = new Date().getTime();

    return currentTime > expirationTime; // Nếu thời gian hiện tại lớn hơn thời gian hết hạn, thì token đã hết hạn
  }

  const userInfo = JSON.parse(localStorage.getItem('user_info'));

  const renderContent = () => {
    switch (selectedContent) {
      case 'user_management':
        return <UserManagement />;
      case 'campaign_management':
        return <CampaignManagement />;
      case 'charity_management':
        return <CharityManagement />;
      case 'donate_management':
        return <DonateManagement />;
      default:
        return <CampaignManagement />;
    }
  };

  React.useEffect(() => {

    if (isTokenExpired()) {
      // Token đã hết hạn, có thể yêu cầu đăng nhập lại
      localStorage.removeItem('token');
      localStorage.removeItem('user_info');
      localStorage.removeItem('token_expiry');
      navigate('/sign-in')
    }

  }, []);

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu data={userInfo} onMenuClick={handleMenuClick} />
        <AppNavbar />
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header data={selectedContent}/>
            {renderContent()}
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
