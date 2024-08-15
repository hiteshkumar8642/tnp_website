// src/api/announcements.js

import apiClient from '../services/api';

export async function fetchAnnouncements() {
  try {
    const response = await apiClient.get('/api/announcement/');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch announcements', error);
    throw error;
  }
}
