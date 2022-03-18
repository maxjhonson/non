import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchDependentForm, fetchRootForm } from "../../actions";
import Question from "./Question";

const QuestionList = ({ rootForm, dependent, fetchDependentForm, fetchRootForm }) => {
  const [questionnaire, setQuestionnaire] = useState();
  const [questionnaireTree, setQuestionnaireTree] = useState({});
  const [currentQuestionnaire, setCurrentQuestionnaire] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [root, setRoot] = useState({});
  const history = useHistory();

  useEffect(() => {
    fetchRootForm();
  }, []);

  useEffect(() => {
    setQuestionnaire(rootForm);

    questionnaireTree[rootForm?._id] = {
      active: true,
      next: null,
      previous: null,
      listOfQuestions: rootForm?.questions,
    };
    setQuestionnaireTree({ ...questionnaireTree });
    setCurrentQuestionnaire(rootForm?._id);
    console.log(questionnaireTree);
  }, [rootForm]);

  const selectAnswer = (questionIndex, answerIndex) => {
    const newQuestionaire = { ...questionnaire };
    const selectedAnswerId =
      newQuestionaire.questions[questionIndex].answers[answerIndex]._id;
    newQuestionaire.questions[questionIndex].selectedAnswerId = selectedAnswerId;
    setQuestionnaire({ ...newQuestionaire });
  };

  const nextQuestion = async (currentDependent) => {};

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
      question={questionnaireTree[currentQuestionnaire]}
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
