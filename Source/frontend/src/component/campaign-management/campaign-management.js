import React, { useState } from 'react';
import { Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, TablePagination } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import callProtectedApi from '../../services/ProtectedApi';
import { formatCurrency, formatDateTime } from '../../services/Ultis'
import { CircularProgress } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CampaignManagementPage = () => {
    const [selectedMenu, setSelectedMenu] = useState('addCampaign');
    const [files, setFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [address, setAddress] = useState('');
    const [budgetRequirement, setBudgetRequirement] = useState('');
    const [description, setDescription] = useState('');
    const { accountId } = useParams();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [selectedDateStart, setSelectedDateStart] = useState('');
    const [selectedDateEnd, setSelectedDateEnd] = useState('');
    const [loadingCreateCampaign, setLoadingCreatCampaign] = useState(false);

    const [campaigns, setCampaigns] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [deletedId, setDeletedId] = useState('');
    const [campaignDataUpdate, setCampaignDataUpdate] = useState({})
    const [nameUpdate, setNameUpdate] = useState('');
    const [locationUpdate, setLocationUpdate] = useState('');
    const [addressUpdate, setAddressUpdate] = useState('');
    const [budgetRequirementUpdate, setBudgetRequirementUpdate] = useState('');
    const [descriptionUpdate, setDescriptionUpdate] = useState('');
    const [selectedDateStartUpdate, setSelectedDateStartUpdate] = useState('');
    const [selectedDateEndUpdate, setSelectedDateEndUpdate] = useState('');
    const [loadingUpdateCampaign, setLoadingUpdateCampaign] = useState(false);
    const [loadingPageEdit, setLoadingPageEdit] = useState(true);
    const [errorUploadMessage, setErrorUploadMessage] = useState('');
    // Hàm để xử lý khi nhấn vào menu
    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    const status = {
        0: 'Chuẩn bị',
        1: 'Đang tổ chức',
        2: 'Đã kết thúc',
    };

    const formatDateUpdate = (date) => {
        const d = new Date(date);
        const month = `${d.getMonth() + 1}`.padStart(2, '0');
        const day = `${d.getDate()}`.padStart(2, '0');
        const year = d.getFullYear();
        return [year, month, day].join('-');
    };

    const handleDelete = (campaignId) => {
        setOpen(true);
        setDeletedId(campaignId)
    };

    const handleViewDetail = (campaignId) => {
        navigate(`/campaign-detail/${campaignId}`);
    };

    const handleEdit = (screenEdit, campaignId) => {
        const selectedCampaign = campaigns.find(campaign => campaign.id === campaignId);
        setCampaignDataUpdate(selectedCampaign);

        // Chuyển sang màn hình chỉnh sửa
        handleMenuClick(screenEdit);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);  // Reset trang về 0 khi thay đổi số lượng dòng mỗi trang
    };

    const handleChangeAmount = (event) => {
        // Loại bỏ dấu phân cách, chỉ giữ lại chữ số
        const value = event.target.value.replace(/\D/g, '');
        setBudgetRequirement(value);
    }
    const handleChangeAmountUpdate = (event) => {
        // Loại bỏ dấu phân cách, chỉ giữ lại chữ số
        const value = event.target.value.replace(/\D/g, '');
        setBudgetRequirementUpdate(value);
    }

    const handleClose = async (confirmed) => {
        setOpen(false);
        if (confirmed) {
            await handleDeleteCampaign(deletedId)
        } else {
            console.log("Đã hủy!");
        }
    };

    const handleRemoveImage = (indexToRemove) => {
        setImagePreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleDeleteCampaign = async (campaignId) => {
        try {
            const response = await fetch('http://localhost:5000/api/campaign-delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token"),
                },
                body: JSON.stringify({ campaign_id: campaignId }),
            });

            if (response.ok) {
                const result = await response.json();
                setCampaigns(campaigns.filter(campaign => campaign.id !== campaignId));
            }
        } catch (error) {
            console.error('Error:', error);
            setLoadingCreatCampaign(false)
        }
    }

    const handleFileUpload = async () => {
        if (imagePreviews.length <= 0) {
            setErrorUploadMessage('Cần tải lên hình ảnh chiến dịch')
            return;
        }
        const formData = new FormData();
        files.forEach((file) => formData.append('files', file));  // Thêm từng file vào FormData với cùng key 'files'
        formData.append('name', name);
        formData.append('location', location);
        formData.append('address', address);
        formData.append('budget_requirement', budgetRequirement);
        formData.append('description', description);
        formData.append('account_id', accountId);
        formData.append('started_at', selectedDateStart);
        formData.append('ended_at', selectedDateEnd);

        try {
            setLoadingCreatCampaign(true)
            const response = await fetch('http://localhost:5000/api/campaign-create', {
                method: 'POST',
                headers: {
                    'Authorization': localStorage.getItem("token"),
                },
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                setLoadingCreatCampaign(false)
                navigate(0)
            } else {
                console.error('Upload failed');
                setLoadingCreatCampaign(false)
            }
        } catch (error) {
            console.error('Error:', error);
            setLoadingCreatCampaign(false)
        }
    };

    const handleCampaignUpdate = async () => {
        try {
            setLoadingUpdateCampaign(true)
            const response = await fetch('http://localhost:5000/api/campaign-update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    name: nameUpdate,
                    location: locationUpdate,
                    address: addressUpdate,
                    budget_requirement: budgetRequirementUpdate,
                    description: descriptionUpdate,
                    started_at: selectedDateStartUpdate,
                    ended_at: selectedDateEndUpdate,
                    campaign_id: campaignDataUpdate.id
                }),
            });

            if (response.ok) {
                const result = await response.json();
                setLoadingUpdateCampaign(false)
                navigate(0)
            } else {
                console.error('Upload failed');
                setLoadingUpdateCampaign(false)
            }
        } catch (error) {
            console.error('Error:', error);
            setLoadingUpdateCampaign(false)
        }
    }

    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            // Chuyển FileList thành array và thêm tên file duy nhất
            const updatedFiles = Array.from(selectedFiles).map((file) => {
                const uniqueId = uuidv4();
                const newFileName = `${Date.now()}-${uniqueId}-${file.name}`;
                return new File([file], newFileName, { type: file.type });
            });

            // Cập nhật danh sách file mà không ghi đè danh sách cũ
            setFiles((prevFiles) => [...prevFiles, ...updatedFiles]);

            // Cập nhật danh sách ảnh xem trước
            const newPreviews = updatedFiles.map((file) => URL.createObjectURL(file));
            setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
        }
    };

    const handleDateStartChange = (event) => {
        setSelectedDateStart(event.target.value);
    };

    const handleDateEndChange = (event) => {
        setSelectedDateEnd(event.target.value);
    };

    const handleDateStartUpdateChange = (event) => {
        setSelectedDateStartUpdate(event.target.value);
    };

    const handleDateEndUpdateChange = (event) => {
        setSelectedDateEndUpdate(event.target.value);
    };


    React.useEffect(() => {
        const callAuthenApi = async () => {
            const isAuthen = await callProtectedApi(accountId);
            if (!isAuthen) {
                navigate('/403')
            }
        };

        callAuthenApi();

        const fetchDataCampaign = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/campaign-list', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ account_id: accountId }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setCampaigns(data.data.campaigns);
                    setLoading(false)
                } else {
                    const errorData = await response.json();
                    setLoading(false)
                }
            } catch (error) {
                setLoading(true)
                console.log(false)
            }
        };

        fetchDataCampaign();

    }, []);

    React.useEffect(() => {
        if (campaignDataUpdate) {
            setNameUpdate(campaignDataUpdate.name);
            setLocationUpdate(campaignDataUpdate.location);
            setAddressUpdate(campaignDataUpdate.address);
            setBudgetRequirementUpdate(campaignDataUpdate.budget_requirement);
            setDescriptionUpdate(campaignDataUpdate.description);
            setSelectedDateStartUpdate(formatDateUpdate(campaignDataUpdate.started_at));
            setSelectedDateEndUpdate(formatDateUpdate(campaignDataUpdate.ended_at));
            setLoadingPageEdit(false); // Chỉ tắt loading khi các state đã được cập nhật
        }
    }, [campaignDataUpdate]);

    if (loading) {
        return;  // Hoặc bạn có thể hiển thị một spinner
    }

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
                <Typography variant="h6" mb={2}>Quản lí chiến dịch</Typography>

                <Button
                    onClick={() => handleMenuClick('addCampaign')}
                    fullWidth
                    sx={{
                        backgroundColor: selectedMenu === 'addCampaign' ? '#b58449' : '#e0e0e0',
                        color: selectedMenu === 'addCampaign' ? '#ffffff' : '#000000',
                        '&:hover': {
                            backgroundColor: selectedMenu === 'addCampaign' ? '#584840' : '#d5d5d5',
                        },
                    }}
                >
                    Tạo chiến dịch mới
                </Button>

                <Button
                    onClick={() => handleMenuClick('listCampaign')}
                    fullWidth
                    sx={{
                        backgroundColor: selectedMenu === 'listCampaign' ? '#b58449' : '#e0e0e0',
                        color: selectedMenu === 'listCampaign' ? '#ffffff' : '#000000',
                        '&:hover': {
                            backgroundColor: selectedMenu === 'listCampaign' ? '#584840' : '#d5d5d5',
                        },
                    }}
                >
                    Danh sách chiến dịch
                </Button>
            </Box>

            {/* Phần nội dung bên phải */}
            <Box width="75%" p={3}>
                {selectedMenu === 'addCampaign' && (
                    <Box>
                        <Typography variant="h6" mb={2} sx={{
                            color: '#b58449',
                            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },  // Tăng kích thước chữ
                            fontWeight: 'bold', // Làm chữ đậm
                        }}>Chiến dịch mới</Typography>
                        <TextField
                            fullWidth
                            label="Tên chiến dịch"
                            margin="normal"
                            variant="filled"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Tỉnh/Thành phố"
                            margin="normal"
                            variant="filled"
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Địa chỉ"
                            margin="normal"
                            variant="filled"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            label="Ngân sách dự kiến"
                            margin="normal"
                            variant="filled"
                            value={formatCurrency(budgetRequirement)}
                            onChange={handleChangeAmount}
                        />
                        <TextField
                            fullWidth
                            multiline
                            label="Thông tin chiến dịch"
                            margin="normal"
                            variant="filled"
                            rows={5}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <label htmlFor="date-input">Ngày bắt đầu: </label>
                        <input
                            type="date"
                            id="date-start-input"
                            value={selectedDateStart}
                            onChange={handleDateStartChange}
                            style={{
                                padding: '8px',
                                fontSize: '1rem',
                                margin: '8px 0',
                            }}
                        />

                        <label htmlFor="date-input">Ngày kết thúc: </label>
                        <input
                            type="date"
                            id="date-end-input"
                            value={selectedDateEnd}
                            onChange={handleDateEndChange}
                            style={{
                                padding: '8px',
                                fontSize: '1rem',
                                margin: '8px 0',
                            }}
                        />
                        {/* Input tải lên nhiều hình ảnh */}
                        <Box mt={2} mb={2}>
                            <Typography variant="body1" color="text.secondary" mb={1}>
                                Tải lên hình ảnh
                            </Typography>
                            <input
                                type="file"
                                multiple
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
                        {imagePreviews.length > 0 && (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body1">Hình ảnh đã chọn:</Typography>
                                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 1 }}>
                                    {imagePreviews.map((preview, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                width: '100px',
                                                height: '100px',
                                                position: 'relative',
                                            }}
                                        >
                                            <img
                                                src={preview}
                                                alt={`preview-${index}`}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    borderRadius: '8px',
                                                }}
                                            />
                                            <IconButton
                                                onClick={() => handleRemoveImage(index)}
                                                sx={{
                                                    position: 'absolute',
                                                    top: '-10px',
                                                    right: '-10px',
                                                    backgroundColor: 'white',
                                                    zIndex: 1,
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                                    },
                                                }}
                                            >
                                                <CloseIcon color="error" />
                                            </IconButton>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        )}
                        {errorUploadMessage && (
                            <>
                                <p style={{color:'red'}}>{errorUploadMessage}</p>
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
                            onClick={handleFileUpload}

                            disabled={loadingCreateCampaign}>
                            {loadingCreateCampaign ? <CircularProgress size={24} color="inherit" /> : 'Tạo chiến dịch mới'}
                        </Button>
                    </Box>
                )}

                {selectedMenu === 'listCampaign' && (
                    <Box>
                        <TableContainer component={Paper} sx={{ width: '100%' }}>  {/* Đảm bảo bảng chiếm hết chiều rộng */}
                            <Table sx={{ minWidth: 650 }} aria-label="user table">
                                <TableHead sx={{ backgroundColor: '#b58449' }}>
                                    <TableRow>
                                        <TableCell align="center">Tên chiến dịch</TableCell>
                                        <TableCell align="center">Địa điểm</TableCell>
                                        <TableCell align="center">Ngân sách dự kiến</TableCell>
                                        <TableCell align="center">Trạng thái</TableCell>
                                        <TableCell align="center">Thao tác</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {campaigns.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((campaign) => (
                                        <TableRow key={campaign.id}>
                                            <TableCell sx={{ width: '20%' }} align="center">{campaign.name}</TableCell>
                                            <TableCell sx={{ width: '20%' }} align="center">{campaign.location} - {campaign.address}</TableCell>
                                            <TableCell sx={{ width: '10%' }} align="center">{formatCurrency(campaign.budget_requirement)}</TableCell>
                                            <TableCell sx={{ width: '10%' }} align="center">{status[campaign.status] || 'Chưa xác định'}</TableCell>
                                            <TableCell sx={{ width: '20%' }} align="center">
                                                <IconButton color="primary" onClick={() => handleEdit('editCampaign', campaign.id)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton color="secondary" onClick={() => handleDelete(campaign.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton color="secondary" onClick={() => handleViewDetail(campaign.id)}>
                                                    <RemoveRedEyeSharpIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={campaigns.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableContainer>
                        <Dialog
                            open={open}
                            onClose={() => handleClose(false)}
                        >
                            <DialogTitle>Xác nhận xóa chiến dịch</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Bạn có chắc chắn muốn xóa chiến dịch này?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => handleClose(false)} color="primary">
                                    Hủy
                                </Button>
                                <Button onClick={() => handleClose(true)} color="primary" autoFocus>
                                    Xác nhận
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Box>

                )}

                {selectedMenu === 'editCampaign' && !loadingPageEdit && (
                    <Box>
                        <IconButton color="secondary" onClick={() => handleMenuClick('listCampaign')}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Box>
                            <Typography variant="h6" mb={2} sx={{
                                color: '#b58449',
                                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },  // Tăng kích thước chữ
                                fontWeight: 'bold', // Làm chữ đậm
                            }}>Cập nhật thông tin chiến dịch</Typography>
                            <TextField
                                fullWidth
                                label="Tên chiến dịch"
                                margin="normal"
                                variant="filled"
                                value={nameUpdate}
                                onChange={(e) => setNameUpdate(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Tỉnh/Thành phố"
                                margin="normal"
                                variant="filled"
                                value={locationUpdate}
                                onChange={(e) => setLocationUpdate(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Địa chỉ"
                                margin="normal"
                                variant="filled"
                                value={addressUpdate}
                                onChange={(e) => setAddressUpdate(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Ngân sách dự kiến"
                                margin="normal"
                                variant="filled"
                                value={formatCurrency(budgetRequirementUpdate)}
                                onChange={handleChangeAmountUpdate}
                            />
                            <TextField
                                fullWidth
                                multiline
                                label="Thông tin chiến dịch"
                                margin="normal"
                                variant="filled"
                                rows={5}
                                value={descriptionUpdate}
                                onChange={(e) => setDescriptionUpdate(e.target.value)}
                            />

                            <label htmlFor="date-input">Ngày bắt đầu: </label>
                            <input
                                type="date"
                                id="date-start-input-update"
                                value={selectedDateStartUpdate}
                                onChange={handleDateStartUpdateChange}
                                style={{
                                    padding: '8px',
                                    fontSize: '1rem',
                                    margin: '8px 0',
                                }}
                            />

                            <label htmlFor="date-input">Ngày kết thúc: </label>
                            <input
                                type="date"
                                id="date-end-input-update"
                                value={selectedDateEndUpdate}
                                onChange={handleDateEndUpdateChange}
                                style={{
                                    padding: '8px',
                                    fontSize: '1rem',
                                    margin: '8px 0',
                                }}
                            />
                            <Button variant="text" sx={{
                                mt: 2,
                                color: 'white',
                                backgroundColor: '#b58449', // Màu nền
                                '&:hover': {
                                    backgroundColor: '#584840', // Màu nền khi hover
                                }
                            }}
                                onClick={handleCampaignUpdate}

                                disabled={loadingUpdateCampaign}>
                                {loadingUpdateCampaign ? <CircularProgress size={24} color="inherit" /> : 'Cập nhật chiến dịch'}
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default CampaignManagementPage;
