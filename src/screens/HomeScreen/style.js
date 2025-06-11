import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../utils/colors";
const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightgrey,
    },
    headertxt: {
        fontSize: 14,
        fontWeight: "700",
        marginLeft: 20,
        color: colors.black
    },
    viewalltxt: {
        fontSize: 13,
        fontWeight: "500",
        // marginLeft: 20,
        color: colors.red
    },
    headerConatiner: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    header: {
        backgroundColor: colors.red,
        height: height * 0.2,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingTop: 15,
        paddingHorizontal: 15
    },
    leftSection: {
        flexDirection: "row",
    },
    title: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
        marginLeft: 10,
    },
    rightSection: {
        flexDirection: "row",
    },
    iconSpacing: {
        marginLeft: 15,
    },
    iconContainer: {
        height: 40,
        width: 40,
        borderRadius: 25,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        alignItems: "center", justifyContent: "center"
    },
    searchContainer: {
        flexDirection: "row",
        backgroundColor: "#fff",
        marginTop: 35,
        paddingVertical: 1,
        paddingHorizontal: 15,
        borderRadius: 8,
        elevation: 2,
        alignItems: "center",
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: "#333",
    },
    seeAllText: {
        width: 60,
        fontSize: 13,
        fontWeight: "500",
        color: "#d32f2f",
        textAlign: "center",
    },
    featuresContainer: {
        flexDirection: "row",
        marginBottom: 5
    },
    featureItem: {
        alignItems: "center",
        marginHorizontal: 8,
        marginBottom: 5
        // backgroundColor:"transparent"
    },
    featuresCard: {
        height: 70,
        width: 70,
        elevation: 5,
        borderRadius: 50,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5
    },
    AstrologerCard: {
        height: 140,
        width: 110,
        borderRadius: 8,
        backgroundColor: "white",
        alignItems: "center",
        marginTop: 5,
        elevation: 3, // Shadow for Android
        shadowColor: '#fffff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        // borderWidth: 2, // Debugging border
        // borderColor: "blue", // Debugging color
    },
    remedytxtContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent black background
        width: '100%',
        paddingVertical: 8,
        paddingHorizontal: 12,
        alignItems: 'center',
        position: 'absolute', // Ensures it overlays the image
        bottom: 0, // Sticks to the bottom of the card
    },
    RemediesCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
        marginTop: 10,
        height: 160
    },
    poojasContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: "center",
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", // Keeps "See All" and Card aligned
        marginBottom: 10,
    },
    rowLeft: {
        flexDirection: "row-reverse", // Image on Left, "See All" on Right
    },
    rowRight: {
        flexDirection: "row", // Image on Right, "See All" on Left
    },
    poojasCard: {
        flex: 1, // Allows it to take available space without shrinking
        borderRadius: 12,
        backgroundColor: "#fff",
        overflow: "hidden",
        elevation: 5,
        shadowColor: "#000",
        flexDirection: "row",
        shadowOffset: { width: 0, height: 2 },
        alignItems: "center",
        shadowOpacity: 0.3,
        justifyContent: "space-between",
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderWidth: 0.5,
        // borderColor:colors.red
        borderColor: "#d32f2f",
    },
    poojaImage: {
        width: 80,
        height: 80,
        borderRadius: 50
    },

    poojaTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.black,
    },
    astrologerName: {
        color: colors?.red,
        fontSize: 14,
        fontWeight: "500"
    },
    remedyName: {
        color: colors?.white,
        fontSize: 16,
        fontWeight: "500"
    },
    featureText: {
        textAlign: "center",
        fontSize: 12,
        fontWeight: "400",
        marginLeft: 5,
        color: colors.grey2
    },
    chattxt: {
        color: colors?.black1,
        fontSize: 10,
        fontWeight: "700",
        textAlign: "center",
        marginTop: 5

    },
    remediesContainer: {
        paddingBottom: 10,
        marginHorizontal: 10
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-between", // Ensures even spacing
        alignItems: "flex-start", // Prevents centering of last item
    },
    remediesItem: {
        width: '48%', // Ensures two items per row
        marginBottom: 10,
        margin: 2
    },
    remedyImage: {
        width: '100%',  // Image takes full width of the card
        height: "100%",    // Adjust height to fit inside the card
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },

    image: {
        height: 50,
        width: 50,
        borderRadius: 50,
        marginTop: 15,
    },
    modalOverlay: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)", // Dim background
    },
    overlay: {
        flex: 1, // Click to close
    },
    modalContent: {
        width: "70%",
        height: "100%",
        backgroundColor: "white",
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { width: -2, height: 0 },
        elevation: 5,
    },
    closeButton: {
        alignSelf: "flex-end",
    },
    modalText: {
        marginTop: 20,
        fontSize: 18,
    },
    //booksection
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
        marginBottom: 20,
    },
    bookCard: {
        backgroundColor: colors.red, // Red color
        height: 90,
        width: "48%",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    bookText: {
        color: "#FFFFFF", // White text
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginLeft: 5
    },
    tipsartCard: {
        backgroundColor: colors.white,
        height: 90,
        width: "48%",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderWidth: 1.5,
        borderColor: colors.red
    },
    tipsartCardtxt: {
        color: colors.black, // White text
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginLeft: 5
    },
    line: {
        flex: 1,
        height: 1,
        marginTop: 10,
        // marginLeft: 10,
        backgroundColor: colors.red
    },
    roundButton: {
        width:45,
        height:45,
        borderRadius:8,
        backgroundColor:colors.grey4,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 10,
        marginTop:"40%"
        // top: '40%',
      },
});