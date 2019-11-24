import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  buttoncontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
	  alignItems: 'center',
	  justifyContent: 'center',
	  backgroundColor: '#3a5335',
	  height: 36,
    width: 125,
    margin: 8,
	},
  centered: {
    alignItems: 'center',
    alignSelf: 'center'
  },
	container: {
	  alignItems: 'center',
	  backgroundColor: '#87a08b',
    height: '120%',
	},
  hamburger: {
    position: 'absolute',
    left: 20,
    top: 80
  },
  titlelarge: {
  	fontSize: 55,
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
    color: '#FFFF',
    fontFamily: "LIONELLOLight"
  },
  heading2: {
  	fontSize: 20,
    color: '#FFFF',
    fontFamily: "LIONELLOLight",
    padding: 5
  },
  heading3: {
  	fontSize: 30,
    color: '#FFFF',
    fontFamily: "LIONELLOLight"
  },
  nextPlantTitle: {
    alignSelf: 'flex-end',
    paddingRight: 20,
    fontSize: 20,
    color: '#FFFF',
    fontFamily: "LIONELLOLight"
  },
  regimen: {
    borderColor: '#3a5335',
    backgroundColor: '#fff',
    borderWidth: 4,
    margin: 15,
    height: 40,
    fontSize: 15,
    color: '#3a5335'
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
		backgroundColor: '#3a5335',
  },
  tab: {
		borderColor: '#3a5335',
		borderWidth: 3
  },
  tabText: {
		color: '#3a5335'
  }
});