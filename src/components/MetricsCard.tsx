// import React from 'react'
// import { IconArrowRight } from '@tabler/icons-react'

// const MetricsCard = ({ 
//     title, 
//     subtitle, 
//     value,
//     icon: Icon,
//     onClick,
//     iconSize = 34
// }) => (
//     <div className='flex flex-col h-full rounded-xl border bg-[#1c1c24] shadow-sm dark:border-neutral-800'>
//         <div className='flex items-center justify-between p-5 md:p-6 flex-grow'>
//             <div className='flex-grow'>
//                 <p className='text-md uppercase tracking-wide text-neutral-500'>
//                     {title}
//                 </p>
//                 <h3 className='mt-2 text-2xl font-medium text-neutral-200 sm:text-3xl'>
//                     {value}
//                 </h3>
//             </div>
//             <div className='flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#28282f]'>
//                 <Icon size={iconSize} className="text-green-500" />
//             </div>
//         </div>
//         <a
//         onClick={onClick}
//         className='mt-auto inline-flex items-center justify-between rounded-b-xl border-t border-neutral-700 px-5 py-3 text-md text-neutral-300 hover:bg-neutral-800 cursor-pointer transition-colors duration-200'
//         >
//             {subtitle}
//             <IconArrowRight size={18} className="text-neutral-300" />
//         </a>
//     </div>
// )

// export default MetricsCard;

import React from "react";
import { IconChevronRight } from "@tabler/icons-react";

const MetricsCard = ({
  title,
  subtitle,
  value,
  icon: Icon,
  progress,
  onClick,
}) => (
  <div className="flex flex-col rounded-xl border bg-white shadow-sm dark:border-neutral-800 dark:bg-[#13131a]">
    <div className="flex justify-between gap-x-3 p-4 md:p-5">
      <div>
        <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
          {title}
        </p>
        <div className="mt-1 flex items-center gap-x-2">
          <h3 className="text-xl font-medium text-gray-800 sm:text-2xl dark:text-neutral-200">
            {value}
          </h3>
        </div>
      </div>
      <div className="flex size-[46px] h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white dark:bg-[#1c1c24] dark:text-blue-200">
        <Icon size={25} className="text-green-500" />
      </div>
    </div>
    <a
      className="inline-flex items-center justify-between rounded-b-xl border-t border-gray-200 px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 md:px-5 dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-800"
      href="#"
      onClick={onClick}
    >
      {subtitle}
      <IconChevronRight />
    </a>
  </div>
);

export default MetricsCard;