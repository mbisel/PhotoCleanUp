import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Button, Image, View, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import TopBar from './components/TopBar';
import SwipableImage from './components/SwipableImage';
import * as MediaLibrary from 'expo-media-library';
import BottomBar from './components/BottomBar';
import Swipes from './components/Swipes';


export default function App() {
  const [photos, setPhotos] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const swipesRef = useRef(null)
  const _mediaLibraryAsync = async () => {
    let { status } = await MediaLibrary.requestPermissionsAsync()
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: ['photo'],
    })
    setPhotos(media.assets);
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
  
  
  function handleDelete() {
    nextPhoto();
  }

  function handleKeepPress() {
    swipesRef.current.openLeft()
  }

  function handleDeletePress(){
    swipesRef.current.openRight()
  }
 

  return (
    <View style={styles.container}>
      <TopBar />
      <View style={styles.swipes}>
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
      <BottomBar handleKeepPress={handleKeepPress} handleDeletePress={handleDeletePress} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,

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

