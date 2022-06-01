import type { NextPage } from 'next';
import Head from 'next/head';

import styles from '../styles/home.module.css';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Blog home page" />
      </Head>

      <main className={styles['main']}>
        <section className={styles['hero']}>
          <h1>The Blog...</h1>
        </section>

        <section className={styles['blog-list']}>
          <div className={styles['blog-post']}>
            <a href="#">
              <h4 className={styles['blog-post-title']}>The Blog...</h4>
            </a>
            <p>This is blog-post description...</p>
            <p className={styles['blog-post-footer']}>10 Mai 2022</p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
