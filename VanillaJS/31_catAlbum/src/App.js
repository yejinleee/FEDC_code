import { request } from "./api.js";
import ImageViewer from "./ImageViewer.js";
import Nodes from "./Nodes.js";
import { API_END_POINT } from "./api.js";
import Loading from "./Loading.js";
import Breadcrumb from "./Breadcrumb.js";

export default function App({ $target }) {
  this.state = {
    isRoot: true,
    isLoading: false,
    nodes: [],
    paths: [], //브레드크럼! 현재까지의 경로
  };

  const loading = new Loading({
    $target,
  });

  const breadcrumb = new Breadcrumb({
    $target,
    initialState: this.state.paths,
    onClick: async (id) => {
      // 클릭한 경로 이후의 paths들 지우기
      if (id) {
        const nextPaths = id ? [...this.state.paths] : [];
        const index = nextPaths.findIndex((path) => path.id === id);
        this.setState({
          ...this.state,
          paths: nextPaths.slice(0, index + 1),
        });
      } else {
        this.setState({
          ...this.state,
          paths: [],
        });
      }

      await fetchNodes(id);
    },
  });

  const nodes = new Nodes({
    $target,
    initialState: {
      isRoot: this.state.isRoot, // root인지에 따라 뒤로가기 유무 판단
      nodes: this.state.nodes,
      selectedImageUrl: null,
    },
    onClick: async (node) => {
      if (node.type === "DIRECTORY") {
        await fetchNodes(node.id);

        this.setState({
          //this.state.paths.push(node); 이거보단 이렇게 setState로! 상태(state)니까 직접 수정은 지양하자
          ...this.state,
          paths: [...this.state.paths, node],
        });
      } else if (node.type === "FILE") {
        imageViewer.setState({
          ...this.state,
          selectedImageUrl: `${API_END_POINT}/static${node.filePath}`,
        });
      }
    },
    onPrevClick: async () => {
      const nextPaths = [...this.state.path];
      nextPaths.pop();
      this.setState({
        ...this.state,
        paths: nextPaths,
      });
      //여기서도 paths.pop(); 이거보단 setState!

      if (nextPaths.length === 0) {
        // 루트로
        await fetchNodes();
      } else {
        await fetchNodes(nextPaths[nextPaths.length - 1].id);
      }
    },
  });

  const imageViewer = new ImageViewer({
    $target,
    onClose: () => {
      this.setState({
        ...this.state,
        selectedImageUrl: null,
      });
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;

    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });

    imageViewer.setState({
      selectedImageUrl: this.state.selectedImageUrl,
    });

    loading.setState(this.state.isLoading);

    breadcrumb.setState(this.state.paths);
  };
  const fetchNodes = async (id) => {
    this.setState({
      ...this.state,
      isLoading: true,
    });
    const nodes = await request(id ? `/${id}` : "/");

    this.setState({
      ...this.state,
      nodes,
      isRoot: id ? false : true,
      isLoading: false,
    });
  };
  fetchNodes();
}
