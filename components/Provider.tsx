import { FC, ReactNode } from 'react'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

interface ProviderProps {
  children: ReactNode,
  session: Session | null
}

const Provider: FC<ProviderProps> = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
     {children}
    </SessionProvider>
  )
}

export default Provider;