import styled from 'styled-components';

import { useScreen } from '../hooks/use-screen';

// ==============================================

const Div = styled.div`
  position: absolute;
  height: 100px;
  width: 100px;
  bottom: 5%;
  right: 5%;
`;

// ==============================================

export default function Debug() {
  const { w, h, mobile } = useScreen();

  return (
    <Div>
      <p>W: {w}</p>
      <p>H: {h}</p>
      <p>{mobile ? 'mobile' : 'desktop'}</p>
    </Div>
  );
}
