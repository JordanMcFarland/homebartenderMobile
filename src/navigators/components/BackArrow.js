import React from "react";
import { Pressable } from "react-native";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import g from "../../styles/styles";

const BackArrow = ({ navigation }) => {
  return (
    <Pressable onPress={() => navigation.pop()}>
      <FontAwesomeIcon icon={faArrowLeft} size={24} style={g.primary} />
    </Pressable>
  );
};

export default BackArrow;
