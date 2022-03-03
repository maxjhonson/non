import React, { useState } from "react";
import { connect } from "react-redux";
import Question from "./Question";

const _questionnaire = {
  _id: "2020",
  formName: "Estados Unidos",
  questions: [
    {
      _id: "256",
      text: "Como te llamas",
      answers: [
        { _id: "fsad", text: "Manuel" },
        { _id: "sf5a", text: "Pedro" },
        { _id: "fa76s", text: "Ramon" },
        { _id: "f876sa", text: "Rogelio" },
      ],
    },
    {
      _id: "125",
      text: "cuanto anos tienes",
      answers: [
        { _id: "fs65a", text: "25" },
        { _id: "h5fgd", text: "20" },
        { _id: "jg754", text: "15" },
        { _id: "uyt547", text: "18" },
      ],
    },
  ],
};

const QuestionList = (props) => {
  const [questionnaire, setQuestionnaire] = useState({ ..._questionnaire });
  const [currentIndex, setCurrentIndex] = useState(0);

  const selectAnswer = (questionIndex, answerIndex) => {
    console.log(answerIndex);
    const newQuestionaire = { ...questionnaire };

    const selectedAnswerId =
      newQuestionaire.questions[questionIndex].answers[answerIndex]._id;

    newQuestionaire.questions[questionIndex].selectedAnswerId =
      selectedAnswerId;

    setQuestionnaire({ ...newQuestionaire });
  };

  const nextQuestion = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const previousQuestion = () => {
    console.log("hols");
    if (currentIndex !== 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <Question
      question={questionnaire.questions[currentIndex]}
      selectAnswer={selectAnswer}
      index={currentIndex}
      nextQuestion={nextQuestion}
      previousQuestion={previousQuestion}
    />
  );
};

export default connect(null, {})(QuestionList);
