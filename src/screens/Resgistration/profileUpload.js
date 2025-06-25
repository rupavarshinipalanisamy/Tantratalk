import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { commonstyles } from '../../commonComponents/commonStyles';
import { Images } from '../../utils/images';
import { Button } from '../../commonComponents/Button';
import { colors } from '../../utils/colors';

const predefinedAvatars = [
  Images.avatarfemale,
  Images.avatarmale,
];

const ProfileUpload = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleUploadImage = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 0.7 },
      (response) => {
        if (response.didCancel) return;
        if (response.assets && response.assets.length > 0) {
          setUploadedImage(response.assets[0].uri);
          setSelectedAvatar(null); // override avatar
        }
      }
    );
  };

  const handleSaveChanges = () => {
    const profileImage = uploadedImage || selectedAvatar;
    console.log('Saved profile image:', profileImage);
    // Upload or update logic here
  };

  const getCurrentProfileImage = () => {
    if (uploadedImage) return { uri: uploadedImage };
    if (selectedAvatar) return selectedAvatar;
    return Images.defaultAvatar;
  };

  return (
    <View style={commonstyles.container}>

      <ImageBackground source={Images.loginbg} style={commonstyles.imgbackground} resizeMode="cover">

        <View style={commonstyles.backCard} />
        <View style={commonstyles.frontCard}>
          <Text style={commonstyles.h1text}>Profile Picture</Text>

          <TouchableOpacity onPress={handleUploadImage} style={{ alignItems: 'center', marginBottom: 20 }}>
            <Image
              source={getCurrentProfileImage()}
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                borderWidth: 2,
                borderColor: colors.red,
              }}
            />
            <Text style={{ marginTop: 10, color: colors.red }}>Upload Photo</Text>
          </TouchableOpacity>
          <Text style={{ textAlign: 'center' }}>or</Text>
          <Text style={{ textAlign: 'center', marginVertical: 10 }}>Choose your avatar</Text>
          <ScrollView
            horizontal
            contentContainerStyle={{ justifyContent: 'center', paddingHorizontal: 10 }}
            showsHorizontalScrollIndicator={false}
          >
            {predefinedAvatars.map((avatar, index) => {
              const isSelected = selectedAvatar === avatar;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSelectedAvatar(avatar);
                    setUploadedImage(null); // remove uploaded image if avatar is selected
                  }}
                  style={{
                    marginHorizontal: 5,
                    borderWidth: isSelected ? 2 : 0,
                    borderColor: isSelected ? colors.red : 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 40,
                    width: 68,
                    height: 68,
                    backgroundColor: isSelected ? '#e0f7ff' : 'transparent',
                  }}
                >
                  <Image
                    source={avatar}
                    style={{ width: 60, height: 60, borderRadius: 30 }}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>


          <View style={{ marginTop: 30 }}>
            <Button title="SAVE CHANGES" onPress={handleSaveChanges} fullWidth={true} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileUpload;
