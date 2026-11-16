import React from 'react';
import CourseQuiz from './CourseQuiz';
import { classicQuizzes } from './classicQuizzes';

interface ClassicCourseQuizProps {
  slug: string;
}

const ClassicCourseQuiz: React.FC<ClassicCourseQuizProps> = ({ slug }) => {
  const quiz = classicQuizzes[slug];
  if (!quiz) return null;
  return <CourseQuiz title={quiz.title} questions={quiz.questions} />;
};

export default ClassicCourseQuiz;
