import { css } from '@emotion/react';
import { FC } from 'react';

import Button from '@/components/root/Button';

const myStyle = css`
  color: hotpink;
  font-size: 1rem;
  font-weight: bold;
`;

const Home: FC = () => {
  return (
    <section css={myStyle}>
      <h1>サンプル</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
        blanditiis consequatur eius hic ipsam nostrum omnis optio! Doloribus
        quaerat quis ratione? At, maiores voluptas? Eveniet odio omnis
        repellendus sapiente voluptatibus.
      </p>
      <Button>Lets Start!!</Button>
    </section>
  );
};

export default Home;
