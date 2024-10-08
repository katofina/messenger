import database from "@react-native-firebase/database";

export default function addToContacts(stringRef: string, emailOther: string, nick: string) {
  database()
    .ref(stringRef + "/chats/" + emailOther)
    .update({
      info: {nick},
    });
  database()
    .ref(emailOther + "/chats/" + stringRef)
    .update({
      info: {nick},
    });
}
