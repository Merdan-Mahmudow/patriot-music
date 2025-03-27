import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useTelegram } from '../hooks/useTelegram'
import NotAllowed from '../components/NotAllowed'
import { useEffect } from 'react'

export const Route = createRootRoute({
    component: MainApp,
})

function MainApp() {
    const { tg } = useTelegram()
    const allowedPlatforms = ['android', 'ios', 'unknown'];
    useEffect(() => {
        tg.WebApp.expand();
        tg.WebApp.BackButton.hide()
        
    })
    tg.WebApp.BackButton.onClick(() => {
        tg.WebApp.close()
    })
    if (allowedPlatforms.includes(tg.WebApp.platform)) {
        return (
            <>
                <Outlet />
                <ReactQueryDevtools />
                <TanStackRouterDevtools />
            </>
        )
    } else {
        return (
            <>
                <NotAllowed/>
            </>
        )
    }
}