import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AttachMoneySharpIcon from '@mui/icons-material/AttachMoneySharp';
import { formatCurrency, formatDateTime } from '../../../services/Ultis'
import { CircularProgress } from '@mui/material';


const UserManagementPage = () => {
    const [donates, setDonates] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);

    const statusMap = {
        0: 'Đang chờ xử lý',
        1: 'Đã hoàn thành',
        2: 'Đã hủy',
    };

    const transferTypeMap = {
        1: 'Ví Momo',
        2: 'Chuyển khoản ngân hàng',
        3: 'Tiền mặt trực tiếp',
    };

    const handleEdit = async (status, id) => {
        try {
            setLoadingUpdate(true)
            const response = await fetch('http://localhost:5000/api/admin/update-donation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token"),
                },
                body: JSON.stringify({ donate_id: id, status }),
            });

            if (response.ok) {
                setLoadingUpdate(false)
                setReload(!reload);
            }
        } catch (error) {
            console.error('Error:', error);
            setLoadingUpdate(false)
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);  // Reset trang về 0 khi thay đổi số lượng dòng mỗi trang
    };

    React.useEffect(() => {
        // Gọi API khi component được render
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/get-all-donate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setDonates(data.data.donate_list);
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
                Quản lý quyên góp
            </Typography>
            <TableContainer component={Paper} sx={{ width: '100%' }}>  {/* Đảm bảo bảng chiếm hết chiều rộng */}
                <Table sx={{ minWidth: 650 }} aria-label="user table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#b58449' }}>
                            <TableCell align="center" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>STT</TableCell>
                            <TableCell align="center" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Người quyên góp</TableCell>
                            <TableCell align="center" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Tên tổ chức</TableCell>
                            <TableCell align="center" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Tên chiến dịch</TableCell>
                            <TableCell align="center" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Số tiền</TableCell>
                            <TableCell align="center" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Hình thức quyên góp</TableCell>
                            <TableCell align="center" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Trạng thái</TableCell>
                            <TableCell align="center" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {donates.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((donate, index) => (
                            <TableRow key={donate.id}>
                                <TableCell sx={{ width: '2%' }} align="center">{page * rowsPerPage + index + 1}</TableCell>
                                <TableCell sx={{ width: '15%' }} align="center">{donate.account_name}</TableCell>
                                <TableCell sx={{ width: '15%' }} align="center">{donate.charity_name}</TableCell>
                                <TableCell sx={{ width: '15%' }} align="center">{donate.campaign_name}</TableCell>
                                <TableCell sx={{ width: '15%' }} align="center">{formatCurrency(donate.amount)}</TableCell>
                                <TableCell sx={{ width: '20%' }} align="center">{transferTypeMap[donate.transfer_type] || 'Chưa xác định'}</TableCell>
                                <TableCell sx={{ width: '10%' }} align="center">{statusMap[donate.status] || 'Chưa xác định'}</TableCell>
                                <TableCell sx={{ width: '10%' }} align="center">
                                    {donate.status === 0 && (
                                        <IconButton color="primary" onClick={() => handleEdit(1, donate.id)} disabled={loadingUpdate}>
                                            {loadingUpdate ? <CircularProgress size={24} color="inherit" /> : <AttachMoneySharpIcon />}
                                        </IconButton>
                                    )}

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={donates.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Box>
    );
};

export default UserManagementPage;
