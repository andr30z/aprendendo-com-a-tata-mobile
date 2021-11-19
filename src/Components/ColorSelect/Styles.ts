import { StyleSheet } from "react-native";
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
interface TouchableColorInterface {
    height: number;
    width: number;
    backgroundColor: string
}

export const TouchableHeader = styled(TouchableHighlight)`
    width: 100%;
    height: 30px;
    box-shadow: 10px 5px 5px black;
    elevation:9;
`;

export const TouchableColor = styled(TouchableOpacity) <TouchableColorInterface>`
    elevation: 9;
    margin:15px 5px;
    box-shadow: 10px 5px 5px black;
    height: ${({ height }) => height + "px"};
    width: ${({ width }) => width + "px"};
    borderRadius:${({ width }) => width / 2 + "px"}
    background-color: ${({ backgroundColor }) => backgroundColor}
`;

export const ColorIcon = styled(Feather)`
    padding: 5px;
`;

export const ColorIconContainer = styled(TouchableOpacity)`
    box-shadow: 10px 5px 5px black;
    elevation: 9;
`;

export const styles = StyleSheet.create({
    motiView: {
        width: "100%",
        overflow: 'hidden',
        height: 30,
    }
});


