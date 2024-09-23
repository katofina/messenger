import storage from "@react-native-firebase/storage";
import auth from "@react-native-firebase/auth";

export default async function uploadPhoto(uri: string, stringRef: string) {
  const ref = storage().ref(stringRef);
  try {
    await ref.putFile(uri);
    const url = await ref.getDownloadURL();
    await auth().currentUser?.updateProfile({
      photoURL: url,
    });
    return {isSuccess: true, url: url};
  } catch (error) {
    return { isSuccess: false, error: error as string };
  };
};
