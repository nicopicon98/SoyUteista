import notifee, { AndroidStyle, Notification } from '@notifee/react-native';
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
		console.log(token, "userToken")
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

	useEffect(() => {
		messaging()
			.getInitialNotification()
			.then(async remoteMessage => {
				//Se dispara al llegar una notificacion dentro de la app
				//Deberiamos lanzar una local notification
				//No es necesario
			});
		messaging().onMessage(async remoteMessage => {
			const body = remoteMessage.notification?.body;
			const title = remoteMessage.notification?.title;
			const image = remoteMessage.notification?.android?.imageUrl
			onDisplayNotification(body ?? "", title ?? "", image);
		})
		messaging().setBackgroundMessageHandler(async remoteMessage => {
			console.log("background")
		});
	}, []);
}
