import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import { CommonHeader } from '../commonComponents/components';
import { commonstyles } from '../commonComponents/commonStyles';
import { colors } from '../utils/colors';

const { width } = Dimensions.get('window');

const RemediesDescription = ({ navigation, route }) => {
    const { videoUrl, description } = route.params || {
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        description: 'This remedy helps reduce stress and increase relaxation. Make sure to follow the routine regularly for better results.',
    };

    return (
        <View style={commonstyles.screencontainer}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <CommonHeader name="Remedies" />

                <View style={styles.videoContainer}>
                    <Video
                        source={{ uri: videoUrl }}
                        style={styles.video}
                        controls
                        resizeMode="contain"
                    />
                </View>
                <View style={{margin: 10}}>
                    <Text style={styles.heading}>Description</Text>

                    <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionText}>{description}</Text>
                    </View>
                </View>


            </ScrollView>
            <View style={styles.bottomTab}>
                <View>
                    <Text>Price</Text>
                    <Text>₹50</Text>
                </View>
                <TouchableOpacity style={styles.followButton}>
                    <Text style={styles.followText}>Book Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    videoContainer: {
        width: '100%',
        height: 240,
        backgroundColor: colors.lightgrey,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        width: width,
        height: 210,
        // borderRadius: 10,
    },
    descriptionContainer: {
        padding: 20,
        backgroundColor: colors.white,
        borderRadius: 10,
        
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.black,
        marginBottom: 10,
    },
    descriptionText: {
        fontSize: 14,
        color: colors.grey2,
        lineHeight: 22,
    },
    bottomTab: {
        backgroundColor: colors.white,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 15,
        alignItems: "center",
        borderTopWidth: 1,
        borderColor: colors.grey3
    },
    followButton: {
        backgroundColor: colors.red,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: "28%",
        marginTop: 10
    },
    followText: {
        fontSize: 12,
        fontWeight: "bold",
        color: colors.white
    },
});

export default RemediesDescription;
