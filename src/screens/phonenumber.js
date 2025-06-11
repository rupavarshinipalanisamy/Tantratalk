import { View, Text, ImageBackground } from 'react-native';
import React from 'react';
import { commonstyles } from '../commonComponents/commonStyles';
import { Images } from '../utils/images';
import { InputField } from '../commonComponents/inputField';
import { Button } from '../commonComponents/Button';
import AnimatedImage from '../commonComponents/AnimatedImage';
import { ScreenName } from '../utils/screenName';
import { useFormik } from 'formik';
import { PhonenumSchema } from '../utils/validationSchema';

const Phonenum = ({ navigation, route }) => {
  const { name } = route.params || {};

  const formik = useFormik({
    initialValues: {
      phonenum: '',
    },
    validationSchema: PhonenumSchema,
    onSubmit: (values) => handleNavigation(values),
  });

  const handleNavigation = (values) => {
    console.log('Name:', name, 'Phone:', values.phonenum);
    navigation.navigate(ScreenName.genderScreen, {
      name,
      phonenum: values.phonenum,
    });
  };

  return (
    <View style={commonstyles.container}>
      <ImageBackground
        source={Images.loginbg}
        style={commonstyles.imgbackground}
        resizeMode="cover"
      >
        <AnimatedImage source={Images.animatedLeft} startX={-300} endX={200} />
        <AnimatedImage source={Images.animatedRight} startX={250} endX={-180} />

        <View style={commonstyles.backCard} />
        <View style={commonstyles.frontCard}>
          <Text style={commonstyles.h1text}>Register</Text>
          <View style={commonstyles.inputContainer}>
            <InputField
              isLabel={true}
              label="Phone Number"
              fullWidth={true}
              borderColor="#00b1f3"
              onBlur={formik.handleBlur('phonenum')}
              value={formik.values.phonenum}
              onChange={(value) => formik.setFieldValue('phonenum', value)}
            />
            {formik.touched.phonenum && formik.errors.phonenum && (
              <Text style={commonstyles.errortxt}>
                {formik.errors.phonenum}
              </Text>
            )}

            <View style={{ marginTop: 50 }}>
              <Button
                title="NEXT"
                onPress={formik.handleSubmit}
                fullWidth={true}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Phonenum;
