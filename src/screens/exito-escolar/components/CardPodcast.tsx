import React from 'react'
import { FlatList, Image, ScrollView, Text } from 'react-native'
import { View } from 'react-native-animatable'
import { Podcast } from '../models'


interface Props {
    podcast: Podcast[]
}
const CardPodcast = ({ podcast }: Props) => {
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={podcast}
                renderItem={({ item }) => <View style={{ borderWidth: 5 }}>
                    <Image source={{uri: item.imagen}}/>
                </View>}
            />
        </View>
    )
}

export default CardPodcast
