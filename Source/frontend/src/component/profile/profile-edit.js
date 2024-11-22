import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel, IconButton, colors } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import callProtectedApi from '../../services/ProtectedApi';
import { CircularProgress } from '@mui/material';
import { BanksObject } from 'vietnam-qr-pay';
import CloseIcon from '@mui/icons-material/Close';

const ProfileEditPage = () => {
    const [selectedMenu, setSelectedMenu] = useState('personalInfo');
    const [imagePreviews, setImagePreviews] = useState(null);
    const [files, setFiles] = useState();
    const [charityName, setCharityName] = useState('');
    const [userInfo, setUserInfo] = useState('');
    const [loading, setLoading] = React.useState(false);
    const [messageUpdatePassword, setMessageUpdatePassword] = React.useState('')
    const [messageUpdateUserInfo, setMessageUpdateUserInfo] = React.useState('')
    const [password, setPassword] = React.useState('');
    const [oldPassword, setOldPassword] = React.useState('');
    const [retryPassword, setRetryPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [fullName, setFullName] = React.useState('');
    const [selectedBank, setSelectedBank] = useState('');
    const [bankAccount, setBankAccount] = React.useState('');
    const [momoAccount, setMomoAccount] = React.useState('');
    const [charityData, setCharityData] = React.useState('');
    const [isCharity, setIsCharity] = React.useState(true);
    const [countdown, setCountdown] = useState(5);
    const [errorUploadMessage, setErrorUploadMessage] = useState('');
    const [isError, setIsError] = useState(false)
    const navigate = useNavigate();

    const { accountId } = useParams();

    const banks = Object.entries(BanksObject).map(([key, value]) => ({
        ...value,
        code: key
    }));

    const status = {
        0: 'Đang chờ duyệt',
        1: 'Đang hoạt động',
        2: 'Dừng hoạt động',
    };



    const handleChange = (event) => {
        setSelectedBank(event.target.value);
    };
    // Hàm để xử lý khi nhấn vào menu
    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    const handleFileUpload = async () => {
        if (imagePreviews == null) {
            setIsError(true)
            setErrorUploadMessage('Cần tải lên hình ảnh giấy phép hoạt động')
            return;
        }
        const formData = new FormData();
        formData.append('name', charityName);
        formData.append('file', files)
        formData.append('accountId', accountId)
        formData.append('bank', selectedBank);
        formData.append('bankAccount', bankAccount);
        formData.append('momoAccount', momoAccount);
        try {
            const response = await fetch('http://localhost:5000/api/charity-update', {
                method: 'POST',
                headers: {
                    'Authorization': localStorage.getItem("token"),
                },
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                setIsError(false)
                setErrorUploadMessage('Cập nhật thông tin thành công!')
            } else {
                console.error('Upload failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleFileChange = (event) => {
        // event.target.files là mảng các file được chọn
        const selectedFiles = event.target.files[0];
        if (selectedFiles) {
            const newFileName = `${Date.now()}-${selectedFiles.name}`;
            const updatedFile = new File([selectedFiles], newFileName, { type: selectedFiles.type });
            setFiles(updatedFile);

            const previews = URL.createObjectURL(updatedFile);
            setImagePreviews(previews);
        }
    };

    const handleUpdatePassword = async (e) => {
        try {
            e.preventDefault();
            if (password !== retryPassword) {
                setMessageUpdatePassword('Mật khẩu không khớp! Vui lòng kiểm tra lại');
                return;
            }

            if (password === oldPassword) {
                setMessageUpdatePassword('Mật khẩu mới không được trùng mật khẩu cũ');
                return;
            }

            setLoading(true); // Bắt đầu loading
            setMessageUpdatePassword(''); // Xóa thông báo cũ
            const response = await fetch('http://localhost:5000/api/update-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ account_id: accountId, password: password, old_password: oldPassword }),
            });

            if (response.ok) {
                setMessageUpdatePassword('Cập nhật mật khẩu thành công! ');
                let count = 5;
                const intervalId = setInterval(() => {
                    count -= 1;
                    setCountdown(count);
                    if (count === 0) {
                        clearInterval(intervalId);
                        localStorage.removeItem("token");
                        localStorage.removeItem("user_info");
                        navigate('/sign-in'); // Điều hướng về trang đăng nhập
                    }
                }, 1000);
            } else {
                const result = await response.json();
                setMessageUpdatePassword(result.message);
                setCountdown(0)
            }
        } catch (error) {
            setMessageUpdatePassword('An error occurred. Please try again.');
        } finally {
            setLoading(false); // Kết thúc loading
            setTimeout(() => {
            }, 5000); // Đóng sau 2 giây để hiển thị thông báo
        }

    }

    const handleUpdateInfo = async (e) => {
        try {
            e.preventDefault();
            setLoading(true); // Bắt đầu loading
            setMessageUpdateUserInfo(''); // Xóa thông báo cũ
            const response = await fetch('http://localhost:5000/api/update-user-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ account_id: accountId, full_name: fullName, email: email }),
            });

            if (response.ok) {
                setMessageUpdateUserInfo('Cập nhật thông tin thành công!');
                setLoading(false); // Kết thúc loading
                userInfo.full_name = fullName;
                userInfo.email = email;
                localStorage.removeItem("user_info");
                localStorage.setItem("user_info", JSON.stringify(userInfo));
            } else {
                const result = await response.json();
                setMessageUpdateUserInfo(result.message);
                setLoading(false); // Kết thúc loading
            }
        } catch (error) {
            setMessageUpdateUserInfo('An error occurred. Please try again.');
            setLoading(false); // Kết thúc loading
        }

    }

    const handleRemoveImage = (indexToRemove) => {
        setImagePreviews(null);
    };

    React.useEffect(() => {
        const callAuthenApi = async () => {
            const isAuthen = await callProtectedApi(accountId);
            if (!isAuthen) {
                navigate('/403')
            }
        };

        callAuthenApi();

        const token = localStorage.getItem("token");
        if (token) {
            setUserInfo(JSON.parse(localStorage.getItem('user_info')));
            setFullName(JSON.parse(localStorage.getItem('user_info')).full_name)
            setEmail(JSON.parse(localStorage.getItem('user_info')).email)
        }

        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/charity-info', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ accountId: accountId }),
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data.data.charity.length === 0) {
                        setIsCharity(false);
                        return;
                    }
                    setCharityData(data.data.charity[0])
                    setCharityName(data.data.charity[0].name)
                    setBankAccount(data.data.charity[0].bank_account)
                    setMomoAccount(data.data.charity[0].momo_account)
                    setSelectedBank(data.data.charity[0].bank)
                    setImagePreviews(data.data.charity[0].file)
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

    return (
        <Box display="flex" width="100%" maxWidth="lg" mx="auto" mt={4} p={2} pt={12}>
            {/* Phần menu bên trái */}
            <Box
                width="25%"
                bgcolor="background.paper"
                borderRight="1px solid #e0e0e0"
                p={2}
                display="flex"
                flexDirection="column"
                gap={2} // Khoảng cách giữa các button
            >
                <Typography variant="h6" mb={2}>Cài đặt hồ sơ</Typography>

                <Button
                    onClick={() => handleMenuClick('personalInfo')}
                    fullWidth
                    sx={{
                        backgroundColor: selectedMenu === 'personalInfo' ? '#b58449' : '#e0e0e0',
                        color: selectedMenu === 'personalInfo' ? '#ffffff' : '#000000',
                        '&:hover': {
                            backgroundColor: selectedMenu === 'personalInfo' ? '#584840' : '#d5d5d5',
                        },
                    }}
                >
                    Thay đổi thông tin cá nhân
                </Button>

                <Button
                    onClick={() => handleMenuClick('changePassword')}
                    fullWidth
                    sx={{
                        backgroundColor: selectedMenu === 'changePassword' ? '#b58449' : '#e0e0e0',
                        color: selectedMenu === 'changePassword' ? '#ffffff' : '#000000',
                        '&:hover': {
                            backgroundColor: selectedMenu === 'changePassword' ? '#584840' : '#d5d5d5',
                        },
                    }}
                >
                    Đổi mật khẩu
                </Button>

                {isCharity && (
                    <Button
                        onClick={() => handleMenuClick('changeCharityInfo')}
                        fullWidth
                        sx={{
                            backgroundColor: selectedMenu === 'changeCharityInfo' ? '#b58449' : '#e0e0e0',
                            color: selectedMenu === 'changeCharityInfo' ? '#ffffff' : '#000000',
                            '&:hover': {
                                backgroundColor: selectedMenu === 'changeCharityInfo' ? '#584840' : '#d5d5d5',
                            },
                        }}
                    >
                        Cập nhật thông tin tổ chức từ thiện
                    </Button>
                )}

            </Box>

            {/* Phần nội dung bên phải */}
            <Box width="75%" p={3}>
                {selectedMenu === 'personalInfo' && (
                    <Box>
                        <Typography variant="h6" mb={2} sx={{
                            color: '#b58449',
                            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },  // Tăng kích thước chữ
                            fontWeight: 'bold', // Làm chữ đậm
                        }}>Thay đổi thông tin cá nhân</Typography>
                        <TextField
                            fullWidth
                            label="Họ và tên"
                            margin="normal"
                            variant="filled"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            margin="normal"
                            variant="filled"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Số điện thoại"
                            margin="normal"
                            variant="filled"
                            value={userInfo.phone}
                            disabled
                        />
                        {messageUpdateUserInfo && (
                            <>
                                <Typography variant="h6" mb={2}>{messageUpdateUserInfo}</Typography>
                            </>
                        )}
                        <Button variant="text" sx={{
                            mt: 2,
                            color: 'white',
                            backgroundColor: '#b58449', // Màu nền
                            '&:hover': {
                                backgroundColor: '#584840', // Màu nền khi hover
                            }
                        }}
                            disabled={loading}
                            onClick={(e) => handleUpdateInfo(e)}>
                            Lưu thay đổi
                        </Button>
                    </Box>
                )}

                {selectedMenu === 'changePassword' && (
                    <Box>
                        <Typography variant="h6" mb={2} sx={{
                            color: '#b58449',
                            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },  // Tăng kích thước chữ
                            fontWeight: 'bold', // Làm chữ đậm
                        }}>Đổi mật khẩu</Typography>
                        <TextField
                            fullWidth
                            label="Mật khẩu hiện tại"
                            type="password"
                            margin="normal"
                            variant="filled"
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Mật khẩu mới"
                            type="password"
                            margin="normal"
                            variant="filled"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Nhập lại mật khẩu mới"
                            type="password"
                            margin="normal"
                            variant="filled"
                            onChange={(e) => setRetryPassword(e.target.value)}
                        />
                        {messageUpdatePassword && (
                            <>
                                <Typography variant="h6" mb={2}>{messageUpdatePassword} </Typography>
                                {countdown > 0 && (
                                    <>
                                        <Typography variant="h6" mb={2}>Chuyển hướng về trang đăng nhập sau {countdown} giây... </Typography>

                                    </>
                                )}
                            </>
                        )}

                        <Button variant="text" sx={{
                            mt: 2,
                            color: 'white',
                            backgroundColor: '#b58449', // Màu nền
                            '&:hover': {
                                backgroundColor: '#584840', // Màu nền khi hover
                            }
                        }}
                            disabled={loading}
                            onClick={(e) => handleUpdatePassword(e)}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Cập nhật mật khẩu'}
                        </Button>
                    </Box>
                )}

                {selectedMenu === 'changeCharityInfo' && (
                    <Box>
                        <Typography variant="h6" mb={2} sx={{
                            color: '#b58449',
                            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },  // Tăng kích thước chữ
                            fontWeight: 'bold', // Làm chữ đậm
                        }}>Thay đổi thông tin tổ chức từ thiện</Typography>
                        <TextField
                            fullWidth
                            label="Tên tổ chức từ thiện"
                            margin="normal"
                            variant="filled"
                            value={charityName}
                            onChange={(e) => setCharityName(e.target.value)}
                        />
                        <FormControl fullWidth>
                            <Select
                                displayEmpty
                                value={selectedBank}
                                onChange={handleChange}
                                renderValue={(selected) => {
                                    if (selected === '' || selected == null) {
                                        return <em>Chọn Ngân hàng</em>; // Placeholder hiển thị khi chưa chọn gì
                                    }
                                    const bank = banks.find(bank => bank.bin === selected);
                                    return bank ? bank.name : '';
                                }}
                            >
                                <MenuItem disabled value="">
                                    <em>Chọn Ngân hàng</em>
                                </MenuItem>
                                {banks.map((bank) => (
                                    <MenuItem key={bank.code} value={bank.bin}>
                                        {bank.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            label="Số tài khoản ngân hàng"
                            margin="normal"
                            variant="filled"
                            value={bankAccount}
                            onChange={(e) => setBankAccount(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Số tài khoản momo"
                            margin="normal"
                            variant="filled"
                            value={momoAccount}
                            onChange={(e) => setMomoAccount(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Trạng thái hoạt động"
                            margin="normal"
                            variant="filled"
                            value={status[charityData.status] || 'Chưa xác định'}
                        />
                        <Box mt={2} mb={2}>
                            <Typography variant="body1" color="text.secondary" mb={1}>
                                Tải lên hình ảnh giấy phép hoạt động
                            </Typography>
                            <input
                                required
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{
                                    display: 'block',
                                    margin: '10px 0',
                                    fontSize: '16px'
                                }}
                            />
                        </Box>
                        {/* Hiển thị các ảnh đã chọn */}
                        {imagePreviews !== null && (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body1">Hình ảnh đã chọn:</Typography>
                                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 1, position: 'relative' }}>
                                    <Box sx={{ width: '100px', height: '100px', position: 'relative' }}>
                                        {/* Nút X để xóa ảnh */}
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: '-8px',
                                                right: '-8px',
                                                background: '#ff4d4d',
                                                color: '#fff',
                                                borderRadius: '50%',
                                                width: '20px',
                                                height: '20px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                fontWeight: 'bold',
                                                zIndex: 2,
                                            }}
                                            onClick={() => setImagePreviews(null)} // Xóa ảnh
                                        >
                                            X
                                        </Box>
                                        <img
                                            src={imagePreviews}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                borderRadius: '8px',
                                            }}
                                            alt="preview"
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        )}

                        {isError ? (
                            <>
                                <p style={{color:'red'}}>{errorUploadMessage}</p>
                            </>

                        ) : (
                            <>
                                <p style={{color:'green'}}>{errorUploadMessage}</p>
                            </>
                        )}
                        <Button variant="text" sx={{
                            mt: 2,
                            color: 'white',
                            backgroundColor: '#b58449', // Màu nền
                            '&:hover': {
                                backgroundColor: '#584840', // Màu nền khi hover
                            },
                        }}
                            onClick={handleFileUpload}>
                            Lưu thay đổi
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default ProfileEditPage;
