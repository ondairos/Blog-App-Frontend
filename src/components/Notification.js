import { useSelector } from 'react-redux'

const Notification = () => {

    const notificationRedux = useSelector(state => state.notification.message)


    if (notificationRedux === null) {
        return null
    }

    return (
        <div className="error">
            {notificationRedux}

        </div>
    )
}

export default Notification