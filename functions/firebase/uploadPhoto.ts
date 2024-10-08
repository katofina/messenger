import storage from "@react-native-firebase/storage";

export default async function uploadPhoto(uri: string, stringRef: string) {
  const ref = storage().ref(stringRef);
  try {
    await ref.putFile(uri);
    const url = await ref.getDownloadURL();
    return {isSuccess: true, url: url};
  } catch (error) {
    return { isSuccess: false, error: error as string };
  };
};
