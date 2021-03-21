import React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

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
        <meta property="og:image" content={db.bg} key="image" />
      </Head>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          <QuizLogo />

          <Widget
            animate="show"
            initial="hidden"
            as={motion.section}
            transition={{ delay: 0, duration: 0.5 }}
            variants={{
              show: { opacity: 1, y: '0' },
              hidden: { opacity: 0, y: '100%' },
            }}
          >
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

          <Widget
            animate="show"
            initial="hidden"
            as={motion.section}
            transition={{ delay: 0.5, duration: 0.5 }}
            variants={{ show: { opacity: 1 }, hidden: { opacity: 0 } }}
          >
            <Widget.Header>
              <h1>Quizes da Galera</h1>
            </Widget.Header>
            <Widget.Content>
              <ul>
                {db.external.map((linkExterno, index) => {
                  const [projectName, githubUser] = linkExterno
                    .replace(/\//g, '')
                    .replace('https:', '')
                    .replace('.vercel.app', '')
                    .split('.');

                  return (
                    <li key={`linkExterno${index * 2}`}>
                      <Widget.Topic
                        href={`/quiz/${projectName}___${githubUser}`}
                      >
                        {`${githubUser}/${projectName}`}
                      </Widget.Topic>
                    </li>
                  );
                })}
              </ul>
            </Widget.Content>
          </Widget>

          <Footer
            animate="show"
            initial="hidden"
            as={motion.footer}
            transition={{ delay: 0.5, duration: 0.5 }}
            variants={{ show: { opacity: 1 }, hidden: { opacity: 0 } }}
          />
        </QuizContainer>

        <GitHubCorner projectUrl="https://github.com/andrefangeloni" />
      </QuizBackground>
    </>
  );
};

export default Home;
