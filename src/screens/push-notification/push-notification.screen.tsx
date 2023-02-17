import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import FlatListNotification from './components/FlatListNotification';
import usePushNotification from './hooks/use-push-notification';

export const PushNotificationScreen = () => {
	const { isLoading, notifications } = usePushNotification()

	return (
		<View style={{flex: 1}}>
			{isLoading
				? <View style={{ flex: 1, justifyContent: 'center' }}>
					<ActivityIndicator />
				</View>
				:
				<View style={{ flex: 1 }}>
					<FlatListNotification notifications={notifications} />
				</View>}
		</View>
	)

}
