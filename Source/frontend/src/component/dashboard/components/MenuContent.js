import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BusinessIcon from '@mui/icons-material/Business';
import CampaignIcon from '@mui/icons-material/Campaign';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

const mainListItems = [
  { text: 'Quản lí chiến dịch', icon: <CampaignIcon />, value: 'campaign_management' },
  { text: 'Quản lí tổ chức từ thiện', icon: <BusinessIcon />, value: 'charity_management'},
  { text: 'Quản lí người dùng', icon: <ManageAccountsIcon />, value: 'user_management'},
  { text: 'Quản lí quyên góp', icon: <VolunteerActivismIcon />, value: 'donate_management'},
];


export default function MenuContent(onMenuClick) {
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const handleMenuClick = (value, index) => {
    setSelectedIndex(index); // Cập nhật chỉ số của item đã được chọn
    onMenuClick.onMenuClick(value); // Gọi hàm onMenuClick với giá trị tương ứng
  };
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton selected={selectedIndex === index}
             onClick={() => handleMenuClick(item.value, index)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
