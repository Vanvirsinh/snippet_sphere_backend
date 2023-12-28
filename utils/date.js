const getDate = () => {
    const date = new Date();

    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];

const today = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

return today;
}

module.exports = { getDate }