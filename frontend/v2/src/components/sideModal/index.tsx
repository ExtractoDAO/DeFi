"use client"
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function SideModal() {
  const [open, setOpen] = useState(true)
  
  return (
    <div>
      <h1>SideModal</h1>
    </div>
  );
}