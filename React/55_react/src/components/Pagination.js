import { useState } from "react";

const Pagination = ({ defaultPage, limit, total, onChange }) => {
  const [page, setPage] = useState(defaultPage);
  const totalPage = Math.ceil(total / limit);

  const handleChangePage = (newPage) => {
    onChange(newPage);
    setPage(newPage);
  };

  return (
    <div>
      <button onClick={() => page !== 0 && handleChangePage(page - 1)}>
        이전
      </button>
      {Array.from(new Array(totalPage), (_, i) => i)
        .filter((i) => {
          if (page < 3) {
            return i < 5;
          } else if (page > totalPage - 3) {
            return i >= totalPage - 5;
          }
          return i >= page - 2 && i <= page + 2;
        }) // 좌우 두개 페이지까지만 보여주느 조건
        .map((i) => (
          <button
            key={i}
            style={{ backgroundColor: page === i ? "red" : "" }}
            onClick={() => handleChangePage(i)}
          >
            {i + 1}
          </button>
        ))}
      <button
        onClick={() => page + 1 !== totalPage && handleChangePage(page + 1)}
      >
        다음
      </button>
    </div>
  );
};
export default Pagination;
