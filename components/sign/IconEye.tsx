import { FontAwesome } from "@expo/vector-icons";

interface Props {
    isClose: boolean;
}

export const IconEye = ({ isClose }: Props) => 
    isClose ? <FontAwesome name="eye-slash" size={20} color="black" /> : <FontAwesome name="eye" size={20} color="black" />