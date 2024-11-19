import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, TablePagination, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';


const UserManagementPage = () => {
    const [users, setUsers] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const [open, setOpen] = useState(false);
    const [deletedId, setDeletedId] = useState('');

    const role = {
        'admin': 'Quản trị viên',
        'charity': 'Tổ chức từ thiện',
        'contributor': 'Người đóng góp',
        'recipient': 'Người nhận hỗ trợ'
    };

    const handleClose = async (confirmed) => {
        setOpen(false);
        if (confirmed) {
            await handleDeleteAccount(deletedId)
        } else {
            console.log("Đã hủy!");
        }
    };

    const handleDelete = (accountId) => {
        setOpen(true);
        setDeletedId(accountId)
    };

    const handleDeleteAccount = async (accountId) => {
        try {
            const response = await fetch('http://localhost:5000/api/admin/delete-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token"),
                },
                body: JSON.stringify({ account_id: accountId }),
            });

            if (response.ok) {
                setReload(!reload);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleEdit = (id) => {
        console.log("Chỉnh sửa người dùng có ID:", id);
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
                const response = await fetch('http://localhost:5000/api/admin/get-all-user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsers(data.data.account_list);
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
                Quản lý người dùng
            </Typography>
            <TableContainer component={Paper} sx={{ width: '100%' }}>  {/* Đảm bảo bảng chiếm hết chiều rộng */}
                <Table sx={{ minWidth: 650 }} aria-label="user table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#b58449' }}>
                            <TableCell align="center" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>STT</TableCell>
                            <TableCell align="center" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Tài khoản</TableCell>
                            <TableCell align="center" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Họ và tên</TableCell>
                            <TableCell align="center" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Vai trò</TableCell>
                            <TableCell align="center" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Trạng thái</TableCell>
                            <TableCell align="center" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => (
                            <TableRow key={user.id}>
                                <TableCell sx={{ width: '10%' }} align="center">{page * rowsPerPage + index + 1}</TableCell>
                                <TableCell sx={{ width: '25%' }} align="center">{user.username}</TableCell>
                                <TableCell sx={{ width: '35%' }} align="center">{user.full_name}</TableCell>
                                <TableCell sx={{ width: '10%' }} align="center">{role[user.role] || 'Chưa xác định'}</TableCell>
                                <TableCell sx={{ width: '10%' }} align="center">{user.deleted_at ? 'Đã xóa': 'Đang hoạt động'}</TableCell>
                                <TableCell sx={{ width: '10%' }} align="center">
                                    {user.role !== 'admin' && (
                                        <>
                                            <IconButton disabled={user.deleted_at} sx={{color: user.deleted_at ? 'gray' : 'red'}} onClick={() => handleDelete(user.id)}>
                                                <DeleteIcon />
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
                    count={users.length}
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
                <DialogTitle>Xác nhận xóa người dùng</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn xóa người dùng này?
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
    );
};

export default UserManagementPage;
