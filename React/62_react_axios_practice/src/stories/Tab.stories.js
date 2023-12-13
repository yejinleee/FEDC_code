import Tab from "../components/Tab";
import Header from "../components/Header";

export default {
  title: "Component/Tab",
  component: Tab,
};

export const Default = () => {
  return (
    <Tab>
      <Tab.Item title="titel1 " index="item1">
        Content 1
      </Tab.Item>
      <Tab.Item title="titel2 " index="item2">
        Content 2
      </Tab.Item>
      <Tab.Item title="titel3 " index="item3">
        <Header>Header</Header>
        Content 3
      </Tab.Item>
    </Tab>
  );
};
