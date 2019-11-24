import React from "react";
import { Icon } from "react-native-elements";
import { View, TouchableWithoutFeedback } from "react-native";

const HamburgerMenu = props => {
  return (
  	<View style={{paddingTop: 50, paddingBottom: 50, paddingRight: 50}}> 
	  	<TouchableWithoutFeedback onPress={() => props.navigation.toggleDrawer()} 
	  							  hitSlop={{top: 50, bottom: 50, right: 50}}>
		    <Icon
		      color="#fff"
		      name="menu"
		    />
	    </TouchableWithoutFeedback>
    </View>
  );
};

export default HamburgerMenu;