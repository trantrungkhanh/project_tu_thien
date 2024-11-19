import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

export default function NavbarBreadcrumbs(selectedContent) {
  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      <Typography variant="body1">Quản lí ADMIN</Typography>
      {selectedContent.data === 'home' && (
        <>
          <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
            Trang chủ
          </Typography>
        </>
      )}
      {selectedContent.data === 'campaign_management' && (
        <>
          <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
            Quản lí chiến dịch
          </Typography>
        </>
      )}
      {selectedContent.data === 'charity_management' && (
        <>
          <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
            Quản lí tổ chức từ thiện
          </Typography>
        </>
      )}
      {selectedContent.data === 'user_management' && (
        <>
          <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
            Quản lí người dùng
          </Typography>
        </>
      )}
      {selectedContent.data === 'donate_management' && (
        <>
          <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
            Quản lí quyên góp
          </Typography>
        </>
      )}

    </StyledBreadcrumbs>
  );
}
