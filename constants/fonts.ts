// font.ts
import * as Font from 'expo-font';

const Fonts = async () => {
    await Font.loadAsync({
        'Outfit-Regular': require('./../assets/fonts/Outfit-Regular.ttf'), 
        'Outfit-Medium': require('./../assets/fonts/Outfit-Medium.ttf'), 
        'Outfit-Bold': require('./../assets/fonts/Outfit-Bold.ttf'), 
        'Outfit-ExtraBold': require('./../assets/fonts/Outfit-ExtraBold.ttf'), 
    });
};

export default Fonts;