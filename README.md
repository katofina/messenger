### Messenger Project
Project for practice react-native (expo).
In this pet project I tried to do messenger via realtime database. You can chat with other people, send image each other, search some user by nickname. There are some settings: changing theme(dark, light, system), changing languages (english or russian), changing nickname, additionally you can set profile photo. Authorization made via firebase and i used redirect by condition(authorized or not). Besides you can delete messages for yourself or for both, can delete all messages at once. Also can copy message to clipboard. Every message has date of sending, that can transform into local date(depend on user).

### Libraries: 
1. @react-native-async-storage/async-storage - for saving theme and language.
2. @react-native-firebase/ - authorization, saving/deleting images, messages.
3. @react-navigation/drawer - in this project the base navigator on condition authorization is drawer navigator.
4. @reduxjs/toolkit - is used for transfer authorization data to different components and to switch language and theme.
5. expo-image-picker - to load image and photos from camera or from galery.
6. react-native-reanimated - is used for effective animations (hints, modules).
7. expo-clipboard - to copy text to clipboard.
