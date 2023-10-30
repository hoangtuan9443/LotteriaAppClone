import React, {} from 'react'
import { View, Text, ScrollView, TouchableOpacity, Dimensions, StyleSheet, Image, SafeAreaView, Alert } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useSelector, useDispatch} from 'react-redux'

import AutoBanner from '../components/AutoBanner'
import ButtonNavigateHomeScreen from '../components/ButtonNavigateHomeScreen'
import color from '../contains/color'
import WrapTitleContent from '../components/WrapTitleContent'
import ListItem from '../components/ListItem'
import ItemHomeScreen from '../components/ItemHomeScreen'
import ItemNews from '../components/ItemNews'
import Header from '../components/Header';

const {width, height} = Dimensions.get('screen')

const HomeScreen = ({ navigation }) => {

  const promotionList = useSelector(state => state.categoryReducer.promotion) 
  const newsList = useSelector(state => state.categoryReducer.news)
  const token = useSelector(state => state.authenticationReducer.UserToken)
  const mainLocation = useSelector(
    state => state.cartReducer.mainLocation, 
    (prev, next) => JSON.stringify(prev) === JSON.stringify(next)
  )

  const btnNavigateHome = [
    {
      sourceImg: require('../assets/image/bestseller.jpg'),
      handleNavigate: () => navigation.navigate('Đặt hàng')
    },
    {
      sourceImg: require('../assets/image/dathang.jpg'),
      handleNavigate: () => navigation.navigate('Đặt hàng')
    },
    {
      sourceImg: require('../assets/image/khuyenmai.jpg'),
      handleNavigate: () => () => navigation.navigate('Đặt hàng')
    },
    {
      sourceImg: require('../assets/image/cuahang.jpg'),
      handleNavigate: () => {}
    },
  ]

  const handleNavigateToLocation = () => {
    if(token) {
      navigation.navigate('MyLocation')
    } else {
      Alert.alert('Vui lòng đăng nhập để sử dụng !!!')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header validCart={true} handleNavigate={() => navigation.navigate('Cart')}/>
      <ScrollView 
      contentContainerStyle={styles.scrollView}
      showsVerticalScrollIndicator={false}
      >
        <View style={styles.delivery}>
          <Image source={require('../assets/image/carDelivery.jpg')} resizeMode='contain' style={{width: 40, height: '100%'}} />
          <TouchableOpacity style={styles.btnDelivery} onPress={handleNavigateToLocation}>
            <Text style={{fontWeight: '400', color: color.text, fontSize: 12}}>Giao hàng đến <FontAwesome5 name={'angle-down'} size={12} color='#888' /></Text>
            <Text numberOfLines={1} style={{color: color.title, fontWeight: '600'}}>{mainLocation?.location ? mainLocation?.location : 'Xin chọn địa chỉ'}</Text>
          </TouchableOpacity>
        </View>
        <AutoBanner />
        <View style={styles.buttonNavigateHome}>
          {
            btnNavigateHome.map((item, index) => {
              return (<ButtonNavigateHomeScreen key={index} sourceImg={item.sourceImg} handleNavigate={item.handleNavigate} />)
            })
          }
        </View>
        <View style={styles.promotion}>
            <WrapTitleContent title={'ưu đãi đặc biệt'} navigation={navigation} />
            {
              <ListItem
                dataRender={promotionList.map(item => {
                  return (<ItemHomeScreen 
                            key={item.id} 
                            detailsItem={item}
                            image={item.image} 
                            title={item.title} 
                            detailsCombo={item.detailsCombo}
                            initPrice={item.initPrice}
                            discountPrice={item.discountPrice}
                            add={item.add}
                            navigation={navigation}
                            />)
                })}
                itemList={promotionList}
              />
            }
        </View>
        <View style={styles.news}>
            <WrapTitleContent title={'tin tức'} navigation={navigation}/>
            {
              <ListItem 
                itemList={newsList}
                dataRender={newsList.map((item) => {
                  return (<ItemNews key={item.id} title={item.title} imageNews={item.image} />)
                })}
              />
            }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    paddingLeft: 15,
    backgroundColor: color.background,
  },
  delivery: {
    width: '100%',
    height: 0.05 * height,
    marginTop: 15,
    flexDirection: 'row',
  },
  btnDelivery: {
    flex: 1,
    height: '100%',
    marginLeft: 15,
    marginRight: 15 
  },
  buttonNavigateHome: {
    marginTop: 15,
    width: '100%',
    height: 0.25 * height,
    flexWrap: 'wrap',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    paddingRight: 15
  },
  promotion: {
    height: 0.4 * height,
    width: '100%',
  },
  news: {
    height: 0.25 * height,
    width: '100%',
    marginBottom: 15
  },
})