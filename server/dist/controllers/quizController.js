"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuiz = exports.updateQuiz = exports.getQuiz = exports.getQuizzes = exports.createQuiz = void 0;
const index_1 = require("../index");
const createQuiz = async (req, res) => {
    const { title, description } = req.body;
    const teacherId = 1; // In a real app, this would come from the authenticated user
    try {
        const result = await index_1.pool.query('INSERT INTO quizzes (title, description, teacher_id) VALUES ($1, $2, $3) RETURNING *', [title, description, teacherId]);
        res.json({
            success: true,
            quiz: result.rows[0]
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating quiz'
        });
    }
};
exports.createQuiz = createQuiz;
const getQuizzes = async (req, res) => {
    const teacherId = 1; // In a real app, this would come from the authenticated user
    try {
        const result = await index_1.pool.query('SELECT * FROM quizzes WHERE teacher_id = $1 ORDER BY created_at DESC', [teacherId]);
        res.json({
            success: true,
            quizzes: result.rows
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching quizzes'
        });
    }
};
exports.getQuizzes = getQuizzes;
const getQuiz = async (req, res) => {
    const { id } = req.params;
    const teacherId = 1; // In a real app, this would come from the authenticated user
    try {
        const result = await index_1.pool.query('SELECT * FROM quizzes WHERE id = $1 AND teacher_id = $2', [id, teacherId]);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching quiz'
        });
    }
};
exports.getQuiz = getQuiz;
const updateQuiz = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const teacherId = 1; // In a real app, this would come from the authenticated user
    try {
        const result = await index_1.pool.query('UPDATE quizzes SET title = $1, description = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 AND teacher_id = $4 RETURNING *', [title, description, id, teacherId]);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating quiz'
        });
    }
};
exports.updateQuiz = updateQuiz;
const deleteQuiz = async (req, res) => {
    const { id } = req.params;
    const teacherId = 1; // In a real app, this would come from the authenticated user
    try {
        const result = await index_1.pool.query('DELETE FROM quizzes WHERE id = $1 AND teacher_id = $2 RETURNING *', [id, teacherId]);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting quiz'
        });
    }
};
exports.deleteQuiz = deleteQuiz;
