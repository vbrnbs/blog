function ArticlePage(props) {
  const { articles } = props;

  return (
    <div>
      {articles.map((article) => (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.content}</p>
          <div>Tags: {article.tags.join(", ")}</div>
        </div>
      ))}
    </div>
  );
}

export default ArticlePage;
