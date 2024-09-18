import database from "@react-native-firebase/database";
import storage from "@react-native-firebase/storage";

export default async function uploadPhoto(uri: string, stringRef: string) {
  const ref = storage().ref(stringRef);
  try {
    await ref.putFile(uri);
    const url = await ref.getDownloadURL();
    await database().ref(stringRef).set({
      photoUrl: url,
    });
    console.log("success");
  } catch (error) {
    console.log(error);
  }
}
