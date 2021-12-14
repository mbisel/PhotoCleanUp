import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import Swipable from 'react-native-gesture-handler/Swipeable'
import { RectButton } from 'react-native-gesture-handler'
import SwipableImage from './SwipableImage'

function Swipes({ photos, currentIndex, handleKeep, handleDelete, swipesRef }) {
    const [willKeep, setWillKeep] = useState(false)
    const [willDelete, setWillDelete] = useState(false)
    const renderLeftActions = () => {
        return (
            <RectButton style={styles.container}>
                <SwipableImage photo={photos[currentIndex + 1]}>

                </SwipableImage>
            </RectButton>
        )


    }
    const renderRightActions = () => {
        return (
            <RectButton style={styles.container}>
                <SwipableImage photo={photos[currentIndex + 1]}>

                </SwipableImage>
            </RectButton>
        )
 

    }
    return (
        <Swipable
            ref={swipesRef}
            friction={2}
            leftThreshold={40}
            rightThreshold={40}
            renderLeftActions={renderLeftActions}
            renderRightActions={renderRightActions}
            onSwipeableLeftOpen={() => {
                setWillKeep(false)
                handleKeep()
            }}
            onSwipeableRightOpen={() => {
                setWillDelete(false)
                handleDelete()
            }}
            onSwipeableLeftWillOpen={() => setWillKeep(true)}
            onSwipeableRightWillOpen={() => setWillDelete(true)}>
            <SwipableImage photo={photos[currentIndex]} willKeep={willKeep} willDelete={willDelete} />
        </Swipable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default React.forwardRef((props, ref) => <Swipes swipesRef={ref} {...props}></Swipes>)