import { ArrowRight } from 'lucide-react'
import React from 'react'

function UserCard( {type, Number, date}) {
  return (
      <div className='rounded-2xl odd:bg-blue-400 even:bg-amber-300 flex-1 min-w-[130px]'>
          <div className='w-full px-4 py-4 flex flex-col gap-3'>
              <div className='flex justify-around gap-12  '>
                  <p className='bg-white rounded-xl px-5 '>{date}</p>
                  <ArrowRight size={12} className='  bg-white rotate-320 rounded-3xl'/>
             </div>
              <h2 className='text-2xl font-semibold italic '>{Number}</h2>
              <h1 className='text-lg font-serif text-gray-600 '>{type}</h1>
          </div>
    </div>
  )
}

export default UserCard
