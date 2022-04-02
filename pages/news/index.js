export default function NewsArticleList({ articles }) {
  return (
    <>
      <h1>List of News Articles</h1>
      {articles.map((article) => {
        return (
          <div key={article.id}>
            <hr />
            <h2>{article.title}</h2>
            <code>{article.category}</code>
            <p>{article.description}</p>
          </div>
        );
      })}
    </>
  );
}

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3001/news");
  const articles = await response.json();

  return {
    props: {
      articles,
    },
  };
}
