import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ========== PUBLIC APIs ==========
export const getSettings = () => api.get('/public/settings');
export const getHomepageContent = () => api.get('/public/homepage');
export const getPlans = () => api.get('/public/plans');
export const getFeatures = () => api.get('/public/features');
export const getFAQs = () => api.get('/public/faqs');
export const getSampleReport = () => api.get('/public/sample-report');
export const getPrivacy = () => api.get('/public/privacy');
export const getTerms = () => api.get('/public/terms');

// ========== AUTH APIs ==========
export const signup = (data) => api.post('/hr/signup', data);
export const login = (data) => api.post('/hr/login', data);

// ========== INTERVIEW APIs ==========
export const createInterview = (jobTitle) => api.post('/interview/hr/create', { jobTitle });
export const getHRDashboard = () => api.get('/interview/hr/dashboard');
export const getHRInterviews = () => api.get('/interview/hr/list');
export const getInterviewReport = (id) => api.get(`/interview/hr/report/${id}`);

// Candidate APIs (no auth)
export const getInterviewByLink = (link) => axios.get(`${API_BASE_URL}/interview/${link}`);
export const startInterview = (link, data) => axios.post(`${API_BASE_URL}/interview/${link}/start`, data);
export const submitInterview = (link, data) => axios.post(`${API_BASE_URL}/interview/${link}/submit`, data);

// ========== PAYMENT APIs ==========
export const createCheckout = (planId) => api.post('/payment/checkout', { planId });
export const submitManualPayment = (data) => api.post('/payment/manual', data);
export const getPaymentHistory = () => api.get('/payment/history');
export const getManualPaymentInstructions = () => axios.get(`${API_BASE_URL}/payment/manual/instructions`);

// ========== ADMIN APIs ==========
export const getDashboardStats = () => api.get('/admin/dashboard/stats');
export const getAllSettings = () => api.get('/admin/settings');
export const updateGlobalSettings = (data) => api.put('/admin/settings/global', data);
export const getAllPlans = () => api.get('/admin/plans');
export const createPlan = (data) => api.post('/admin/plans', data);
export const updatePlan = (id, data) => api.put(`/admin/plans/${id}`, data);
export const deletePlan = (id) => api.delete(`/admin/plans/${id}`);
export const getAllUsers = () => api.get('/admin/users');
export const getPendingPayments = () => api.get('/admin/payments/pending');
export const approvePayment = (id) => api.post(`/admin/payments/${id}/approve`);

export default api;
