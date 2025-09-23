// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://subash-portfolio-backend.onrender.com'

export const API_ENDPOINTS = {
  CONTACT: `${API_BASE_URL}/api/contact`,
  HEALTH: `${API_BASE_URL}/api/health`,
  PORTFOLIO: `${API_BASE_URL}/api/portfolio`
}

export default API_BASE_URL
