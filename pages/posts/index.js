import Link from "next/link";
import Footer from "../../components/Footer";

export default function Posts({ posts }) {
  return (
    <>
      <h2>Post List:</h2>
      {posts.map((post) => {
        return (
          <>
            <Link href={`/posts/${post.id}`} passHref>
              <h3 key={post.id}>
                {post.id} - {post.title}
              </h3>
            </Link>
            <hr />
          </>
        );
      })}
    </>
  );
}

Posts.getLayout = function PageLayout(page) {
  return (
    <>
      {page}
      <Footer />
    </>
  );
};

export async function getStaticProps(context) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const posts = await response.json();

  return {
    props: {
      posts,
    },
  };
}
