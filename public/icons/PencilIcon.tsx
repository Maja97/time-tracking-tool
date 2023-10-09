import * as React from 'react';
import { SVGProps } from 'react';
const PencilIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path
      fill="#5F6B8A"
      d="M20.827 3.097a3.179 3.179 0 0 0-2.263-.937h-.008a3.18 3.18 0 0 0-2.266.949L2.334 17.207a.6.6 0 0 0-.174.423v3.608a.601.601 0 0 0 .601.602h3.61a.6.6 0 0 0 .425-.176L20.832 7.627a3.205 3.205 0 0 0-.005-4.53ZM6.12 20.637H3.363v-2.76L15.33 5.787l2.82 2.82-12.03 12.03Zm13.86-13.86-.98.98-2.824-2.824.968-.978a1.98 1.98 0 0 1 1.414-.592 1.767 1.767 0 0 1 1.423.59 2 2 0 0 1 0 2.824Z"
    />
  </svg>
);
export default PencilIcon;
