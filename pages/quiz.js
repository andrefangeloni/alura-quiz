import React from 'react';

import db from '../db.json';

import Button from '../src/components/Button';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

const QuizPage = () => {
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);

  const question = db.questions[questionIndex];
  const totalQuestions = db.questions.length;

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1000);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const nextQuestion = questionIndex + 1;

    if (nextQuestion < totalQuestions) {
      setQuestionIndex(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  };

  const QuizContent = () => {
    switch (screenState) {
      case screenStates.LOADING:
        return <LoadingWidget />;
      case screenStates.RESULT:
        return <ResultWidget />;
      default:
        return <QuestionWidget />;
    }
  };

  const LoadingWidget = () => (
    <Widget>
      <Widget.Header>
        <h1>Carregando...</h1>
      </Widget.Header>

      <Widget.Content>Por favor, aguarde</Widget.Content>
    </Widget>
  );

  const ResultWidget = () => (
    <Widget>
      <Widget.Header>
        <h1>PARABÉNS!!!</h1>
      </Widget.Header>

      <Widget.Content>Você acertou X perguntas</Widget.Content>
    </Widget>
  );

  const QuestionWidget = () => {
    const questionId = `question__${questionIndex}`;

    return (
      <Widget>
        <Widget.Header>
          <h1>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h1>
        </Widget.Header>

        <img
          alt="Descrição"
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
          }}
          src={question.image}
        />

        <Widget.Content>
          <h2>{question.title}</h2>
          <p>{question.description}</p>

          <form onSubmit={onSubmit}>
            {question.alternatives.map((alternative, index) => {
              const alternativeId = `alternative__${index}`;

              return (
                <Widget.Topic
                  as="label"
                  key={alternativeId}
                  htmlFor={alternativeId}
                >
                  <input id={alternativeId} type="radio" name={questionId} />
                  {alternative}
                </Widget.Topic>
              );
            })}
            <Button type="submit">Confirmar</Button>
          </form>
        </Widget.Content>
      </Widget>
    );
  };

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />

        <QuizContent />
      </QuizContainer>
    </QuizBackground>
  );
};

export default QuizPage;
