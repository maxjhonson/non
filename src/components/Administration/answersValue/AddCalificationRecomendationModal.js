import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import Modal from "../../Modal/Modal";
import arrayMutators from "final-form-arrays";
import { FieldTextDisplay } from "../../commond/CustomFields";
import { ObjectId } from "bson";
import { connect } from "react-redux";
import {
  addGradeRecomendation,
  fethAllGradeRecomendation,
  updateGradeRecomendation,
  deleteGradeRecomendation,
} from "../../../actions";
import Loader from "../../commond/Loader";

function AddCalificationRecomendationModal({
  show,
  onDismiss,
  recomendations,
  questionnaire,
  updateQuestionnaire,
  addGradeRecomendation,
  fethAllGradeRecomendation,
  allGradeRecomendation,
  updateGradeRecomendation,
  deleteGradeRecomendation,
  isLoading,
}) {
  const [initialValues, setInitialValues] = useState({});
  const [onEditId, setOnEditId] = useState(null);

  const onSubmit = async (fieldValues) => {
    const startRange = fieldValues.startRange;
    const endRange = fieldValues.endRange;
    const selectedRecomendations = fieldValues.recomendations
      .filter((x) => x.selected)
      .map((x) => {
        return x._id;
      });

    const gradeRecomendation = {
      _id: onEditId,
      questionnaire: questionnaire._id,
      startRange,
      endRange,
      recomendations: selectedRecomendations,
    };

    if (!onEditId) {
      await addGradeRecomendation(gradeRecomendation);
    } else {
      await updateGradeRecomendation(gradeRecomendation);
      setOnEditId(null);
    }

    resetForm();
  };

  useEffect(() => {}, []);

  const deleteGrade = () => {
    deleteGradeRecomendation(onEditId);
    resetForm();
  };

  const resetForm = () => {
    setInitialValues({
      startRange: "",
      endRange: "",
      recomendations: [...recomendations],
    });
    setOnEditId(null);
  };

  const edit = (selectedGradeRecomendation) => {
    setOnEditId(selectedGradeRecomendation._id);
    const recomendationsWithSeleted = recomendations.map((recomendation) => {
      const isSelected = selectedGradeRecomendation.recomendations.find(
        (x) => x === recomendation._id
      );
      if (isSelected) return { ...recomendation, selected: true };
      else return recomendation;
    });
    setInitialValues({
      _id: selectedGradeRecomendation._id,
      startRange: selectedGradeRecomendation.startRange,
      endRange: selectedGradeRecomendation.endRange,
      recomendations: recomendationsWithSeleted,
    });
  };

  useEffect(() => {
    setInitialValues({ recomendations: recomendations });
    fethAllGradeRecomendation(questionnaire._id);
  }, []);

  return (
    <Modal show={show} onDismiss={onDismiss}>
      <Loader active={isLoading} />
      <Form
        onSubmit={onSubmit}
        mutators={{ ...arrayMutators }}
        initialValues={initialValues}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit} className="ui form">
            <div className="ui grid">
              <div class="four wide column">
                <table className="ui table">
                  <thead>
                    <th>Rangos</th>
                  </thead>
                  <tbody>
                    {allGradeRecomendation.map((rec) => {
                      return (
                        <tr key={rec._id}>
                          <td>
                            <button
                              type="button"
                              className={`ui ${
                                rec._id === onEditId ? "primary" : ""
                              } button`}
                              onClick={() => edit(rec)}
                            >
                              {`Rango: ${rec.startRange} - ${rec.endRange}`}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div class="twelve wide column">
                <div class="field">
                  <div class="two fields">
                    <div class="field">
                      <label>Rango Inicial</label>
                      <Field name="startRange" component="input" type="number" />
                    </div>
                    <div class="field">
                      <label>Rango Final</label>
                      <Field name="endRange" component="input" type="number" />
                    </div>
                  </div>
                </div>
                <table class="ui celled table">
                  <thead>
                    <tr>
                      <th>Recomendación</th>
                      <th>Recomendación Alterna</th>
                      <th></th>
                    </tr>
                  </thead>

                  <FieldArray name="recomendations">
                    {({ fields }) => (
                      <tbody>
                        {fields.map((name, index) => (
                          <tr>
                            <td>
                              <FieldTextDisplay name={`${name}.recomendation`} />
                            </td>
                            <td>
                              <FieldTextDisplay name={`${name}.secondRecomendation`} />
                            </td>
                            <td>
                              <Field
                                name={`${name}.selected`}
                                component="input"
                                type="checkbox"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </FieldArray>
                </table>
                <button class="ui primary button" type="submit">
                  {!onEditId ? "Agregar" : "Actualzar"}
                </button>
                <button
                  disabled={!onEditId}
                  onClick={resetForm}
                  type="button"
                  class="ui button"
                >
                  Cancelar
                </button>
                <button
                  disabled={!onEditId}
                  onClick={deleteGrade}
                  type="button"
                  class="negative ui button"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </form>
        )}
      </Form>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    allGradeRecomendation: state.gradeRecomendation?.all ?? [],
    isLoading: state.gradeRecomendation.loading,
  };
};

export default connect(mapStateToProps, {
  fethAllGradeRecomendation,
  addGradeRecomendation,
  updateGradeRecomendation,
  deleteGradeRecomendation,
})(AddCalificationRecomendationModal);
