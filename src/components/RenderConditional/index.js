const RenderConditional = ({children, isTrue}) => {
  return isTrue ? children : null;
};

export default RenderConditional;
