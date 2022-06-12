import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import type { FC } from 'react';

import { initializeApollo } from '@/services/apollo';
import type { Post, PostCollection } from '@/types/contentful-types';

import Query from '@/queries/post-collection-id-description.graphql';

import styles from '@/styles/home.module.css';

interface HomePageProps {
  posts: Post[];
}

const HomePage: NextPage<HomePageProps> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>

      <main className={styles['main']}>
        <section className={styles['hero']}>
          <h1>The Blog...</h1>
        </section>

        {posts.map(BlogPost)}
      </main>
    </>
  );
};

const BlogPost: FC<Post> = ({
  id,
  title,
  description,
  sys: { publishedAt },
}) => {
  const date = new Date(publishedAt).toDateString();
  const time = new Date(publishedAt).toLocaleTimeString('en-GB');

  return (
    <section key={id} className={styles['blog-list']}>
      <div className={styles['blog-post']}>
        <Link href={`/${id}`}>
          <a>
            <h4 className={styles['blog-post-title']}>{title}</h4>
          </a>
        </Link>
        <p>{description}</p>
        <p className={styles['blog-post-footer']}>
          {date}&nbsp;-&nbsp;{time}
        </p>
      </div>
    </section>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const client = initializeApollo();
  const { data } = await client.query<{
    postCollection: PostCollection;
  }>({
    query: Query,
  });

  return {
    props: {
      posts: data.postCollection.items,
    },
  };
};

export default HomePage;
