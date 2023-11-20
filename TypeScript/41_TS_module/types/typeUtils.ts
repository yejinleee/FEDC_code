declare module "myUtils" {
  interface Add {
    (a: number, b: number): number;
  }
  interface Subtract {
    (a: number, b: number): number;
  }
  export const add: Add;
  export const subtract: Subtract;

  interface DefaultExport {
    add: Add;
    subtract: Subtract;
  }
  const de: DefaultExport;
  export default de;
}
