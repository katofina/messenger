export default function divideMessage(message: string) {
  const firstIndex = message.indexOf("/");
  const date = message.slice(0, firstIndex);
  const rest = message.slice(firstIndex + 1);
  const secondIndex = rest.indexOf(":");
  const user = rest.slice(0, secondIndex);
  const text = rest.slice(secondIndex + 1);
  const stringWithoutGMT = date.slice(0, date.indexOf("G"));
  const diff = -new Date().getTimezoneOffset() / 60; // minutes to hours
  const messagediff = Number(date.slice(date.indexOf("G") + 3)) / 100; //delete extra zero
  if (messagediff === diff) return { stringWithoutGMT, user, text };
  else {
    const newDate = new Date(date).toString();
    const stringWithoutGMT = newDate.slice(0, date.indexOf("G"));
    return { stringWithoutGMT, user, text };
  }
}
