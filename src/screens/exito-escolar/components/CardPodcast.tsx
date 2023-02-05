import React from 'react'
import { FlatList, ScrollView, Text } from 'react-native'
import { View } from 'react-native-animatable'
import { Podcast } from '../models'


interface Props {
    podcast: Podcast[]
}
const CardPodcast = ({ podcast }: Props) => {
    console.log(podcast )
    return (
        <View style={{ flex: 1 , borderWidth: 5}}>
            <FlatList
                data={podcast}
                renderItem={({ item }) => <Text>{item.titulo}</Text>}
            />
        </View>
    )
}

export default CardPodcast
