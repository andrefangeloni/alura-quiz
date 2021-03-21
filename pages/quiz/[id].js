import React from 'react';

import axios from 'axios';
import { ThemeProvider } from 'styled-components';

import QuizScreen from '../../src/screens/Quiz';

const QuizDaGaleraPage = ({ data }) => (
  <ThemeProvider theme={data.theme}>
    <QuizScreen externalQuestions={data.questions} externalBg={data.bg} />
  </ThemeProvider>
);

export default QuizDaGaleraPage;

export const getServerSideProps = async (context) => {
  const [projectName, githubUser] = context.query.id.split('___');

  const { data } = await axios.get(
    `https://${projectName}.${githubUser}.vercel.app/api/db`,
  );

  return {
    props: { data },
  };
};
