import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api';
import { Quiz } from '../types/quiz';

export function DashboardPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      const response = await api.getQuizzes();
      if (response.success) {
        setQuizzes(response.quizzes);
      }
    } catch (error) {
      console.error('Failed to load quizzes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        const response = await api.deleteQuiz(id);
        if (response.success) {
          setQuizzes(quizzes.filter(quiz => quiz.id !== id));
        }
      } catch (error) {
        console.error('Failed to delete quiz:', error);
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Quizzes</h1>
        <button
          onClick={() => navigate('/quiz/new')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Create New Quiz
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
            <p className="text-gray-600 mb-4">{quiz.description}</p>
            <div className="flex justify-between items-center">
              <button
                onClick={() => navigate(`/quiz/edit/${quiz.id}`)}
                className="text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(quiz.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Created: {new Date(quiz.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {quizzes.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No quizzes yet. Create your first quiz!
        </div>
      )}
    </div>
  );
} 