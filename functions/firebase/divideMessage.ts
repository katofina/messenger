export default function divideMessage(message: string) {
  const firstIndex = message.indexOf("/");
  const date = message.slice(0, firstIndex);
  const rest = message.slice(firstIndex + 1);
  const secondIndex = rest.indexOf(":");
  const user = rest.slice(0, secondIndex);
  const text = rest.slice(secondIndex + 1);
  const newDate = new Date(date).toString();
  const stringWithoutGMT = newDate.slice(0, date.indexOf("G"));
  return { stringWithoutGMT, user, text };
}
