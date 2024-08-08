// dateUtils.js
function formatDate(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours24 = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
  
    const ampm = hours24 >= 12 ? 'PM' : 'AM';
    const hours = hours24 % 12 || 12;
    
    return `${day < 10 ? '0' + day : day} ${month} ${year} - ${hours}:${minutes}:${seconds} ${ampm}`;
  }
  
  module.exports = { formatDate };
  