// Centralized API configurations to avoid hardcoded URLs

// Base API URL for backend calls
export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api';

// Portal / Dashboard URL (used for redirects within the app, though less relevant after merging)
export const PORTAL_URL = import.meta.env.VITE_PORTAL_URL || 'http://localhost:3000/dashboard';

// Landing URL (used for redirects back to landing page)
export const LANDING_URL = import.meta.env.VITE_LANDING_URL || 'http://localhost:3000';

// Current App Base URL
export const APP_BASE_URL = window.location.origin + import.meta.env.BASE_URL.replace(/\/$/, "");
