import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, TablePagination } from '@mui/material';
import { Button } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { formatCurrency, formatDateTime } from '../../../services/Ultis'
import { PDFExport } from '@progress/kendo-react-pdf';
import ReactDOM from 'react-dom';
import Report from '../../export/template';


const UserManagementPage = () => {
    const [campaigns, setCampaigns] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false);
    const [open, setOpen] = useState(false);
    const [deletedId, setDeletedId] = useState('');
    const status = {
        0: 'Chuẩn bị',
        1: 'Đang tổ chức',
        2: 'Đã kết thúc',
        3: 'Đã xóa'
    };

    const handleClose = async (confirmed) => {
        setOpen(false);
        if (confirmed) {
            await handleDeleteCampaign(deletedId)
        } else {
            console.log("Đã hủy!");
        }
    };

    const handleDelete = (campaignId) => {
        setOpen(true);
        setDeletedId(campaignId)
        //setCampaigns(campaigns.filter(campaign => campaign.id !== id));
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
                setReload(!reload);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);  // Reset trang về 0 khi thay đổi số lượng dòng mỗi trang
    };

    const pdfExportComponent = React.useRef(null);

    const handleExportPDF = (campaignId) => {
        const campaignData = campaigns.find(campaign => campaign.id === campaignId);
        const container = document.createElement('div');
        //container.style.display = 'none';
        document.body.appendChild(container);

        ReactDOM.render(
            <PDFExport ref={pdfExportComponent} paperSize="A4">
                <Report campaign={campaignData}/>
            </PDFExport>,
            container,
            () => {
                pdfExportComponent.current.save();
                document.body.removeChild(container); // Xóa container sau khi export
            }
        );
    };

    React.useEffect(() => {
        // Gọi API khi component được render
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/get-all-campaign', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setCampaigns(data.data.campaign_list);
                    setLoading(false)
                } else {
                    const errorData = await response.json();
                    setLoading(false)
                }
            } catch (error) {
                setLoading(true)
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
                Quản lý chiến dịch
            </Typography>
            <TableContainer component={Paper} sx={{ width: '100%' }}>  {/* Đảm bảo bảng chiếm hết chiều rộng */}
                <Table sx={{ minWidth: 650 }} aria-label="user table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#b58449' }}>
                            <TableCell align="center" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>STT</TableCell>
                            <TableCell align="center" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Tên tổ chức</TableCell>
                            <TableCell align="center" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Tên chiến dịch</TableCell>
                            <TableCell align="center" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Địa điểm</TableCell>
                            <TableCell align="center" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Ngân sách dự kiến</TableCell>
                            <TableCell align="center" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Trạng thái</TableCell>
                            <TableCell align="center" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {campaigns.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((campaign, index) => (
                            <TableRow key={campaign.id}>
                                <TableCell sx={{ width: '5%' }} align="center">{page * rowsPerPage + index + 1}</TableCell>
                                <TableCell sx={{ width: '20%' }} align="center">{campaign.charity_name}</TableCell>
                                <TableCell sx={{ width: '20%' }} align="center">{campaign.name}</TableCell>
                                <TableCell sx={{ width: '15%' }} align="center">{campaign.location} - {campaign.address}</TableCell>
                                <TableCell sx={{ width: '10%' }} align="center">{formatCurrency(campaign.budget_requirement)}</TableCell>
                                <TableCell sx={{ width: '10%' }} align="center">{status[campaign.status] || 'Chưa xác định'}</TableCell>
                                <TableCell sx={{ width: '10%' }} align="center">
                                    <IconButton color="secondary" onClick={() => handleDelete(campaign.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => handleExportPDF(campaign.id)}>
                                        <ExitToAppIcon />
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
    );
};

export default UserManagementPage;
