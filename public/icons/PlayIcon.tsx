import * as React from 'react';
import { SVGProps } from 'react';
const PlayIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      fill="#FF5722"
      d="M12 2.16c-5.429 0-9.84 4.411-9.84 9.84s4.411 9.84 9.84 9.84 9.84-4.411 9.84-9.84S17.429 2.16 12 2.16Zm0 .96c4.91 0 8.88 3.97 8.88 8.88s-3.97 8.88-8.88 8.88S3.12 16.91 3.12 12 7.09 3.12 12 3.12ZM9.45 7.44c-.555.012-1.036.458-1.05 1.095v6.922c.019.85.867 1.365 1.612.96l6-3.472a1.088 1.088 0 0 0 0-1.89l-6-3.473a1.122 1.122 0 0 0-.562-.142Z"
    />
  </svg>
);
export default PlayIcon;
