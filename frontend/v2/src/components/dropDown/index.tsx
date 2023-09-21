import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { useState } from 'react';
import Link from 'next/link';
interface DropdownOption {
  name: string;
  link: string;
}

interface DropdownProps {
  options: DropdownOption[];
}

export default function Dropdown({ options }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex 
                         w-full 
                         justify-center 
                         gap-x-1.5 
                         rounded-md 
                         border 
                         bg-white 
                         px-3 
                         py-2 
                         text-sm 
                         font-semibold 
                         text-gray/900 
                         shadow-sm 
                         border-gray/800
                         
                         dark:bg-deep-gray/100
                         dark:border-deep-gray/200">
          <EllipsisVerticalIcon className="h-5 w-5 text-gray/900 dark:text-gray/300" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute 
                        right-0 
                        z-10 
                        mt-2 
                        w-56 
                        origin-top-right 
                        rounded-md 
                        bg-white 
                        shadow-lg 
                        border 
                        border-gray/200
                        
                        dark:border-deep-gray/200
                        dark:bg-deep-gray/100">
        <div className="py-1">
            {options.map((option, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <Link
                    href={option.link}
                    className={`block 
                        p-[6px]
                        gap-2
                        text-sm 
                        not-italic 
                        font-medium 
                        rounded-md 
                        mx-2 
                        ${active ? 'bg-slate/200 dark:bg-brand/primary/500 text-deep-gray/100 ' : 'text-gray/700 dark:text-white'}`}
                  >
                    {option.name}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
