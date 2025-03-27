import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { useTelegram } from '../hooks/useTelegram'

export const Route = createRootRoute({
    component: MainApp,
})

function MainApp() {
    // const { tg } = useTelegram()
    // const allowedPlatforms = ['android', 'ios'];

    // if (!allowedPlatforms.includes(tg.WebApp.platform)) {
    //     tg.WebApp.close(); // Закрывает WebApp
    // }
    // if () {
        return (
            <>
                <Outlet />
                <ReactQueryDevtools />
                <TanStackRouterDevtools />
            </>
        )
    // } else {
    //     return (
    //         <>
    //             <Outlet />
    //         </>
    //     )
    // }
}