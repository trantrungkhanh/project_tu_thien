import React from 'react';
import { CssBaseline, Container, Box, Typography, Button, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { formatCurrency, formatDateTime } from '../../services/Ultis'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import ExportPDF from '../export/export-pdf';
import { PDFExport } from '@progress/kendo-react-pdf';
import ReactDOM from 'react-dom';
import Report from '../export/template';

const images = [];
const data = {};

function ImageSlider() {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 3000); // 3 giây để chuyển ảnh
        return () => clearInterval(interval);

    }, []);

    return (
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
            {/* Ảnh nền */}
            <Box
                component="img"
                src={images[currentImage]}
                alt="Campaign Image"
                sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 2,
                    objectFit: 'cover',
                    filter: 'blur(8px)', // làm mờ nền
                    opacity: 0.6, // giảm độ đậm của nền
                }}
            />
            {/* Ảnh chính */}
            <Box
                component="img"
                src={images[currentImage]}
                alt="Campaign Image Overlay"
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: 2,
                    objectFit: 'contain',
                }}
            />
        </Box>
    );
}

export default function CampaignDetail() {
    const [campaignData, setCampaignData] = useState(null);
    const { campaignId } = useParams();
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [rating, setRating] = React.useState(0);
    const [comment, setComment] = React.useState('');
    const [accountId, setAccountId] = React.useState('');
    const [isContributor, setIsContributor] = useState(false);
    const navigate = useNavigate();

    const handleDonate = (campaignId) => {
        navigate(`/campaign-donate/${campaignId}`);
    }

    const handleAddComment = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/campaign-add-commet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token"),
                },
                body: JSON.stringify({ campaign_id: campaignId, account_id: accountId, rating, comment }),
            });
            if (response.ok) {
                navigate(0);
            } else {
                const errorData = await response.json();
            }
        } catch (error) {
            console.log(error)
        }
    }

    const pdfExportComponent = React.useRef(null);

    const handleExportPDF = () => {
        const container = document.createElement('div');
        //container.style.display = 'none';
        document.body.appendChild(container);

        ReactDOM.render(
            <PDFExport ref={pdfExportComponent} paperSize="A4">
                <Report campaign={campaignData} />
            </PDFExport>,
            container,
            () => {
                pdfExportComponent.current.save();
                document.body.removeChild(container); // Xóa container sau khi export
            }
        );
    };

    useEffect(() => {

        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
            const userInfo = JSON.parse(localStorage.getItem('user_info'));
            if (userInfo.role === 'contributor') {
                setIsContributor(true)
            }
            setAccountId(userInfo.id)
        }
        // Gọi API khi component được render
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/campaign-detail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ campaignId }),
                });
                if (response.ok) {
                    const data = await response.json();
                    setCampaignData(data.data.campaign)
                    for (const campaignImg of data.data.campaign.campaign_image) {
                        images.push(campaignImg.path)
                    }
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

    if (loading) {
        return;  // Hoặc bạn có thể hiển thị một spinner
    }
    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed>
                <Box
                    sx={{
                        bgcolor: '#bfaf9d',
                        height: 'auto',
                        marginTop: '10vh',
                        padding: 4,
                        borderRadius: 2,
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Grid container spacing={4} sx={{ height: '100%' }}>
                        {/* Phần Slideshow */}
                        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Box sx={{ width: '100%', maxWidth: '400px', height: '300px' }}>
                                <ImageSlider />
                            </Box>
                        </Grid>
                        {/* Phần Nội dung Chiến dịch */}
                        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', fontSize: '2.0rem' }}>
                                {campaignData.name}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3 }}>
                                {campaignData.description}
                            </Typography>
                            <Typography variant="body2" color="text.primary" sx={{ mb: 2 }}>
                                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Tỉnh/thành phố: </span>{campaignData.location}
                            </Typography>
                            <Typography variant="body2" color="text.primary" sx={{ mb: 2 }}>
                                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}> Địa chỉ: </span>{campaignData.address}
                            </Typography>
                            <Typography variant="body2" color="text.primary" sx={{ mb: 2 }}>
                                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}> Ngân sách dự kiến: </span>{formatCurrency(campaignData.budget_requirement)}
                            </Typography>
                            <Typography variant="body2" color="text.primary" sx={{ mb: 2 }}>
                                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}> Ngân sách hiện tại: </span>{formatCurrency(campaignData.budget)}
                            </Typography>
                            <Typography variant="h6">Tình hình chiến dịch</Typography>
                            <Timeline position="alternate">
                                {(campaignData.campaign_news || []).map((event, index) => (
                                    <TimelineItem key={index}>
                                        <TimelineOppositeContent color="text.secondary">
                                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold', fontSize: '1.0rem' }}>{formatDateTime(event.created_at)}</Typography>
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineDot color={index < campaignData.campaign_news.length - 1 ? 'success' : 'secondary'} />
                                            {index < campaignData.campaign_news.length - 1 && <TimelineConnector />}
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1.0rem' }}>{event.content_1}</Typography>
                                        </TimelineContent>
                                    </TimelineItem>
                                ))}
                            </Timeline>
                            {isLoggedIn ? (
                                <>
                                    {isContributor ? (
                                        <Button variant="text" size="large" onClick={() => handleDonate(campaignData.id)} sx={{
                                            color: 'white',
                                            backgroundColor: '#b58449', // Màu nền
                                            '&:hover': {
                                                backgroundColor: '#584840', // Màu nền khi hover
                                            }
                                        }}>
                                            Quyên góp
                                        </Button>
                                    ) : (
                                        null
                                    )}
                                </>


                            ) : (
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                                    Vui lòng đăng nhập để quyên góp
                                </Typography>
                            )}
                            <Button variant="text" size="large" onClick={handleExportPDF} sx={{
                                color: 'white',
                                backgroundColor: '#b58449', // Màu nền
                                '&:hover': {
                                    backgroundColor: '#584840', // Màu nền khi hover
                                }
                            }}>
                                Tình hình chiến dịch
                            </Button>
                        </Grid>
                        {/* Phần Đánh giá sao và Bình luận */}
                        <Grid item xs={12} sx={{ mt: 4 }}>
                            <Divider sx={{ mb: 2 }} />
                            <Typography variant="h5" component="h2" gutterBottom>
                                Đánh giá và Bình luận
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Rating name="user-rating" defaultValue={0} precision={1} size="large" onChange={(e) => setRating(e.target.value)} />
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                {/* Form để thêm bình luận */}
                                {isLoggedIn ? (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <TextField
                                            variant="filled"
                                            fullWidth
                                            multiline
                                            rows={5}
                                            placeholder="Viết bình luận của bạn"
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                        <Button
                                            variant="text"
                                            color="primary"
                                            onClick={handleAddComment}
                                            sx={{
                                                color: 'white',
                                                backgroundColor: '#b58449', // Màu nền
                                                '&:hover': {
                                                    backgroundColor: '#584840', // Màu nền khi hover
                                                }
                                            }}
                                        >
                                            Gửi
                                        </Button>
                                    </Box>
                                ) : (
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        Vui lòng đăng nhập để bình luận
                                    </Typography>
                                )}
                            </Box>

                            {/* Hiển thị các bình luận */}
                            <Box sx={{ mt: 3 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                                    Bình luận của người dùng
                                </Typography>
                                {campaignData.campaign_rating.map((comment) => (
                                    <Card
                                        key={comment.id}
                                        variant="outlined"
                                        sx={{ mb: 2, borderColor: '#b58449', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}
                                    >
                                        <CardContent>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                                    {comment.username}
                                                </Typography>
                                                <Rating
                                                    value={comment.rating}
                                                    precision={0.5}
                                                    readOnly
                                                    size="small"
                                                    sx={{ ml: 1 }}
                                                />
                                            </Box>
                                            <Typography variant="body2" color="text.secondary">
                                                {comment.comment}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </React.Fragment>
    );
}