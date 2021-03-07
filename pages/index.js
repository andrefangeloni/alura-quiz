import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';

import Input from '../src/components/Input';
import Button from '../src/components/Button';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import QuizLogo from '../src/components/QuizLogo';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';

const Home = () => {
  const router = useRouter();

  const [name, setName] = React.useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    router.push(`/quiz?name=${name}`);
  };

  return (
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
          <QuizLogo />

          <Widget>
            <Widget.Header>
              <h1>Quiz</h1>
            </Widget.Header>
            <Widget.Content>
              <form onSubmit={onSubmit}>
                <Input
                  value={name}
                  placeholder="Diz aí o seu nome"
                  onChange={(e) => setName(e.target.value)}
                />

                <Button disabled={!name} type="submit">
                  Jogar
                </Button>
              </form>
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
};

export default Home;
