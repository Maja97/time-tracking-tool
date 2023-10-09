import * as React from 'react';
import { SVGProps } from 'react';
const PauseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      fill="#FF5722"
      fillRule="evenodd"
      d="M9.71 8.317c.696 0 1.245.55 1.245 1.246v4.91c0 .66-.55 1.21-1.245 1.21-.697 0-1.247-.55-1.247-1.21v-4.91c0-.696.55-1.246 1.247-1.246ZM14.29 8.317c.697 0 1.247.55 1.247 1.246v4.91c0 .66-.55 1.21-1.247 1.21-.66 0-1.246-.55-1.246-1.21v-4.91a1.26 1.26 0 0 1 1.246-1.246Z"
      clipRule="evenodd"
    />
    <path
      fill="#FF5722"
      fillRule="evenodd"
      d="M12.018 2.16c5.424 0 9.822 4.398 9.822 9.858 0 5.424-4.398 9.822-9.822 9.822-5.46 0-9.858-4.398-9.858-9.822a9.838 9.838 0 0 1 9.858-9.858Zm0 .806c4.985 0 9.016 4.032 9.016 9.052a9.009 9.009 0 0 1-9.016 9.016c-5.02 0-9.052-4.031-9.052-9.016a9.025 9.025 0 0 1 9.052-9.052Z"
      clipRule="evenodd"
    />
  </svg>
);
export default PauseIcon;
