import React from 'react';
import InlineSVG from 'svg-inline-react';
import svg from './SvgSprite.svg';
import styles from './style.scss';


export default props => (
  <div>
    <div className={styles.svgSprite}>
      <InlineSVG src={svg} />
    </div>
    {props.children}
  </div>
);