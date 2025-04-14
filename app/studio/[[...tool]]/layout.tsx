import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function StudioLayout({ children }: Props) {
  return (
    <div className="h-screen w-screen">
      {children}
    </div>
  )
} 