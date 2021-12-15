import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Pressable, Image, View, Text, Button } from 'react-native';
import Constants from 'expo-constants';
import TopBar from './components/TopBar';
import SwipableImage from './components/SwipableImage';
import * as MediaLibrary from 'expo-media-library';
import BottomBar from './components/BottomBar';
import Swipes from './components/Swipes';
import { FontAwesome } from '@expo/vector-icons'



export default function App() {
    const [photos, setPhotos] = useState([])
    const [screenshots, setScreenshots] = useState([])
    const [deletedAlbum, setDeletedAlbum] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [allPhotosPressed, setAllPhotosPressed] = useState(false)
    const [screenshotsPressed, setScreenshotsPressed] = useState(false)
    const [nothingPressed, setNothingPressed] = useState(true)
    const [nextPressed, setNextPressed] = useState(false)
    const [albumId, setAlbumId] = useState("")
    const swipesRef = useRef(null)
    const _mediaLibraryAsync = async () => {
        let { status } = await MediaLibrary.requestPermissionsAsync()
        let media = await MediaLibrary.getAssetsAsync({
            mediaType: ['photo'],
            first: 100,
        })
        setPhotos(media.assets);
        let ss = await MediaLibrary.getAssetsAsync({
            mediaSubtype: ['screenshot'],
            first: 100,
        })
        setScreenshots(ss.assets)

        await MediaLibrary.createAlbumAsync("To Delete")
        let albums = await MediaLibrary.getAlbumAsync("To Delete")
        setAlbumId(albums.id)
        console.log(photos[0].uri)


    };


    function nextPhoto() {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
    }

    useEffect(() => {
        _mediaLibraryAsync()
    }, [])

    function handleKeep() {
        nextPhoto()
    }

    async function handleDelete() {
        nextPhoto()
        await MediaLibrary.addAssetsToAlbumAsync(photos[currentIndex], albumId)
        let deleted = await MediaLibrary.getAssetsAsync({
            album: albumId,
        })
        setDeletedAlbum(deleted.assets);

    }

    function handleKeepPress() {
        swipesRef.current.openLeft()
    }

    function handleDeletePress() {
        swipesRef.current.openRight()
    }

    function handleAllPhotosPressed() {
        setAllPhotosPressed(true)
        setNothingPressed(false)
    }

    function handleBackButtonPressedA() {
        setNothingPressed(true)
        setAllPhotosPressed(false)
    }
    function handleBackButtonPressedS() {
        setNothingPressed(true)
        setScreenshotsPressed(false)
    }
    function handleBackButtonPressedN() {
        setAllPhotosPressed(true)
        setNextPressed(false)
    }
    function handleScreenshotsPressed() {
        setScreenshotsPressed(true)
        setNothingPressed(false)
    }
    function handleNextPressed() {
        setNextPressed(true)
        setAllPhotosPressed(false)
    }
    function goHome(){
        setNextPressed(false)
        setNothingPressed(true)
    }

    async function handleFinalDelete() {
        await MediaLibrary.deleteAlbumsAsync(albumId, true)
        setDeletedAlbum([])
    }
    return (

        <View style={styles.container}>

            <TopBar />
            {nothingPressed && (
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.buttons} onPress={handleAllPhotosPressed} ><Text style={styles.text}>All Photos</Text></Pressable>
                    <Pressable style={styles.buttons} onPress={handleScreenshotsPressed}><Text style={styles.text}>Screenshots</Text></Pressable>
                </View>

            )}
            {allPhotosPressed && (

                <View style={styles.swipes}>
                    <FontAwesome style={styles.backArrow} name="arrow-left" size={27} color="gray" onPress={handleBackButtonPressedA} />
                    {photos.length > 1 &&
                        photos.map(
                            (p, i) =>
                                currentIndex === i && (
                                    <Swipes
                                        key={i}
                                        ref={swipesRef}
                                        currentIndex={currentIndex}
                                        photos={photos}
                                        handleKeep={handleKeep}
                                        handleDelete={handleDelete}
                                    ></Swipes>
                                )
                        )}

                </View>

            )}
            {nextPressed && (
                <View>
                    <FontAwesome style={styles.backArrow} name="arrow-left" size={27} color="gray" onPress={handleBackButtonPressedN} />
                    <View style={styles.imgContainer}>

                        {deletedAlbum.length > 0 &&
                            deletedAlbum.map(
                                (p, i) =>
                                    <Image key={i} style={styles.imgItem} source={{ uri: deletedAlbum[i].uri }}></Image>
                            )}
                        {deletedAlbum.length > 0 && (
                           <Pressable style={styles.finalDelete} onPress={handleFinalDelete} ><Text>Delete {deletedAlbum.length} Photos</Text></Pressable>

                        )}
                        {deletedAlbum.length === 0 && (
                           <Pressable style={styles.finalDelete} onPress={goHome} ><Text>Go Home</Text></Pressable>

                        )}
                        



                    </View>
                </View>

            )}
            {screenshotsPressed && (
                <View style={styles.swipes}>
                    {screenshots.length > 1 &&
                        screenshots.map(
                            (p, i) =>
                                currentIndex === i && (
                                    <Swipes
                                        key={i}
                                        ref={swipesRef}
                                        currentIndex={currentIndex}
                                        photos={screenshots}
                                        handleKeep={handleKeep}
                                        handleDelete={handleDelete}
                                    ></Swipes>
                                )
                        )}

                </View>
            )}

            {allPhotosPressed && (
                <View>
                    <Text style={styles.next} onPress={handleNextPressed}>Done<FontAwesome name="arrow-right" size={27} ></FontAwesome></Text>
                    <BottomBar handleKeepPress={handleKeepPress} handleDeletePress={handleDeletePress} />
                </View>
            )}



        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },

    finalDelete: {
        height: 50,
        width: 300,
        backgroundColor: "#CCE0E0",
        shadowColor: '#000',
        alignItems: "center",
        justifyContent: 'space-around',
        borderRadius: 10,
        margin: 20,
        marginLeft: 32,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.12,
        shadowRadius: 5.46,
        elevation: 9,
    },
    buttonContainer: {
        marginTop: 100,
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        fontWeight: "500",
    },
    buttons: {
        height: 100,
        width: 300,
        backgroundColor: "#CCE0E0",
        shadowColor: '#000',
        alignItems: "center",
        justifyContent: 'space-around',
        borderRadius: 10,
        margin: 20,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.12,
        shadowRadius: 5.46,
        elevation: 9,
    },
    backArrow: {
        margin: 1,
    },
    next: {
        left: 300,
        color: "gray",
        margin: 1,
    },
    imgContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    imgItem: {
        width: 93.5,
        height: 93.5,
    },
    swipes: {
        flex: 1,
        padding: 10,
        paddingTop: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
});

