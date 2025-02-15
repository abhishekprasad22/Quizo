import express from 'express';
import {
  createQuiz,
  getQuizzes,
  getQuiz,
  updateQuiz,
  deleteQuiz
} from '../controllers/quizController';

const router = express.Router();

router.post('/', createQuiz);
router.get('/', getQuizzes);
router.get('/:id', getQuiz);
router.put('/:id', updateQuiz);
router.delete('/:id', deleteQuiz);

export default router; 