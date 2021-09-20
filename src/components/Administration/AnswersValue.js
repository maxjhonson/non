import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { fetchQuestionnaire } from "../../actions";

function AnswersValue(props) {
  const { id } = useParams();
  useEffect(() => {
    props.fetchQuestionnaire(id);
  });
  return <div>AnswersValue</div>;
}

const mapStateToProps = (state) => {
  return { questionnaire: null };
};

export default connect(mapStateToProps, { fetchQuestionnaire })(AnswersValue);
