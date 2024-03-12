import Content from "./Content";

function Template(props) {
  return (
    <>
      <Content>{props.children}</Content>
    </>
  );
}

export default Template;
