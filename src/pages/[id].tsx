import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { initializeApollo } from '@/services/apollo';
import type { Post, PostCollection } from '@/types/contentful-types';

import BlogPostIdsQuery from '@/queries/post-collection-ids.graphql';
import BlogPostQuery from '@/queries/post.graphql';

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
  const id = Number(params?.id);

  const client = initializeApollo();
  const { data } = await client.query<{
    postCollection: PostCollection;
  }>({
    query: BlogPostQuery,
    variables: { id },
  });

  const [post] = data.postCollection.items;

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: post,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const client = initializeApollo();
  const { data } = await client.query<{
    postCollection: PostCollection;
  }>({
    query: BlogPostIdsQuery,
  });

  console.log(data.postCollection.items[0]?.id);

  return {
    paths: data.postCollection.items.map((post) => ({
      params: { id: String(post?.id) },
    })),
    fallback: false,
  };
};

export default BlogPostPage;