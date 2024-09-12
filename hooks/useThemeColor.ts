import { Store } from "@/redux/Store";
import { useDispatch, useSelector } from "react-redux";
import getThemeColor from "./getThemeColor";
import { ObjectColor, ThemeString } from "@/constants/theme/types";
import { themeState } from "@/redux/ThemeSlice";

export default function useThemeColor() {
    const theme = useSelector((store: Store) => store.themeState.theme);
    const dispatch = useDispatch();

    const colors: ObjectColor = getThemeColor(theme);

    function changeTheme(theme: ThemeString) {
        dispatch(themeState.actions.setTheme(theme));
    };

    return { colors, changeTheme };
};