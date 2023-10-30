import React, {useState, useEffect} from 'react'
import { View, StyleSheet, ScrollView, Dimensions, SafeAreaView, ActivityIndicator, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as Actions from '../redux/Action'

import ListItem from '../components/ListItem'
import CategoryItem from '../components/CategoryItem'
import color from '../contains/color'
import ItemCategory from '../components/ItemCategory'
import Header from '../components/Header'

const {width, height} = Dimensions.get('screen')

const DeliverScreen = ({ navigation }) => {

  const dispatch = useDispatch()
  const orderList = useSelector(state => state.categoryReducer.order, (prev, next) => JSON.stringify(prev) === JSON.stringify(next))
  const category = useSelector(state => state.categoryReducer.category, (prev, next) => JSON.stringify(prev) === JSON.stringify(next))
  const idCategory = useSelector(state => state.categoryReducer.idCategory, (prev, next) => JSON.stringify(prev) === JSON.stringify(next))
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(!idCategory) {
      setLoading(true)
      dispatch({
        type: Actions.API_CHANGE_CATEGORY_ORDERLIST,
        data: { id: '300', setLoading: setLoading, },
      })
    }
  }, [])

  const handleChangeCategory = (e) => {
    setLoading(true)
    dispatch({
      type: Actions.API_CHANGE_CATEGORY_ORDERLIST,
      data: { id: e, setLoading: setLoading, },
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header validCart handleNavigate={() => navigation.navigate('Cart')} />
      <View style={styles.orderScreen}>
        <View style={styles.category}>
          <ListItem  
            dataRender={orderList.map((item) => {
              return (<CategoryItem
                  borderChooseCategory={item.id === idCategory ? {borderWidth: 3, borderColor: 'red'} : {}} 
                  index={item.id}
                  key={item.id} 
                  title={item.title}
                  image={item.image}
                  setCategory={handleChangeCategory}
                  />)
            })}
            />
        </View>
        {!loading ?<ScrollView  
          style={styles.wrapListCategory}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          >
          {
            JSON.stringify(category) !== JSON.stringify([]) 
            ? 
            <View style={{height: '80%', width: width, flexWrap: 'wrap', flexDirection: 'row', paddingHorizontal: 15, justifyContent: 'space-between'}}>
              {
                category.map((item, index) => {
                  return (<ItemCategory
                            detailsItem={item}
                            key={index}
                            image={item.image}
                            title={item.title}
                            initPrice={item.initPrice}
                            discountPrice={item.discountPrice}
                            add={item.add}
                            navigation={navigation}
                            />)
                })
              }
            </View>
            : null
          }
        </ScrollView>
        : <ActivityIndicator color={color.primary} size='large' style={{flex: 1}} />
        }
      </View>
    </SafeAreaView>
  )
}

export default DeliverScreen

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    orderScreen: {
      width: '100%',
      height: '100%',
      backgroundColor: color.background
    },
    category: {
      width: '100%',
      height: 0.15 * height,
      marginTop: 15
    },
    wrapListCategory: {
      marginTop: 5,
      width: width,
      marginBottom: 60,
    },
})