export const NickReg = /[a-zA-Z]\w{5,14}/;
export const EmailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PassReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}/