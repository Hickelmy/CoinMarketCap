import { Outlet } from 'react-router-dom'
import { AppContainer } from '../../AppContainer'
import { ErrorBoundary } from '../../../ErrorBoundary'

export function DefaultLayout() {
  return (
    <>
      <AppContainer>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </AppContainer>
    </>
  )
}
