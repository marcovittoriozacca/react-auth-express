import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_BASE_URL,
    timeout: 3000,
});

instance.interceptors.request.use(function (config) {
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    const token = parsedUser.token;
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

instance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.status === 401) {
            localStorage.removeItem("user");
            window.location = "/login";
        }
        return Promise.reject(error);
    }
);

export default instance;