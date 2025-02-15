import { Request, Response } from 'express';
import { pool } from '../index';

// For demo purposes, we'll use static credentials
const DEMO_USERNAME = 'teacher';
const DEMO_PASSWORD = 'password123';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
      return res.json({
        success: true,
        user: {
          id: 1,
          username: DEMO_USERNAME
        }
      });
    }

    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
}; 