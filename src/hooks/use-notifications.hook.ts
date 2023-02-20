import notifee, { AndroidStyle, Notification } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';

export const useNotifications = () => {
	const onDisplayNotification = async (body: string, title: string, photo?: string) => {
		await notifee.requestPermission()
		const channelId = await notifee.createChannel({
			id: 'soyuteista',
			name: 'SoyUteìsta',
		});
		await messaging().registerDeviceForRemoteMessages();
		const token = await messaging().getToken();
		let displayNotification: Notification;
		if (!photo) {
			displayNotification = {
				title,
				body,
				android: {
					channelId,
					pressAction: {
						id: 'soyuteista',
					},
				},
			}
		} else {
			displayNotification = {
				title,
				body,
				android: {
					channelId,
					style: { type: AndroidStyle.BIGPICTURE, picture: photo! },
					pressAction: {
						id: 'soyuteista',
					},
				},
			}
		}
		await notifee.displayNotification(displayNotification);
	}
	const getData = async (key: string) => {
		try {
			const jsonValue = await AsyncStorage.getItem(key)
			return jsonValue != null ? JSON.parse(jsonValue) : [];
		} catch (e) {
			// error reading value
		}
	}

	const getToken = async () => {
		const token = await messaging().getToken();
	}

	useEffect(() => {
		// getToken()
		messaging()
			.getInitialNotification()
			.then(async remoteMessage => {
				//Se dispara al llegar una notificacion dentro de la app
				//Deberiamos lanzar una local notification
				//No es necesario
			});
		messaging().onMessage(async remoteMessage => {
			console.log("desde aqui")
			const body = remoteMessage.notification?.body;
			const title = remoteMessage.notification?.title;
			const image = remoteMessage.notification?.android?.imageUrl
			await onDisplayNotification(body ?? "", title ?? "", image);
			const notificationsData = await getData("notifications")
			const addingNotification = [...notificationsData, { body, title, image }]
			await AsyncStorage.setItem('notifications', JSON.stringify(addingNotification));
		})
		messaging().setBackgroundMessageHandler(async remoteMessage => {
			console.log("o desde aqui yo que se")
			const body = remoteMessage.notification?.body;
			const title = remoteMessage.notification?.title;
			const image = remoteMessage.notification?.android?.imageUrl
			await onDisplayNotification(body ?? "", title ?? "", image);
			const notificationsData = await getData("notifications")
			const addingNotification = [...notificationsData, { body, title, image }]
			await AsyncStorage.setItem('notifications', JSON.stringify(addingNotification));
		});
	}, []);
}
