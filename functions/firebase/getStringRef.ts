export default function getStringRef(email: string) {
  const index = email.indexOf("@");
  const stringForRef = email.substring(0, index);
  return stringForRef;
}
