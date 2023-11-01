import Header from "./Header.js";
import SuggestKeywords from "./SuggestKeywords.js";
import { requet } from "./api.js";

export default function App({ $target }) {
  this.state = {
    keyword: "", // 키워드검색결과 중 하나 클릭했을 때 Input을 바꾸려면, 입력값을 App의 state에 가지고 있어야한다.
    keywords: [],
  };

  this.setState = (nextState) => {
    this.state = nextState;
    header.setState({
      keyword: this.state.keyword,
    });
    suggestKeywords.setState({
      keywords: this.state.keywords,
    });
  };

  const header = new Header({
    $target,
    initialState: {
      keyword: this.state.keyword,
    },
    onKeywordInput: async (keyword) => {
      if (keyword.trim().length > 1) {
        const keywords = await requet(`/keywords?q=${keyword}`);
        console.log(keywords);
        // suggestKeywords.setState(keywords); //컴포넌트에 setState를 할게아니라 전역의 state를 바꿔야지..
        this.setState({
          ...this.state,
          keyword,
          keywords,
        });
      }
    },
  });
  const suggestKeywords = new SuggestKeywords({
    $target,
    initialState: {
      keywords: this.state.keywords,
      cursor: -1, // 키보드 방향키 용
    },
    onKeywordSelect: (keyword) => {
      this.setState({
        ...this.state,
        keyword,
      });
    },
  });
}
