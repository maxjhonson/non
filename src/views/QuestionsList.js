import React, { useEffect, useState } from "react";
import Question from "../components/question";

const dummyDataQuestions = [
  {
    id: 1,
    order: 1,
    questionText: "¿Cual es su situación laboral?",
    answers: [
      { letter: "a", text: "Empleado" },
      { letter: "b", text: "Desempleado" },
      { letter: "c", text: "Negocio Propio" },
    ],
  },
  {
    id: 2,
    order: 2,
    questionText:
      "¿Cuál es rango salarial o ingresos mensuales que corresponde a su situación laboral actual?",
    answers: [
      { letter: "a", text: "5,000 - 15,000" },
      { letter: "b", text: "15,000 - 25,000" },
      { letter: "c", text: "25,000 - 35,000" },
      { letter: "d", text: "35,000 - 45,000" },
      { letter: "e", text: "45,000 - 55,000" },
      { letter: "f", text: "55,000 - 80,000" },
      { letter: "g", text: "80,000 - +" },
    ],
  },
  {
    id: 3,
    order: 3,
    questionText: "¿Que tiempo tiene en su trabajo o con su negocio actual?",
    answers: [
      { letter: "a", text: "Menos de 6 meses" },
      { letter: "b", text: "6 meses a 1 año" },
      { letter: "c", text: "2 - 3 años" },
      { letter: "d", text: "3 - 4 años" },
      { letter: "e", text: "Mas de 5 años" },
    ],
  },
  {
    id: 4,
    order: 4,
    questionText: "¿Cual es el grado académico alcanzado?",
    answers: [
      { letter: "a", text: "Primaria" },
      { letter: "b", text: "Secundaria" },
      { letter: "c", text: "Técnico" },
      { letter: "d", text: "Universitario" },
      { letter: "e", text: "Especialidad o Maestría" },
    ],
  },
  {
    id: 5,
    order: 5,
    questionText: "¿Piensa continuar o ampliar sus estudios en USA?",
    answers: [
      { letter: "a", text: "Si" },
      { letter: "b", text: "No" },
    ],
  },
];

const QuestionsList = () => {
  const [questions, setQuestions] = useState();

  useEffect(() => {
    setTimeout(() => {
      setQuestions(dummyDataQuestions);
    }, 4000);
  }, []);

  const renderQuestions = () => {
    if (!questions)
      return (
        <div className="alert alert-primary" role="alert">
          Las preguntas se estan generando, por favor espere!
        </div>
      );

    return questions?.map((question) => {
      return <Question key={question.id} question={question} />;
    });
  };

  return (
    <div className="container px-4 px-lg-5">
      <div className="row gx-4 gx-lg-5 justify-content-center">
        <div className="col-md-10 col-lg-8 col-xl-7">{renderQuestions()}</div>
      </div>
      <div className="d-grid gap-2">
        <button className="btn btn-primary" type="button">
          concluir cuestionario
        </button>
      </div>
    </div>
  );
};

export default QuestionsList;
