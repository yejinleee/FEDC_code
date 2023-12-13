import Breadcrumb from "../components/Breadcrumb";

export default {
  title: "Component/Breadcrumb",
  component: Breadcrumb,
};

export const Default = ({ children, ...props }) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/Home">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="/lv1">Lv1</Breadcrumb.Item>
      <Breadcrumb.Item href="/lv2">Lv2</Breadcrumb.Item>
      {children}
    </Breadcrumb>
  );
};
