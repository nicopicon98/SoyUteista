import React from 'react'
import { Dimensions, Text, View } from 'react-native';

interface Props {
    notification: any;
}
const screenSize = Dimensions.get('screen')
const CardNotification = ({ notification }: Props) => {
    return (
        <View style={{
            flex: 1,
            marginHorizontal: screenSize.width * 0.02,
            marginTop: screenSize.height * 0.004,
            marginBottom: screenSize.height * 0.01,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.36,
            shadowRadius: 6.68,
            elevation: 11,
            backgroundColor: 'white',
        }}>
            <View style={{ marginVertical: screenSize.height * 0.005, marginHorizontal: screenSize.width * 0.02 }}>
                <Text style={{ fontSize: screenSize.fontScale * 17, color: 'black' }}>{notification.title}</Text>
                <Text style={{ fontSize: screenSize.fontScale * 12, color: 'black' }}>{notification.body}</Text>
            </View>

        </View>
    )
}

export default CardNotification
