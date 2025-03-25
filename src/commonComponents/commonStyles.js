import { StyleSheet } from "react-native";
import { colors } from "../utils/colors";

export const commonstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    backCard: {
        position: 'absolute',
        width: '85%',
        height: '60%',
        backgroundColor: "rgba(189, 44, 60, 0.4)",
        borderRadius: 20,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        top: '38%',
        overflow: "hidden",
    },
    frontCard: {
        width: '90%',
        height: '60%',
        backgroundColor: 'white',
        alignItems: "center",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        padding: 20,
        paddingTop: 35
    },
    inputContainer: {
        width: '100%',
        marginTop: 20,
    },
    imgbackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "flex-end",
        alignItems: 'center',
    },
    h1text: {
        color: "black",
        fontSize: 20,
        fontWeight: "600",
    },
    inputlabel: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 5,
        color: colors.red,
    },
    screencontainer: {
        flex: 1,
        backgroundColor: colors.lightgrey,
    },
    errortxt: {
        color: 'red',
        fontSize: 12,
  
    }
});