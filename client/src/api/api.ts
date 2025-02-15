import axios, { AxiosError } from 'axios';
import { Quiz } from '../types/quiz';

const API_URL = 'http://localhost:3001/api';

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    throw new Error(error.response?.data?.message || 'An error occurred');
  }
  throw error;
};

export const api = {
  login: async (username: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  getQuizzes: async () => {
    try {
      const response = await axios.get<{ success: boolean; quizzes: Quiz[] }>(
        `${API_URL}/quizzes`
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  createQuiz: async (title: string, description: string) => {
    try {
      const response = await axios.post(`${API_URL}/quizzes`, {
        title,
        description,
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  updateQuiz: async (id: number, title: string, description: string) => {
    try {
      const response = await axios.put(`${API_URL}/quizzes/${id}`, {
        title,
        description,
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  deleteQuiz: async (id: number) => {
    try {
      const response = await axios.delete(`${API_URL}/quizzes/${id}`);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
}; 