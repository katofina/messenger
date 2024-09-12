import { FontAwesome } from "@expo/vector-icons";

interface Props {
    isClose: boolean;
    color: string;
}

export const IconEye = ({ isClose, color }: Props) => 
    isClose ? <FontAwesome name="eye-slash" size={20} color={color} /> : <FontAwesome name="eye" size={20} color={color} />