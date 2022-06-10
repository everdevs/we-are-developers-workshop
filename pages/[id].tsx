import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';

interface Props {
  id: string;
}

const BlogPost: NextPage<Props> = ({ id }) => {
  return (
    <div>
      <Head>
        <title>Blog post - {id}</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <main>
        <h1>I&apos;m blog post with id {id}</h1>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = ({ params }) => {
  const id = params?.id;

  return {
    props: {
      id,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } },
    ],
    fallback: false,
  };
};

export default BlogPost;
