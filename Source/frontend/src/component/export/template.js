import React from "react";
import { formatCurrency, formatDateTime } from '../../services/Ultis'

const Report = ({ campaign }) => {
  return (
    <div className="export-pdf" style={styles.container} >
      {/* Header */}
      <div style={styles.header}>
        <h1>Báo cáo Tình Hình Chiến Dịch</h1>
      </div>

      {/* Campaign Details */}
      <div style={styles.details}>
        <h2>Thông tin chiến dịch</h2>
        <table style={styles.table}>
          <tbody>
            <tr>
              <th style={styles.th}>Tên chiến dịch</th>
              <td style={styles.td}>{campaign.name}</td>
            </tr>
            <tr>
              <th style={styles.th}>Tên tổ chức</th>
              <td style={styles.td}>{campaign.charity_name}</td>
            </tr>
            <tr>
              <th style={styles.th}>Mô tả</th>
              <td style={styles.td}>{campaign.description}</td>
            </tr>
            <tr>
              <th style={styles.th}>Ngân sách dự kiến</th>
              <td style={styles.td}>{formatCurrency(campaign.budget_requirement)}</td>
            </tr>
            <tr>
              <th style={styles.th}>Ngân sách hiện tại</th>
              <td style={styles.td}>{formatCurrency(campaign.budget)}</td>
            </tr>
            <tr>
              <th style={styles.th}>Thời gian bắt đầu</th>
              <td style={styles.td}>{formatDateTime(campaign.started_at)}</td>
            </tr>
            <tr>
              <th style={styles.th}>Thời gian kết thúc</th>
              <td style={styles.td}>{formatDateTime(campaign.ended_at)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Donors List */}
      <div style={styles.donors}>
        <h2>Danh sách người dùng quyên góp</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>STT</th>
              <th style={styles.th}>Tên người dùng</th>
              <th style={styles.th}>Số tiền quyên góp</th>
              <th style={styles.th}>Ngày quyên góp</th>
            </tr>
          </thead>
          <tbody>
            {campaign.campaign_donation.map((donor, index) => (
              <tr key={index}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{donor.username}</td>
                <td style={styles.td}>{formatCurrency(donor.amount)}</td>
                <td style={styles.td}>{formatDateTime(donor.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.donors}>
        <h2>Đánh giá của người dùng</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>STT</th>
              <th style={styles.th}>Tên người dùng</th>
              <th style={styles.th}>Đánh giá</th>
              <th style={styles.th}>Bình luận</th>
            </tr>
          </thead>
          <tbody>
            {campaign.campaign_rating.map((rating, index) => (
              <tr key={index}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{rating.username}</td>
                <td style={styles.td}>{rating.rating} Sao </td>
                <td style={styles.td}>{rating.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div style={styles.summary}>
        <h3>Tóm tắt</h3>
        <p>
          Chiến dịch "{campaign.name}" đã nhận được sự ủng hộ từ nhiều cá nhân và tổ chức.
          Ngân sách hiện tại đạt {Math.round((campaign.budget / campaign.budget_requirement) * 100)}% so với mục tiêu.
          Chúng tôi sẽ tiếp tục kêu gọi sự đóng góp và cam kết sử dụng ngân sách hiệu quả để đạt được mục tiêu.
        </p>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p>&copy; 2024 {campaign.charity_name}. All rights reserved.</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "900px",
    margin: "20px auto",
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    lineHeight: "1.6",
    fontFamily: "Roboto !important" ,
    color: "#333",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  details: {
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  th: {
    border: "1px solid #ddd",
    padding: "8px",
    backgroundColor: "#f4f4f9",
    color: "#0056b3",
    textAlign: "left",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  },
  donors: {
    marginBottom: "20px",
  },
  summary: {
    background: "#e6f7ff",
    padding: "15px",
    borderRadius: "5px",
    marginTop: "10px",
  },
  footer: {
    textAlign: "center",
    marginTop: "30px",
    fontSize: "0.9em",
    color: "#666",
  },
  
};

export default Report;
