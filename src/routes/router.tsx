import { HashRouter } from 'react-router-dom'

export function RouterWrapper({ children }: { children: React.ReactNode }) {
  return (
    <HashRouter>
      {children}
    </HashRouter>
  )
}