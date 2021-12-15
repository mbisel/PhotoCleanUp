import React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'


export default function SwipableImage({ photo, willKeep, willDelete }) {
    return (
        <View>
            <Image source={{ uri: photo.uri }} style={styles.photo} />
            {willKeep && (
                <View style={styles.keepBox}>
                    <Text style= {{ ...styles.textPrimary, color: '#5fde7b'}}>KEEP</Text>
                </View>
            )}
            {willDelete && (
                <View style={styles.deleteBox}>
                    <Text style= {{ ...styles.textPrimary, color: '#fa6464'}}>DELETE</Text>
                </View>
            )}

        </View>
    )
}

const boxStyle = {
    position: 'absolute',
    top: '50%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 3,
    borderRadius: 10,
}
const styles = StyleSheet.create({
    keepBox: {
        ...boxStyle,
        left: 40,
        borderColor: '#5fde7b'
    },
    deleteBox: {
        ...boxStyle,
        right: 40,
        borderColor: '#fa6464'
    },
    photo: {
        height: '99%',
        resizeMode: 'cover',
        borderRadius: 20,
        backgroundColor: 'gray'
    },
    textPrimary: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold',
      },
})