import { Request, Response } from 'express';
import { pool } from '../index';

export const createQuiz = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const teacherId = 1; // Using our test user's ID

  console.log('Creating quiz:', { title, description, teacherId });

  try {
    const result = await pool.query(
      'INSERT INTO quizzes (title, description, teacher_id) VALUES ($1, $2, $3) RETURNING *',
      [title, description, teacherId]
    );

    console.log('Quiz created:', result.rows[0]);

    res.json({
      success: true,
      quiz: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error creating quiz'
    });
  }
};

export const getQuizzes = async (req: Request, res: Response) => {
  const teacherId = 1; // In a real app, this would come from the authenticated user

  try {
    const result = await pool.query(
      'SELECT * FROM quizzes WHERE teacher_id = $1 ORDER BY created_at DESC',
      [teacherId]
    );

    res.json({
      success: true,
      quizzes: result.rows
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching quizzes'
    });
  }
};

export const getQuiz = async (req: Request, res: Response) => {
  const { id } = req.params;
  const teacherId = 1; // In a real app, this would come from the authenticated user

  try {
    const result = await pool.query(
      'SELECT * FROM quizzes WHERE id = $1 AND teacher_id = $2',
      [id, teacherId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    res.json({
      success: true,
      quiz: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching quiz'
    });
  }
};

export const updateQuiz = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const teacherId = 1; // In a real app, this would come from the authenticated user

  try {
    const result = await pool.query(
      'UPDATE quizzes SET title = $1, description = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 AND teacher_id = $4 RETURNING *',
      [title, description, id, teacherId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    res.json({
      success: true,
      quiz: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating quiz'
    });
  }
};

export const deleteQuiz = async (req: Request, res: Response) => {
  const { id } = req.params;
  const teacherId = 1; // In a real app, this would come from the authenticated user

  try {
    const result = await pool.query(
      'DELETE FROM quizzes WHERE id = $1 AND teacher_id = $2 RETURNING *',
      [id, teacherId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found'
      });
    }

    res.json({
      success: true,
      message: 'Quiz deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting quiz'
    });
  }
}; 