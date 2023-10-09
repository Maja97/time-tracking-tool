import * as React from 'react';
import { SVGProps } from 'react';
const TrashIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      fill="#5F6B8A"
      d="M10.656 18.035V9.201c0-.634-.984-.634-.984 0v8.834c0 .634.984.634.984 0ZM14.243 18.035V9.201c0-.634-.984-.634-.984 0v8.834c0 .634.984.634.984 0Z"
    />
    <path
      fill="#5F6B8A"
      d="M14.833 2.16H9.082c-.918 0-1.662.743-1.662 1.662v1.4H4.556c-.635 0-.635.983 0 .983h.787v13.973c0 .918.743 1.662 1.662 1.662h9.905c.919 0 1.662-.744 1.662-1.662V6.205h.787c.634 0 .634-.984 0-.984h-2.864v-1.4c0-.918-.744-1.661-1.662-1.661ZM8.404 3.822c0-.372.306-.678.678-.678h5.75c.373 0 .679.306.679.678v1.4H8.382v-1.4h.022Zm9.184 16.356a.681.681 0 0 1-.678.678H7.005a.681.681 0 0 1-.678-.678V6.205H17.61v13.973h-.022Z"
    />
  </svg>
);
export default TrashIcon;
