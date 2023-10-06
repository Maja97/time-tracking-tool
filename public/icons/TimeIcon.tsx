import * as React from 'react';
import { SVGProps } from 'react';
const TimeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      fill={props.fill || '#F9F9FD'}
      d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 17a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8Zm5-7.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 1 1 0V12h4.5a.5.5 0 0 1 .5.5Z"
    />
  </svg>
);
export default TimeIcon;
