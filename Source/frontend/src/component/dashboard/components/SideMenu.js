import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SelectContent from './SelectContent';
import MenuContent from './MenuContent';
import CardAlert from './CardAlert';
import OptionsMenu from './OptionsMenu';
import Logo from '../../../assets/images/logo_new.png'

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu(props) {
  // Hàm xử lý khi nhấn vào nút trong SideMenu
  const handleMenuClick = (content) => {
    props.onMenuClick(content)
  };

  const UserAvatar = ({ username }) => {
    // Lấy chữ cái đầu tiên của username
    const initial = username.charAt(0).toUpperCase();

    return (
      <Avatar sizes="small"
        alt="Riley Carter"
        sx={{ width: 36, height: 36 }}>{initial}</Avatar>
    );
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center', // Căn giữa theo chiều ngang
          alignItems: 'center', // Căn giữa theo chiều dọc
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          p: 1.5,
        }}
      >
        <img src={Logo} alt="Logo" style={{ height: 'auto', width: '6vw' }} />
      </Box>
      <Divider />
      <MenuContent onMenuClick={handleMenuClick} />
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <UserAvatar username={props.data.username} />
        <Box sx={{ mr: 'auto' }}>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            {props.data.username}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {props.data.full_name}
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
    </Drawer>
  );
}
