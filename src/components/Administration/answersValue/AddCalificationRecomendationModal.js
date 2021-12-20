import React, { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import Modal from "../../Modal/Modal";
import arrayMutators from "final-form-arrays";
import { FieldTextDisplay } from "../../commond/CustomFields";
import { ObjectId } from "bson";

function AddCalificationRecomendationModal({
  show,
  onDismiss,
  recomendations,
  questionnaire,
  updateQuestionnaire,
}) {
  const [initialValues, setInitialValues] = useState(recomendations);
  const [byCalification, setByCalification] = useState([]);
  const [onEditId, setOnEditId] = useState("");
  const onSubmit = (fieldValues) => {
    const recomendationsByCalification = byCalification ?? [];
    const selectedRecomendations = fieldValues.recomendations.filter(
      (x) => x.selected === true
    );

    let newQuestionnaire = {};

    if (fieldValues._id) {
      const newrecomendationsByCalification = recomendationsByCalification.map(
        (rec) => {
          return rec._id === fieldValues._id
            ? { ...fieldValues, recomendations: selectedRecomendations }
            : rec;
        }
      );
      newQuestionnaire = {
        ...questionnaire,
        recomendationsByCalification: [...newrecomendationsByCalification],
      };
    } else {
      newQuestionnaire = {
        ...questionnaire,
        recomendationsByCalification: [
          ...recomendationsByCalification,
          {
            ...fieldValues,
            _id: new ObjectId().toString(),
            recomendations: selectedRecomendations,
          },
        ],
      };
    }

    setByCalification(newQuestionnaire?.recomendationsByCalification);
    setInitialValues({
      startRange: "",
      endRange: "",
      recomendations: recomendations,
    });
    updateQuestionnaire(questionnaire?._id, newQuestionnaire);

    setOnEditId("");
  };

  const edit = (rec) => {
    setOnEditId(rec._id);
    // setByCalification(byCalification.filter((x) => x._id !== rec._id));
    const recSelectedIds = rec.recomendations.map((r) => r._id);

    const recomendationsWithSelected = recomendations.map((rec) => {
      return recSelectedIds.includes(rec._id)
        ? { ...rec, selected: true }
        : rec;
    });
    setInitialValues({
      _id: rec._id,
      startRange: rec.startRange,
      endRange: rec.endRange,
      recomendations: recomendationsWithSelected,
    });
  };

  useEffect(() => {
    setInitialValues({ recomendations: recomendations });
    setByCalification(questionnaire.recomendationsByCalification ?? []);
  }, []);

  return (
    <Modal show={show} onDismiss={onDismiss}>
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
                    {byCalification.map((rec) => {
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
                      <Field
                        name="startRange"
                        component="input"
                        type="number"
                      />
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
                              <FieldTextDisplay
                                name={`${name}.recomendation`}
                              />
                            </td>
                            <td>
                              <FieldTextDisplay
                                name={`${name}.secondRecomendation`}
                              />
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
                  Agregar
                </button>
                <button onClick={onDismiss} type="button" class="ui button">
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        )}
      </Form>
    </Modal>
  );
}

export default AddCalificationRecomendationModal;
