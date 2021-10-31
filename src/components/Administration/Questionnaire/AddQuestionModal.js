import React from "react";
import { Field, Form } from "react-final-form";
import arrayMutators, { push } from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import Modal from "../../Modal/Modal";
import { ALFABET } from "../../../common/constants";
import { ObjectID } from "bson";

const AddQuestionModal = ({
  show,
  onDismiss,
  addQuestion,
  updateQuestion,
  defaultQuestion,
  cleanDefaultQuesiton,
}) => {
  const required = (value) => (value ? undefined : "Required");
  const requiredArray = (value) =>
    value && value.length > 0 ? undefined : "Required";

  const renderAnswerInput = (name, index, fields) => {
    return (
      <div class="ui small fluid right labeled input">
        <label for="amount" class="ui label">
          {ALFABET[index]}
        </label>
        <Field name={`${name}.letter`} type="hidden">
          {({ input }) => (
            <input {...input} onChange={input.onChange(ALFABET[index])} />
          )}
        </Field>
        <Field
          name={`${name}.text`}
          placeholder="Respuesta"
          component="input"
          validate={required}
        />
        <button
          onClick={() => fields.remove(index)}
          className="ui small negative button"
          type="button"
        >
          x
        </button>
      </div>
    );
  };
  const onSubmit = (valueForm) => {
    if (defaultQuestion)
      updateQuestion("questions", valueForm.index, valueForm);
    else addQuestion("questions", valueForm);
    cleanDefaultQuesiton();
  };
  return (
    <Modal show={show} onDismiss={onDismiss}>
      <div>
        <Form
          initialValues={defaultQuestion ?? { _id: new ObjectID().toString() }}
          onSubmit={onSubmit}
          mutators={{
            ...arrayMutators,
          }}
          render={({
            handleSubmit,
            form: {
              mutators: { push },
              change,
            },
          }) => (
            <form onSubmit={handleSubmit} className="ui form">
              <div className="field">
                <label>Pregunta</label>
                <Field name="text" component="input" validate={required} />
              </div>
              <div className="ui segment">
                <FieldArray name="answers" validate={requiredArray}>
                  {({ fields }) =>
                    fields.map((name, index) => {
                      return (
                        <div key={name} className="field">
                          {renderAnswerInput(name, index, fields, change)}
                        </div>
                      );
                    })
                  }
                </FieldArray>
                <button
                  className="ui button"
                  type="button"
                  onClick={() =>
                    push("answers", {
                      text: "",
                      letter: "",
                      _id: new ObjectID().toString(),
                    })
                  }
                >
                  Agregar Respuesta
                </button>
              </div>
              <button className="ui button" onClick={onDismiss}>
                Cerrar
              </button>
              <button
                className="ui primary button"
                type="submit"
                onClick={handleSubmit}
              >
                Agregar
              </button>
            </form>
          )}
        ></Form>
      </div>
    </Modal>
  );
};

export default AddQuestionModal;
