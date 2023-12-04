import propTypes from "prop-types";

const Board = ({ articles }) => {
  return (
    <div>
      <h1>Board</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
    </div>
  );
};
Board.prototype = {
  articles: propTypes.array,
};

export default Board;
