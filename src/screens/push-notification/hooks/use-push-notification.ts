import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const usePushNotification = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [notifications, setNotifications] = useState([])

    const getData = async (key: string) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key)
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch (e) {
            // error reading value
        }
    }
    const getNotifications = async () => {
        const notifications = await getData("notifications");
        setNotifications(notifications)
        setIsLoading(false)
    }

    useEffect(() => {
        getNotifications();
    }, [])

    return {
        isLoading,
        notifications
    }
}

export default usePushNotification
