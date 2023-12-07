import Header from "./components/Header";
import NewTaskForm from "./components/NewTaskForm";
import TaskList from "./components/TaskList";
import styled from "@emotion/styled";

const Container = styled.div`
  width: 400px;
  margin: 0 auto;
`;
function App() {
  return (
    <Container className="App">
      <Header>ToDo</Header>
      <NewTaskForm />
      <TaskList style={{ marginTop: 16 }} />
    </Container>
  );
}

export default App;
