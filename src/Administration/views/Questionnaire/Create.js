import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Question from "../../components/Questionnaire/Question";
import { v4 as uuidv4 } from "uuid";
import coreApi from "../../../api/coreApi";
import AddQuestion from "../../components/Questionnaire/AddQuestion";
import swal from "sweetalert";
import Loading from "../../components/Questionnaire/Loading";

const Create = () => {
  const [state, setState] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  //if id is not null, load the questionaire form

  useEffect(async () => {
    //if there is no id initializate the state
    if (!id) return setState({ formName: "", questions: [] });

    //if id id not empty search the data
    try {
      const result = await coreApi.get(`/questionnaire/${id}`);
      setState(result.data);
      console.log(state);
    } catch (e) {}
  }, []);

  const updateFormName = (e) => {
    setState({ ...state, formName: e.target.value });
  };

  const updateFormFlag = (e) => {
    setState({ ...state, flag: e.target.files[0] });
  };

  const saveOrUpdate = (e) => {
    e.preventDefault();
    const form = document.querySelector("#form");
    if (!form.checkValidity()) return form.classList.add("was-validated");

    state._id ? update() : save();
  };

  const save = () => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(state));
    formData.append("flag", state.flag);
    setLoading(true);
    coreApi
      .post("/questionnaire", formData)
      .then((response) => {
        setState(response.data);
        swal("", "Formulario actualizado con exito!", "success");
        setLoading(false);
      })
      .catch(() => {
        swal("Error!", "El formulario no pudo ser actualizado", "error");
        setLoading(false);
      });
  };

  // .put("/questionnaire", {
  //   data: JSON.stringify(state),
  // })

  const update = () => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(state));
    formData.append("flag", state.flag);
    setLoading(true);
    coreApi
      .put("/questionnaire", formData)
      .then((response) => {
        setState(response.data);
        swal("", "Formulario actualizado con exito!", "success");
        setLoading(false);
      })
      .catch(() => {
        swal("Error!", "El formulario no pudo ser actualizado", "error");
        setLoading(false);
      });
  };

  const deleteQuestion = (question) => {
    const questionFiltered = state.questions
      .filter(
        (quest) =>
          (quest.pendingSave === true && quest.tempId !== question.tempId) ||
          (quest.pendingSave !== false && quest._id !== question._id)
      )
      .map((quest, i) => {
        return { ...quest, index: i + 1 };
      });
    setState({ ...state, questions: questionFiltered });
  };

  const renderQuestion = () => {
    return state?.questions.map((question) => {
      return (
        <Question
          key={question._id || question.tempId}
          question={question}
          state={state}
          setState={setState}
          deleteQuestion={deleteQuestion}
        />
      );
    });
  };

  if (state === null) return <p>Cargando...</p>;

  const a = (e) => {
    e.preventDefault();
  };

  return (
    <form id="form" className="needs-validation">
      <AddQuestion state={state} setState={setState} />
      <Loading loading={loading} />

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
              required={!state.flagUrl}
              id="formFile"
              onChange={updateFormFlag}
              name="flag"
            />
            <div className="invalid-feedback">Este Campo es obligatorio</div>
            <img src={state.flagUrl} height={30} alt={state.flagUrl}></img>
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
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Agregar pregunta
            </button>
          </div>
          <hr />
          <div className="col-sm-5 mb-3">
            <button
              onClick={saveOrUpdate}
              type="submit"
              className="btn btn-success"
            >
              {state._id ? "Actualizar Formulario" : "Guardar Formulario"}
            </button>
            <button onClick={a}>boton</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Create;
