import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import createDecorator from "final-form-calculate";
import { getIn } from "final-form";
import { addRule } from "../../actions";
import { connect } from "react-redux";
import { ObjectID } from "bson";

const AddRuleModal = ({ questionnaire, addRule, onDismiss, selectedRule }) => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  useEffect(() => {
    //   setSelectedAnswers(selected);
  }, [selectedRule]);
  if (!questionnaire) return <div>Loading</div>;

  const onSubmit = (formValue, e) => {
    const questionsRule = formValue.questions
      .filter((que) => que.hasAnswersRule)
      .map((question) => {
        const answers = question.answers
          .filter((answer) => answer.addedToRule)
          .map((answer) => {
            return { text: answer.text, answerId: answer._id };
          });

        return {
          text: question.text,
          questionId: question._id,
          answers: answers,
        };
      });
    const data = {
      _id: new ObjectID().toString(),
      formId: formValue._id,
      ruleName: formValue.ruleName,
      ruleValue: formValue.ruleValue,
      questionsRule: questionsRule,
    };
    addRule(data);
    onDismiss();
  };

  const renderAnswerList = (name) => {
    return (
      <React.Fragment>
        <div className="inline fields">
          <div className="field">
            <Field
              name={`${name}.letter`}
              render={(props) => {
                return <h5 class="ui header">{props.input.value})</h5>;
              }}
            />
          </div>
          <div className="field">
            <Field
              name={`${name}.text`}
              render={(props) => {
                return <h5 class="ui header">{props.input.value}</h5>;
              }}
            />
          </div>
          <div className="field">
            <Field
              name={`${name}.addedToRule`}
              render={(props) => renderCheckBox(props)}
              type="checkbox"
            />
          </div>
        </div>
      </React.Fragment>
    );
  };

  const renderQuestionList = (name) => {
    return (
      <div className="ui segment">
        <Field
          name={`${name}.text`}
          render={(props) => {
            return <h5 class="ui header">{props.input.value}</h5>;
          }}
        />
        <FieldArray name={`${name}.answers`}>
          {({ fields }) =>
            fields.map((name) => {
              return renderAnswerList(name);
            })
          }
        </FieldArray>
      </div>
    );
  };

  const renderCheckBox = (props, id) => {
    return (
      <div class="ui checkbox">
        <input {...props.input} />
        <label>Agregarla a la regla</label>
      </div>
    );
  };

  const renderRuleValue = (props) => {
    const onchange = (amount) => {
      const value = !props.input.value ? 0 : props.input.value;
      props.input.onChange(value + amount);
    };
    return (
      <div class="inline field">
        <label>Valor de la convinación Seleccionada</label>
        <div class="ui buttons">
          <button class="ui button" type="button" onClick={() => onchange(-1)}>
            -
          </button>
          <div class="or" data-text={props.input.value}></div>
          <button
            class="ui positive button"
            type="button"
            onClick={() => onchange(1)}
          >
            +
          </button>
        </div>
      </div>
    );
  };

  const decorator = createDecorator({
    field: /questions\[\d+\]\.answers\[\d+\]\.addedToRule/,
    updates: (value, name, allValues) => {
      const questionsName = name.substring(0, 20);
      const propertyName = `${name.substring(0, 12)}.hasAnswersRule`;
      const answers = getIn(allValues, questionsName);
      const hasAnswersRule = answers.some((ans) => ans.addedToRule === true);
      return { [propertyName]: hasAnswersRule };
    },
  });

  return (
    <Form
      decorators={[decorator]}
      onSubmit={onSubmit}
      mutators={{ ...arrayMutators }}
      initialValues={questionnaire}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="ui form">
          <div className="field">
            <label>Nombre de la regla</label>
            <Field name="ruleName" component="input" />
          </div>
          <FieldArray name="questions">
            {({ fields }) =>
              fields.map((name) => {
                return renderQuestionList(name);
              })
            }
          </FieldArray>
          <Field name="ruleValue" render={renderRuleValue} />

          <button class="ui primary button" type="submit">
            Agregar Regla
          </button>
          <button class="ui  button" type="submit" onClick={onDismiss}>
            Cancelar
          </button>
        </form>
      )}
    ></Form>
  );
};

export default connect(null, { addRule })(AddRuleModal);
