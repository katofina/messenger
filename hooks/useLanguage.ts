import { translation } from "@/constants/language/translation";
import { Store } from "@/redux/Store";
import { useSelector } from "react-redux";

export default function useLanguage() {
    const lang = useSelector((store: Store) => store.langState.lang);
    
    if (lang === "russian") return translation.ru;
    else return translation.en;
};