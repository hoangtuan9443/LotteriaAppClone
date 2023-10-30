import { SafeAreaView , KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'

const KeyboardAvoidViewWrapper = ({children}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
        <KeyboardAvoidingView>
        <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {children}
            </TouchableWithoutFeedback>
        </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default KeyboardAvoidViewWrapper