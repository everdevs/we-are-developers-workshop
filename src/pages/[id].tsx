import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { initializeApollo } from '@/services/apollo';
import type { Post } from '@/types/contentful-types';

import Query from '@/queries/post.graphql';

import styles from '@/styles/blog-post.module.css';

const BlogPostPage: NextPage<Post> = ({
  sys: { publishedAt },
  title,
  description,
  content,
}) => {
  const date = new Date(publishedAt).toDateString();
  const time = new Date(publishedAt).toLocaleTimeString('en-GB');

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>

      <main className={styles['main']}>
        <section className={styles['hero']}>
          <h1>{title}</h1>
        </section>

        <section className={styles['blog-post']}>
          <Link href="/">
            <a className={styles['link']}>
              <h4>Home</h4>
            </a>
          </Link>

          <p className={styles['description']}>{description}</p>

          {content
            ?.split('\n')
            .filter(Boolean)
            .map((c, i) => (
              <p key={i}>{c}</p>
            ))}

          <p className={styles['blog-post-footer']}>
            {date}&nbsp;-&nbsp;{time}
          </p>
        </section>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;

  const client = initializeApollo();
  const { data } = await client.query<{
    post: Post;
  }>({
    query: Query,
    variables: { id },
  });

  if (!data.post) {
    return {
      notFound: true,
    };
  }

  return {
    props: data.post,
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      { params: { id: '6Pg22gVhxAdmyHcEHquWT8' } },
      { params: { id: '4HPs8RGWCm2jngdqJPJijz' } },
      { params: { id: '66ErFf2hgVmmDxUj6EUchr' } },
    ],
    fallback: false,
  };
};

export default BlogPostPage;
