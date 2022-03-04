import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchDependentForm, fetchRootForm } from "../../actions";
import Question from "./Question";

const QuestionList = ({ rootForm, dependent, fetchDependentForm, fetchRootForm }) => {
  const [questionnaire, setQuestionnaire] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [root, setRoot] = useState({});
  const history = useHistory();

  useEffect(() => {
    fetchRootForm();
  }, []);

  useEffect(() => {
    setQuestionnaire(rootForm);
  }, [rootForm]);

  const selectAnswer = (questionIndex, answerIndex) => {
    console.log(answerIndex);
    const newQuestionaire = { ...questionnaire };

    const selectedAnswerId =
      newQuestionaire.questions[questionIndex].answers[answerIndex]._id;

    newQuestionaire.questions[questionIndex].selectedAnswerId = selectedAnswerId;

    setQuestionnaire({ ...newQuestionaire });
  };

  const nextQuestion = async (currentDependent) => {
    if (currentDependent && questionnaire.formType === "root")
      return await fetchDependentForm(currentDependent.formId);
    console.log(currentIndex, questionnaire.questions.length);
    if (currentIndex < questionnaire.questions.length - 1)
      setCurrentIndex(currentIndex + 1);
    else history.push("/mailForm");
  };

  useEffect(() => {
    setQuestionnaire(dependent);
    setCurrentIndex(0);
  }, [dependent]);

  const previousQuestion = () => {
    if (currentIndex !== 0) setCurrentIndex(currentIndex - 1);
  };
  if (!questionnaire) return <div></div>;

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

const mapStateToProp = (state) => {
  console.log("state", state.questionnaires);
  return {
    rootForm: state.questionnaires.rootForm,
    dependent: state.questionnaires.dependent,
  };
};

export default connect(mapStateToProp, { fetchRootForm, fetchDependentForm })(
  QuestionList
);
