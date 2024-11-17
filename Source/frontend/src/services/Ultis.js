import moment from 'moment';

function formatCurrency(amount) {
  if (isNaN(amount)) {
    return 'Invalid amount';
  }

  const formattedAmount = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);

  return formattedAmount;
}

function formatDateTime(dateTimeString) {
  const formattedDateTime = moment(dateTimeString).format("DD/MM/YYYY HH:mm:ss")
  return formattedDateTime;
}

export { formatCurrency, formatDateTime };