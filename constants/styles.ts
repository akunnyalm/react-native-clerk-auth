import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff'
    },
    inputField: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderColor: '#133E87',
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff',
        fontFamily: 'Outfit-Regular'
    },
    button: {
        margin: 8,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Outfit-ExtraBold',
        fontSize: 32
    },
    subtitle: {
        fontFamily: 'Outfit-Bold',
        fontSize: 20
    },
    body: {
        fontFamily: 'Outfit-Medium',
        fontSize: 20
    },
    caption: {
        fontFamily: 'Outfit-Regular',
        fontSize: 14,
        textAlign: 'center'
    },
    medium: {
        fontFamily: 'Outfit-Medium'
    }
});



export default styles;