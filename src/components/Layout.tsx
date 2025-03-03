import React from 'react'

import { LocaleSelector } from './LocaleSelector'

interface LayoutProps {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex justify-end p-4">
        <LocaleSelector />
      </header>
      <main className="flex flex-1 items-center justify-center">
        <div className="w-2/3">{children}</div>
      </main>
    </div>
  )
}
