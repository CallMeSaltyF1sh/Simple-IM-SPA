const isPublic = (url, method) => {
    if(method === 'OPTIONS') {
        return true;
    } else if(method === 'POST') {
        return (url === '/login' || url === 'register');
    } else {
        return false;
    }
};

module.exports = () => {
    
}