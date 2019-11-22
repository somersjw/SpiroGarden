import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  button: {
	  alignItems: 'center',
	  justifyContent: 'center',
	  backgroundColor: '#229637',
    width: 150,
    margin: 10,
    fontFamily: "LIONELLORegular"
	},
  centered: {
    alignItems: 'center',
  },
	container: {
    paddingTop: 5,
	  alignItems: 'center',
	  backgroundColor: '#8fc99c',
    height: '100%',
	},
  hamburger: {
    position: 'absolute',
    left: 20,
    top: 80
  },
	homescreen: {
		alignItems: 'center',
	  backgroundColor: '#e1ffd4',
	  height: '100%'
	},
  titlelarge: {
  	fontSize: 65,
    marginTop: 50,
    marginBottom: 10,
    color: '#FFFF',
    fontFamily: "LIONELLORegular",
    textAlign: "center"
  },
  titlemedium: {
  	fontSize: 35,
    color: '#FFFF',
    fontFamily: "LIONELLORegular"
  },
  heading1: {
  	fontSize: 15,
  	fontWeight: 'bold',
  	color: '#FFFF'
  },
  heading2: {
  	fontSize: 20,
  	fontWeight: 'bold',
  	color: '#FFFF'
  },
  regimen: {
    borderColor: '#229637',
    borderWidth: 3,
    margin: 15,
    height: 40
  },
  subheading: {
  	fontSize: 25,
  	margin: 5,
    color: '#FFFF',
    fontFamily: "LIONELLOLight"
  },
  plant: {
    position: 'absolute',
    left: 200,
    top: 400
  },
  activeTab: {
		backgroundColor: '#8BD398',
  },
  tab: {
		borderColor: '#229637',
		borderWidth: 3
  },
  tabText: {
		color: '#619f74'
  }
});