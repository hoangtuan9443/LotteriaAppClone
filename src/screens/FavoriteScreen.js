import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native'
import FontAweSome5 from 'react-native-vector-icons/FontAwesome5'
import color from '../contains/color'
import { useSelector, useDispatch } from 'react-redux'
import ItemFavorite from '../components/ItemFavorite'
import * as Actions from '../redux/Action'

const {width, height} = Dimensions.get('screen')

const FavoriteScreen = ({navigation}) => {

    const dispatch = useDispatch()
    const favoriteList = useSelector(
        state => state.orderReducer.favoriteList, 
        (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
    )

  return (
    <SafeAreaView style={styles.favorite}>
        <StatusBar backgroundColor={color.background} barStyle={'dark-content'} />
            <View style={styles.headerOrderHistory}>
                <TouchableOpacity style={styles.btnBack} onPress={() => navigation.pop(1)}>
                    <FontAweSome5 name='angle-left' size={24} color={color.text} />
                </TouchableOpacity>
                <Text style={styles.titleHeader}>Món ăn yêu thích</Text>
            </View>
        <ScrollView
            contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
            style={{flex: 1}}
        >
            {JSON.stringify([]) !== JSON.stringify(favoriteList) 
            ? <View style={{width: '100%', paddingHorizontal: 15, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between'}}>
                {   
                    favoriteList.map(item => {
                        return (
                            <ItemFavorite 
                                key={item.id}
                                props={item}
                                navigation={navigation}
                            /> 
                        )
                    })
                }
            </View>
            : <View>
                <Image source={require('../assets/image/noNotification.jpg')} resizeMode='center' style={styles.imgNotification} />
                <Text style={styles.contentNotification}>Hiện tại không có món ưu thích nào.</Text>
            </View>
            }
        </ScrollView>
    </SafeAreaView>
  )
}

export default FavoriteScreen

const styles = StyleSheet.create({
    favorite: {
        flex: 1,
        backgroundColor: color.background
    },
    headerOrderHistory: {
        width: '100%',
        height: height * 0.08,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleHeader: {
        fontSize: 20,
        fontWeight: '500',
        color: color.title,
    },
    btnBack: {
        position: 'absolute',
        left: 15
    },
    imgNotification: {
        width: width,
        height: 0.28 * height
    },
    contentNotification: {
        color: color.text,
        textAlign: 'center'
    },
})