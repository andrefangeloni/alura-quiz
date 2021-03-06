import React from 'react';

import Button from '../../components/Button';
import Widget from '../../components/Widget';
import QuizLogo from '../../components/QuizLogo';
import BackLinkArrow from '../../components/BackLinkArrow';
import QuizContainer from '../../components/QuizContainer';
import QuizBackground from '../../components/QuizBackground';
import AlternativesForm from '../../components/AlternativesForm';

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

const QuizPage = ({ externalQuestions, externalBg }) => {
  const [results, setResults] = React.useState([]);
  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [selectedAlternative, setSelectedAlternative] = React.useState(null);
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [isQuestionSubmitted, setIsQuestionSubmitted] = React.useState(false);

  const question = externalQuestions[questionIndex];
  const totalQuestions = externalQuestions.length;

  const isCorrect = selectedAlternative === question.answer;

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1000);
  }, []);

  const AddResult = (newResult) => setResults([...results, newResult]);

  const onSubmit = (e) => {
    e.preventDefault();

    AddResult(isCorrect);
    setIsQuestionSubmitted(true);

    setTimeout(() => {
      const nextQuestion = questionIndex + 1;

      if (nextQuestion < totalQuestions) {
        setQuestionIndex(nextQuestion);
      } else {
        setScreenState(screenStates.RESULT);
      }

      setIsQuestionSubmitted(false);
      setSelectedAlternative(null);
    }, 2000);
  };

  const RightOrWrong = () => {
    if (isQuestionSubmitted) {
      if (isCorrect) {
        return <p>Certa resposta!</p>;
      }

      return <p>Que pena, você errou</p>;
    }

    return null;
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
        <h1>Resultados</h1>
      </Widget.Header>

      <Widget.Content>
        <p>
          {`Você acertou ${
            results.filter((result) => result).length
          } pergunta(s)`}
        </p>

        <ul>
          {results.map((result, index) => (
            <li key={`result__${index * 2}`}>
              {`Pergunta ${index + 1}: ${
                result ? 'Acertou' : 'Errou'
              }`}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );

  const QuestionWidget = () => (
    <Widget>
      <Widget.Header>
        <BackLinkArrow href="/" />

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

        <AlternativesForm onSubmit={onSubmit}>
          {question.alternatives.map((alternative, index) => {
            const alternativeId = `alternative__${index}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';

            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={selectedAlternative === index}
                data-status={isQuestionSubmitted && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  type="radio"
                  id={alternativeId}
                  name={`question__${questionIndex}`}
                  onChange={() => setSelectedAlternative(index)}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={selectedAlternative == null}>
            Confirmar
          </Button>

          <RightOrWrong />
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );

  return (
    <QuizBackground backgroundImage={externalBg}>
      <QuizContainer>
        <QuizLogo />

        <QuizContent />
      </QuizContainer>
    </QuizBackground>
  );
};

export default QuizPage;
