import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, TablePagination, Dialog, DialogTitle, DialogContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { CircularProgress } from '@mui/material';


const UserManagementPage = () => {
    const [charities, setCharities] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false); // State to control Dialog visibility
    const [imageSrc, setImageSrc] = useState(''); // State to hold image URL
    const [reload, setReload] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);



    const status = {
        0: 'Đang chờ duyệt',
        1: 'Đang hoạt động',
        2: 'Dừng hoạt động'
    };

    const handleUpdateStatus = async (status, charity_id) => {
        try {
            setLoadingUpdate(true)
            const response = await fetch('http://localhost:5000/api/admin/update-status-charity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token"),
                },
                body: JSON.stringify({ status, charity_id }),
            });

            if (response.ok) {
                setLoadingUpdate(false)
                setReload(!reload);
            }
        } catch (error) {
            setLoadingUpdate(false)
            console.error('Error:', error);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);  // Reset trang về 0 khi thay đổi số lượng dòng mỗi trang
    };

    // Open Dialog to show image
    const handleOpenDialog = (image) => {
        setImageSrc(image);
        setOpen(true);
    };

    // Close Dialog
    const handleCloseDialog = () => {
        setOpen(false);
        setImageSrc('');
    };

    React.useEffect(() => {
        // Gọi API khi component được render
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/get-all-charity', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setCharities(data.data.charity_list);
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

        fetchData();
    }, [reload]);

    if (loading) {
        return;  // Hoặc bạn có thể hiển thị một spinner
    }

    return (
        <Box sx={{ padding: 3, width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Typography variant="h4" gutterBottom>
                Quản lý tổ chức từ thiện
            </Typography>
            <TableContainer component={Paper} sx={{ width: '100%' }}>  {/* Đảm bảo bảng chiếm hết chiều rộng */}
                <Table sx={{ minWidth: 650 }} aria-label="user table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#b58449' }}>
                            <TableCell align="center" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>STT</TableCell>
                            <TableCell align="center" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Người tạo</TableCell>
                            <TableCell align="center" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Tên tổ chức</TableCell>
                            <TableCell align="center" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Giấy phép</TableCell>
                            <TableCell align="center" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Trạng thái</TableCell>
                            <TableCell align="center" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {charities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((charity, index) => (
                            <TableRow key={charity.id}>
                                <TableCell sx={{ width: '10%' }} align="center">{page * rowsPerPage + index + 1}</TableCell>
                                <TableCell sx={{ width: '20%' }} align="center">{charity.full_name}</TableCell>
                                <TableCell sx={{ width: '30%' }} align="center">{charity.name}</TableCell>
                                <TableCell sx={{ width: '10%' }} align="center">{/* IconButton with VisibilityIcon to view the file */}
                                    <IconButton color="primary" onClick={() => handleOpenDialog(charity.file)}>
                                        <VisibilityIcon />
                                    </IconButton></TableCell>
                                <TableCell sx={{ width: '10%' }} align="center">{status[charity.status] || 'Chưa xác định'}</TableCell>
                                <TableCell sx={{ width: '15%' }} align="center">
                                    {loadingUpdate ? <CircularProgress size={24} color="inherit" /> : (
                                        <>
                                            <IconButton disabled={charity.status === 1} color="primary" onClick={() => handleUpdateStatus(1, charity.id)}>
                                                <CheckBoxIcon sx={{ color: (charity.status === 1) ? 'gray' : 'green' }} />
                                            </IconButton>
                                            <IconButton disabled={charity.status === 2} color="secondary" onClick={() => handleUpdateStatus(2, charity.id)}>
                                                <DoDisturbIcon sx={{ color: (charity.status === 2) ? 'gray' : 'red' }} />
                                            </IconButton>
                                        </>
                                    )}

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={charities.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>

            {/* Dialog to show image */}
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>Xem hình ảnh</DialogTitle>
                <DialogContent>
                    <img src={imageSrc} alt="Giấy phép" style={{ width: '100%', height: 'auto' }} />
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default UserManagementPage;
