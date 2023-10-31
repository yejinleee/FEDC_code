const DUMMY_DATA = [
  {
    id: "1",
    name: "노란고양이",
    type: "DIRECTORY",
    filePath: null,
    parent: null,
  },
  {
    id: "3",
    name: "까만고양이",
    type: "DIRECTORY",
    filePath: null,
    parent: null,
  },
  {
    id: "10",
    name: "고등어무늬 고양이",
    type: "DIRECTORY",
    filePath: null,
    parent: null,
  },
  {
    id: "13",
    name: "삼색이 고양이",
    type: "DIRECTORY",
    filePath: null,
    parent: null,
  },
  {
    id: "14",
    name: "회색고양이",
    type: "DIRECTORY",
    filePath: null,
    parent: null,
  },
  {
    id: "20",
    name: "하얀고양이",
    type: "DIRECTORY",
    filePath: null,
    parent: null,
  },
];

import Nodes from "./Nodes.js";

export default function App({ $target }) {
  const nodes = new Nodes({
    $target,
    initialState: {
      isRoot: true, // root인지에 따라 뒤로가기 유무 판단
      nodes: DUMMY_DATA,
    },
    onClick: () => {},
  });
}
