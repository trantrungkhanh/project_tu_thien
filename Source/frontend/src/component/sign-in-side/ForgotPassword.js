import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import { CircularProgress } from '@mui/material';
import { Typography } from '@mui/material';

function ForgotPassword({ open, handleClose }) {
  const [to, setTo] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);


  const handleResetPassword = async (e) => {
    try {
      e.preventDefault();
      setLoading(true); // Bắt đầu loading
      setMessage(''); // Xóa thông báo cũ
      const response = await fetch('http://localhost:5000/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to: to }),
      });

      if (response.ok) {
        setMessage('Gửi email thành công! Vui lòng kiểm tra email');
      } else {
        setMessage('Gửi email thất bại! Vui lòng thử lại sau');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Kết thúc loading
      setTimeout(() => {
        handleClose(); // Đóng hộp thoại
        setMessage('')
      }, 5000); // Đóng sau 2 giây để hiển thị thông báo
    }

  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        sx: { backgroundImage: 'none' },
      }}
    >
      <DialogTitle>Đặt lại mật khẩu</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        {message && (<>
          <Typography component="h3" variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {message}
          </Typography>
        </>)}
        <DialogContentText sx={{ fontSize: '1.2rem' }}>
          Vui lòng nhập email bạn đã đăng kí, chúng tôi sẽ gửi mật khẩu mới đến hộp thư cho bạn!
        </DialogContentText>
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          label="Địa chỉ email"
          placeholder="Địa chỉ email"
          type="email"
          fullWidth
          onChange={(e) => setTo(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Hủy</Button>
        <Button variant="text" onClick={(e) => handleResetPassword(e)} sx={{
          color: 'white',
          backgroundColor: '#b58449', // Màu nền
          '&:hover': {
            backgroundColor: '#584840', // Màu nền khi hover
          }
        }}
          disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Gửi email'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ForgotPassword.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ForgotPassword;
