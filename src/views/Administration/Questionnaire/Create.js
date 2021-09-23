import React, { useEffect, useState, useReducer } from "react";
import { useParams } from "react-router-dom";
import Question from "../../../components/Administration/Question";
import coreApi from "../../../api/coreApi";
import AddQuestion from "../../../components/Administration/AddQuestion";
import swal from "sweetalert";
import Loading from "../../../components/Administration/Loading";
import AddDependent from "../../../components/Administration/AddDependent";

const Create = () => {
  const [state, setState] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState({
    question: "",
    answers: [],
  });

  const context = React.createContext();

  //if id is not null, load the questionaire form

  useEffect(async () => {
    //if there is no id initializate the state
    if (!id) return setState({ formName: "", questions: [] });

    //if id id not empty search the data

    try {
      const result = await coreApi.get(`/questionnaire/${id}`);
      setState(result.data);
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
    console.log(JSON.stringify(state))
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

  const addDependent = (e, question) => {
    e.preventDefault();
    if (state.questions.some((q) => q._id === undefined))
      return swal(
        "Alerta",
        "Antes de agregar una dependiente favor guargar/actualizar el formulario",
        "warning"
      );
    setSelectedQuestion(question);
    window.$("#addDependentModal").modal("show");
  };

  const editQuestion = (e, question) => {
    e.preventDefault();
    setSelectedQuestion(question);
    window.$("#addQuestionModal").modal("show");
  };

  const addQuestion = (e, question) => {
    e.preventDefault();
    setSelectedQuestion({ text: "", answers: [] });
    window.$("#addQuestionModal").modal("show");
  };

  const renderQuestion = () => {
    return state?.questions?.map((question) => {
      return (
        <Question
          key={question._id || question.tempId}
          question={question}
          state={state}
          setState={setState}
          deleteQuestion={deleteQuestion}
          editQuestion={editQuestion}
          addDependent={addDependent}
        />
      );
    });
  };

  if (state === null) return <p>Cargando...</p>;

  return (
    <form id="form" className="needs-validation">
      <AddQuestion
        state={state}
        setState={setState}
        selectedQuestion={selectedQuestion}
      />
      <AddDependent
        state={state}
        setState={setState}
        selectedQuestion={selectedQuestion}
      />
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
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>{renderQuestion()}</tbody>
          </table>
          <div className="col-sm-5 mb-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={addQuestion}
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
          </div>
        </div>
      </div>
    </form>
  );
};

export default Create;
