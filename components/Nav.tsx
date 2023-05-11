"use client"

import Image from 'next/image';
import Link from 'next/link';
import { FC, useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders } from "next-auth/react"

interface NavProps {

}

const Nav: FC<NavProps> = ({ }) => {
  const { data: session } = useSession()

  const [providers, setProviders] = useState(null)
  const [toggleDropDown, setToggleDropDown] = useState(false)

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()

      setProviders(response)
    }

    setUpProviders()
  }, [])


  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image
          src="/assets/images/logo.svg"
          alt='Logo promptopia'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className="logo_text">
          Promptopia
        </p>
      </Link>

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link className='black_btn' href="/create-prompt">
              Create Post
            </Link>

            <button
              type='button'
              onClick={signOut}
              className='outline_btn'>
              Sign Out
            </button>

            <Link href="/profile">
              <Image src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt={`${session?.user.name} profile image`}
                />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)} className='black_btn'>
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      <div className='sm:hidden flex flexible'>
        {session?.user ? (
          <div className="flex">
            <Image src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt={`${session?.user.name} profile image`}
              onClick={() => setToggleDropDown((prev) => !prev)} />

            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropDown(false)
                    signOut()
                  }}
                  className='mt-5 w-full black_btn'>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)} className='black_btn'>
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav;