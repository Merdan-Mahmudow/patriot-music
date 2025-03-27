const tg = window.Telegram;

export function useTelegram() {

    const onClose = () => {
        tg.WebApp.close()
    }

    const onToggleButton = () => {
        if(tg.WebApp.MainButton.isVisible) {
            tg.WebApp.MainButton.hide();
        } else {
            tg.WebApp.MainButton.show();
        }
    }

    return {
        tg,
        onClose,
        onToggleButton,
        user: tg.WebApp.initDataUnsafe?.user,
        queryId: tg.WebApp.initDataUnsafe?.query_id,
    }
}