import React, { useState } from "react";
import { useParams } from "react-router-dom";
import QuestionForm from "../components/QuestionForm";
import { v4 as uuidv4 } from "uuid";
import coreApi from "../api/coreApi";

const FormManager = () => {
  const [state, setState] = useState({ formName: "", questions: [] });
  const { id } = useParams();

  const addQuestion = (e) => {
    e.preventDefault();
    const index = state.questions.length + 1;
    setState({
      ...state,
      questions: [...state.questions, { index, id: uuidv4(), text: "" }],
    });
  };

  const updateFormName = (e) => {
    setState({ ...state, formName: e.target.value });
  };

  const save = (e) => {
    e.preventDefault();
    const form = document.querySelector("#form");
    if (!form.checkValidity()) return form.classList.add("was-validated");
    coreApi
      .post("form", {
        data: JSON.stringify(state),
      })
      .then((response) => console.log(response))
      .catch((e) => console.log(e));
  };

  const loadForm = async () => {
    if (!id) return;
    const data = await coreApi.get("form", {});
    console.log(data);
  };

  const renderQuestion = () => {
    return state.questions.map((question) => {
      return (
        <QuestionForm
          key={question.id}
          question={question}
          state={state}
          setState={setState}
        />
      );
    });
  };

  return (
    <form id="form" className="needs-validation">
      <div className="container">
        <div className="row">
          <div className="mb-3">
            <label htmlFor="nombreFormulario" className="form-label">
              Nombre del formulario
            </label>
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control has-validation"
                id="nombreFormulario"
                placeholder="Nombre del Formulario"
                value={state.formName}
                onChange={updateFormName}
                required
              />
              <div className="invalid-feedback">Este Campo es obligatorio</div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Bandera del pais
            </label>
            <input
              className="form-control has-validation"
              type="file"
              required
              id="formFile"
            />
            <div className="invalid-feedback">Este Campo es obligatorio</div>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Preguntas</th>
                <th>Respuestas</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{renderQuestion()}</tbody>
          </table>
          <div className="col-sm-5 mb-3">
            <button
              onClick={addQuestion}
              type="submit"
              className="btn btn-primary"
            >
              Agregar pregunta
            </button>
          </div>
          <hr />
          <div className="col-sm-5 mb-3">
            <button onClick={save} type="submit" className="btn btn-success">
              Guardar Formulario
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormManager;
