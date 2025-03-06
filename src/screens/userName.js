import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import { commonstyles } from '../commonComponents/commonStyles'
import { Images } from '../utils/images'
import { InputField } from '../commonComponents/inputField'
import { Button } from '../commonComponents/Button'
import AnimatedImage from '../commonComponents/AnimatedImage'
import Navigation from '../navigation/navigation'
import { ScreenName } from '../utils/screenName'

const UserName = ({navigation}) => {
    return (
        <View style={commonstyles.container}>
            <ImageBackground source={Images.loginbg} style={commonstyles.imgbackground} resizeMode="cover">
                <AnimatedImage source={Images.animatedLeft} startX={-300} endX={200} />
                <AnimatedImage source={Images.animatedRight} startX={250} endX={-180} />
                <View style={commonstyles.backCard} />
                <View style={commonstyles.frontCard}>
                    <Text style={commonstyles.h1text}>Register</Text>
                    <View style={commonstyles.inputContainer}>
                        <InputField isLabel={true} label="Full Name" borderColor="#00b1f3" />
                        <View style={{ marginTop: 50 }}>
                            <Button title="NEXT" onPress={() => navigation.navigate(ScreenName.genderScreen)} fullWidth={true} />
                        </View>
                    </View>
                </View>

            </ImageBackground>
        </View>
    )
}

export default UserName