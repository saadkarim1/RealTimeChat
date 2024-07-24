import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogOutButton from './LogOutButton'

export default function SideBar() {
  return (
    <div className='border-r border-slate-500 flex flex-col p-4'>
        <SearchInput/>
        <div className='divider px-3'></div>
        <Conversations/>
        <LogOutButton/>
    </div>
  )
}
