import * as React from 'react';
import { useRef, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppAppBar from './marketing-page/components/AppAppBar';
import Hero from './marketing-page/components/Hero';
import LogoCollection from './marketing-page/components/LogoCollection';
import Highlights from './marketing-page/components/Highlights';
import Pricing from './marketing-page/components/Pricing';
import Features from './marketing-page/components/Features';
import Testimonials from './marketing-page/components/Testimonials';
import FAQ from './marketing-page/components/FAQ';
import Charity from './marketing-page/components/Charity'
import Checkout from './checkout/Checkout'
import Campaign from './campaign-detail/campaign-detail';
import Footer from './marketing-page/components/Footer';
import ProfilePage from './profile/profile-edit'
import DonateHistoryPage from './donate/donate-history'
import CampaignManagementPage from './campaign-management/campaign-management';
import CampaignTimelinePage from './campaign-timeline/campaign-timeline';
import AppTheme from './shared-theme/AppTheme';
import { useColorScheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

export default function MarketingPage(props) {
    const [charityData, setCharityData] = useState(null);  // State chứa dữ liệu từ API
    const [faqData, setFaqData] = useState(null);
    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(true);  // State kiểm tra việc tải dữ liệu
    const { mode, setMode } = useColorScheme();
    const navigate = useNavigate();


    // Tạo ref cho mỗi phần tử
    const chartRef = useRef(null);
    const testimonialsRef = useRef(null);
    const faqRef = useRef(null);
    const newsRef = useRef(null);
    const charityRef = useRef(null);

    // Hàm cuộn đến vị trí của phần tử tương ứng
    const scrollToSection = (sectionRef) => {
        if (sectionRef.current) {
            sectionRef.current.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate("/home")
        }
    };

    const userInfo = JSON.parse(localStorage.getItem('user_info'));
    const location = useLocation();
    const showHome = location.pathname.startsWith('/home') || (location.pathname === '/');
    const showDetailCampaign = location.pathname.startsWith('/campaign-detail')
    const showDonateCampaign = location.pathname.startsWith('/campaign-donate')
    const showProfilePage = location.pathname.startsWith('/profile-edit')
    const showDonateHistoryPage = location.pathname.startsWith('/donate-history')
    const showCampaignManagementPage = location.pathname.startsWith('/campaign-management')
    const showCampaignTimelinePage = location.pathname.startsWith('/campaign-timeline');

    function isTokenExpired() {
        const expirationTime = localStorage.getItem('token_expiry');
        const currentTime = new Date().getTime();

        return currentTime > expirationTime; // Nếu thời gian hiện tại lớn hơn thời gian hết hạn, thì token đã hết hạn
    }

    React.useEffect(() => {
        setMode("light")

        if (isTokenExpired()) {
            // Token đã hết hạn, có thể yêu cầu đăng nhập lại
            localStorage.removeItem('token');
            localStorage.removeItem('user_info');
            localStorage.removeItem('token_expiry');
            localStorage.removeItem('prev_location');
            //navigate(0)
        }

        // Gọi API khi component được render
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/home', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setCharityData(data.data.charity_list)
                    setFaqData(data.data.faq_list)
                    setArticles(data.data.articles)
                    setLoading(false)
                } else {
                    const errorData = await response.json();
                }
            } catch (error) {
                console.log(error)
            }
        };

        fetchData();
    }, []);
    if(loading) {
        return
    }
    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <AppAppBar
                onCharityClick={() => scrollToSection(charityRef)}
                onChartClick={() => scrollToSection(chartRef)}
                onTestimonialClick={() => scrollToSection(testimonialsRef)}
                onNewsClick={() => scrollToSection(newsRef)}
                onFAQClick={() => scrollToSection(faqRef)}
            />
            {showHome && (
                <>
                    <Hero />
                    <div>

                        {charityData ? (
                            <div ref={charityRef}>
                                <Charity data={charityData} />
                            </div>
                        ) : (
                            <div>No data available</div>  // Hiển thị thông báo khi dữ liệu chưa có
                        )}
                        <Divider />
                        {charityData ? (
                            <div ref={testimonialsRef}>
                                <Testimonials data={charityData} />
                            </div>
                        ) : (
                            <div>No data available</div>  // Hiển thị thông báo khi dữ liệu chưa có
                        )}

                        <Divider />
                        <div ref={newsRef}>
                            <Highlights articles={articles}/>
                        </div>
                        <Divider />
                        {faqData ? (
                            <div ref={faqRef}>
                                <FAQ data={faqData} />
                            </div>
                        ) : (
                            <div>No data available</div>  // Hiển thị thông báo khi dữ liệu chưa có
                        )}

                        <Divider />
                        <Footer />
                    </div>
                </>
            )}
            {showDetailCampaign && (
                <>
                    <Campaign />
                </>
            )}
            {showDonateCampaign && (
                <>
                    <Checkout />
                </>
            )}
            {showProfilePage && (
                <>
                    <ProfilePage />
                </>
            )}
            {showDonateHistoryPage && (
                <>
                    <DonateHistoryPage />
                </>
            )}
            {showCampaignManagementPage && (
                <>
                    <CampaignManagementPage />
                </>
            )}
            {showCampaignTimelinePage && (
                <>
                    <CampaignTimelinePage />
                </>
            )}


        </AppTheme>
    );
}
