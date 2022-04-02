export default function NewsArticleListByCategory({ category, articles }) {
  return (
    <>
      <h1>
        Articles in <i>{category}</i> section
      </h1>

      {articles.map((article) => {
        return (
          <div key={article.id}>
            <hr />
            <h2>{article.title}</h2>
            <p>{article.description}</p>
          </div>
        );
      })}
    </>
  );
}

export async function getServerSideProps(context) {
  const { category } = context.params;

  const response = await fetch(
    `http://localhost:3001/news?category=${category}`
  );
  const articles = await response.json();

  return {
    props: {
      articles,
      category,
    },
  };
}
