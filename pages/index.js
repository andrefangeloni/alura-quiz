import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import db from '../db.json';

import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

const Home = () => (
  <>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <title>Alura Quiz</title>
      <meta property="og:title" content="Alura Quiz" key="title" />
      <meta
        property="og:description"
        content="Projeto Imersão React 2"
        key="description"
      />
      <meta
        property="og:url"
        content="https://alura-quiz-andrefangeloni.vercel.app/"
        key="url"
      />
      <meta
        property="og:image"
        content="https://articles.gamerheadquarters.com/images/top10/movies/10.jpg"
        key="image"
      />
    </Head>
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <Widget>
          <Widget.Header>
            <h1>The Legend Of Zelda</h1>
          </Widget.Header>
          <Widget.Content>
            <p>lorem ipsum dolor sit amet...</p>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Header>
            <h1>Quizes da Galera</h1>
          </Widget.Header>
          <Widget.Content>
            <p>lorem ipsum dolor sit amet...</p>
          </Widget.Content>
        </Widget>

        <Footer />
      </QuizContainer>

      <GitHubCorner projectUrl="https://github.com/andrefangeloni" />
    </QuizBackground>
  </>
);

export default Home;
