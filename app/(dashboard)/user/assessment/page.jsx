"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ChevronRight, Check, X } from "lucide-react";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";

const PreAssessmentPage = () => {
  const router = useRouter();

  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");
  // Fetch assessment data
  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const res = await fetch(`/api/courses/${courseId}/assessment?type=PRE`);
        const data = await res.json();
        console.log(data);
        setAssessment(data.assessment);
      } catch (error) {
        toast.error("Failed to load assessment");
      } finally {
        setLoading(false);
      }
    };

    fetchAssessment();
  }, [courseId]);

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    // Save answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = {
      questionId: assessment.questions[currentQuestionIndex].id,
      selectedOption,
      isCorrect:
        selectedOption === assessment.questions[currentQuestionIndex].correct,
    };
    setAnswers(newAnswers);

    // Move to next question or show results
    if (currentQuestionIndex < assessment.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      calculateScore(newAnswers);
      setShowResult(true);
    }
  };

  const calculateScore = (answerList) => {
    const correctAnswers = answerList.filter(
      (answer) => answer.isCorrect
    ).length;
    const calculatedScore = Math.round(
      (correctAnswers / assessment.questions.length) * 100
    );
    setScore(calculatedScore);

    // Save score to the server
    fetch(`/api/assessments/${assessment.id}/score`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score: calculatedScore }),
    });
  };

  const handleCompleteAssessment = () => {
    router.push(`/courses/${courseId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Loader2 className="h-12 w-12 text-blue-500" />
        </motion.div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">No assessment found</p>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="max-w-3xl mx-auto p-6 min-h-screen flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-8 text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className={`inline-flex items-center justify-center w-24 h-24 rounded-full text-3xl font-bold mb-6 ${
                score >= 70
                  ? "bg-green-100 text-green-600"
                  : score >= 50
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {score}%
            </motion.div>

            <h2 className="text-2xl font-bold mb-2">
              {score >= 70
                ? "Great Job!"
                : score >= 50
                ? "Good Effort!"
                : "Keep Practicing!"}
            </h2>
            <p className="text-gray-600 mb-6">
              You scored {score}% on your pre-assessment
            </p>

            <div className="space-y-4 mb-8">
              {assessment.questions.map((question, index) => (
                <div
                  key={question.id}
                  className="text-left p-4 border rounded-lg"
                >
                  <p className="font-medium mb-2">
                    {index + 1}. {question.text}
                  </p>
                  <div className="space-y-2">
                    {question.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`flex items-center p-2 rounded ${
                          answers[index]?.selectedOption === optIndex
                            ? answers[index]?.isCorrect
                              ? "bg-green-50 border border-green-200"
                              : "bg-red-50 border border-red-200"
                            : optIndex === question.correct
                            ? "bg-green-50 border border-green-200"
                            : "bg-gray-50"
                        }`}
                      >
                        {answers[index]?.selectedOption === optIndex ? (
                          answers[index]?.isCorrect ? (
                            <Check className="h-5 w-5 text-green-500 mr-2" />
                          ) : (
                            <X className="h-5 w-5 text-red-500 mr-2" />
                          )
                        ) : optIndex === question.correct ? (
                          <Check className="h-5 w-5 text-green-500 mr-2" />
                        ) : null}
                        <span>{option}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCompleteAssessment}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Continue to Course
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = assessment?.questions?.at(currentQuestionIndex);

  if (!currentQuestion) return <p className="text-center">No questions</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 min-h-screen flex flex-col justify-center">
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-blue-600">
                Pre-Assessment
              </span>
              <span className="text-sm text-gray-500">
                Question {currentQuestionIndex + 1} of{" "}
                {assessment.questions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="h-2 rounded-full bg-blue-600"
                initial={{ width: 0 }}
                animate={{
                  width: `${
                    ((currentQuestionIndex + 1) / assessment.questions.length) *
                    100
                  }%`,
                }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          <h2 className="text-xl font-bold mb-6">{currentQuestion.text}</h2>

          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <button
                  onClick={() => handleOptionSelect(index)}
                  className={`w-full text-left p-4 border rounded-lg transition-colors ${
                    selectedOption === index
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-6 h-6 rounded-full mr-3 ${
                        selectedOption === index
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNextQuestion}
              disabled={selectedOption === null}
              className={`px-6 py-2 rounded-lg font-medium flex items-center ${
                selectedOption !== null
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              {currentQuestionIndex < assessment.questions.length - 1
                ? "Next"
                : "Submit"}
              <ChevronRight className="ml-1 h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PreAssessmentPage;
