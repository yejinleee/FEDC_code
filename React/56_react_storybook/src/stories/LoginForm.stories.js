import LoginForm from "../components/LoginForm";

export default {
  title: "Example/LoginForm",
  component: LoginForm,
  argTypes: {
    //매개변수들 !!
    onSubmit2: {
      // LoginForm으로 넘어가는 onSubmit 매개변수!
      action: "form submit !!!", // form submit !!!: {name: "form submit !!!", args: undefined} 이렇게 Actions에 찍힘!
      //controls 라면 컨트롤할 매개변수속성 : { control : 타입 } 형태로 적음 (ex, Circle에서) height: { control: "number" },
    },
  },
};
export const Default = {
  args: {
    primary: true,
    label: "LoginForm",
  },
};
