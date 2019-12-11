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
	  height: 40,
    width: 130,
    margin: 8,
	},
  widebutton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3a5335',
    height: 36,
    width: 225,
    margin: 8,
  },
  centered: {
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center'
  },
	container: {
	  alignItems: 'center',
	  backgroundColor: '#87a08b',
    height: '100%',
    paddingTop: '5%'
	},
  hamburger: {
    position: 'absolute',
    left: -20,
    top: -20
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
    fontSize: 20,
    color: '#FFFF',
    fontFamily: "LIONELLOLight"
  },
  regimen: {
    borderColor: '#3a5335',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderRadius: 8,
    margin: 10,
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
  paddingTop: {
    paddingTop: 50
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
  },
  circularView: {
    height: 40,
    width: 40,
    borderRadius: 40/2,
    backgroundColor: '#3a5335',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5
  }
});