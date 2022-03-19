import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchDependentForm, fetchRootForm } from "../../actions";
import Question from "./Question";

const QuestionList = ({
  rootForm,
  dependent,
  fetchDependentForm,
  fetchRootForm,
}) => {
  const [questionnaireTree, setQuestionnaireTree] = useState({});
  const [currentIndex, setCurrentIndex] = useState({
    form: 0,
    questionnaire: 0,
  });

  useEffect(() => {
    fetchRootForm();
  }, []);

  useEffect(() => {
    let newQuestionnaire = null;
    if (rootForm) newQuestionnaire = [[...rootForm?.questions]];
    setQuestionnaireTree(newQuestionnaire);
  }, [rootForm]);

  const selectAnswer = (answerId) => {
    const { form, questionnaire } = currentIndex;
    let newQuestionaireTre = [...questionnaireTree];
    newQuestionaireTre[form][questionnaire].selectedAnswerId = answerId;
    setQuestionnaireTree(newQuestionaireTre);
  };

  const nextQuestion = async (currentDependent) => {};

  useEffect(() => {
    /*  setQuestionnaire(dependent);
    setCurrentIndex(0);*/
  }, [dependent]);

  const previousQuestion = () => {
    if (currentIndex !== 0) setCurrentIndex(currentIndex - 1);
  };
  if (!questionnaireTree || !questionnaireTree[currentIndex.form])
    return <div></div>;

  return (
    <Question
      question={
        questionnaireTree[currentIndex.form][currentIndex.questionnaire]
      }
      selectAnswer={selectAnswer}
      index={currentIndex}
      nextQuestion={nextQuestion}
      previousQuestion={previousQuestion}
    />
  );
};

const mapStateToProp = (state) => {
  return {
    rootForm: state.questionnaires.rootForm,
    dependent: state.questionnaires.dependent,
  };
};

export default connect(mapStateToProp, { fetchRootForm, fetchDependentForm })(
  QuestionList
);
