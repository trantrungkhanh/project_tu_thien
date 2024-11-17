async function callProtectedApi(accountId) {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch('http://localhost:5000/api/protected', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });

        // Kiểm tra nếu status code nằm trong khoảng thành công (200-299)
        if (response.ok) {
            // API thành công
            const data = await response.json();
            const userId = data.user.id;
            if (userId != accountId) {
                return false;
            }
            return true;
        } else {
            // API thất bại
            return false;
        }
    } catch (error) {
        console.error("API call error:", error);
        return false;
    }
}

export default callProtectedApi;
