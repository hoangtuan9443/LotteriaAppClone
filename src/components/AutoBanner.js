import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'

const {width, height} = Dimensions.get('screen')

const AutoBanner = () => {

  const [imgList, setImgList] = useState([])
  const [currentImg, setCurretImg] = useState(0)
  const stepCarousel = useRef(null)
  const dataImgList = useSelector(state => state.categoryReducer.banner)

  useEffect(() => {
    setImgList(dataImgList)
  }, [])

  useEffect(() => {
    if(imgList.length > 0) {
      let index = 0
      const unsubcribe = setInterval(() => {
        stepCarousel.current.scrollTo({x: index * (width - 15), y: 0, animate: true})
        index++
        if(index === imgList.length) {
          index = 0
        }
      }, 10000)
    }
  }, [imgList])

  const handleBannerScroll = (e) => {
    if(!e) {
      return
    }
    const { nativeEvent } = e
    if(nativeEvent && nativeEvent.contentOffset) {
      let imageIndex = 0
      if(nativeEvent.contentOffset.x > 0) {
        imageIndex = Math.floor((nativeEvent.contentOffset.x + (width - 30)/2)/(width - 30))
      }
      setCurretImg(imageIndex)
    }
  }

  return (
    <ScrollView 
      style={styles.banner}
      horizontal
      scrollEventThrottle={16}
      contentContainerStyle={{width: imgList.length * width - 15*4, height: '100%'}}
      onScroll={handleBannerScroll}
      showsHorizontalScrollIndicator={false}
      ref={stepCarousel}
      >
        {imgList.map((img, index) => {
          return (<Image key={index} source={img.source} resizeMode='stretch' style={styles.imgBanner} />)
        })}
    </ScrollView>
  )
}

export default React.memo(AutoBanner)

const styles = StyleSheet.create({
    banner: {
        width: '100%',
        height: 0.33 * height,
        borderRadius: 5,
        marginTop: 15,
    },
    imgBanner: {
      borderRadius: 10,
      width: width - 30,
      height: '100%',
      marginRight: 15
    }
})