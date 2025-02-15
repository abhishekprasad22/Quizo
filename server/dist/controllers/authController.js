"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
// For demo purposes, we'll use static credentials
const DEMO_USERNAME = 'teacher';
const DEMO_PASSWORD = 'password123';
const login = async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
exports.login = login;
