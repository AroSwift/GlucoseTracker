import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // -- Application wide --
  breakAfter: {
    marginBottom: 20,
  },

  breakAfterDropdown: {
    marginBottom: 14,
  },

  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'flex-start',
  },

  circularButton: {
    flex: 1,
    backgroundColor: 'rgb(98, 33, 234)',
    position: 'absolute',
    bottom:20,
    right:20,
    padding: 5,
    height: 65,
    width: 65,  //The Width must be the same as the height
    borderRadius: 130, //Then Make the Border Radius twice the size of width or Height
  },

  // Main error message
  mainError: {
    color: 'darkred',
    textAlign: 'center',
    paddingBottom: 15,
  },

  // -- Header specific --
  ApplicationHeader: {
    position: 'relative',
    top: 0,
  },

  // -- Login specific --
  loginContainer: {
    padding: 20,
    position: 'absolute',
    top: '25%',
    left: 0,
    right: 0,
    backgroundColor: 'rgba(52, 52, 52, 0)' // Make transparent
  },

  // -- General Format --
  contentContainer: {
    padding: 20,
    position: 'absolute',
    top: '0%',
    left: 0,
    right: 0,
    backgroundColor: 'rgba(52, 52, 52, 0)' // Make transparent
  },

  loginHeader: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },

  //Page headers
  generalHeader: {
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },

  // -- Signup specific --
  signupContainer: {
    padding: 20,
    position: 'absolute',
    top: '32%',
    left: 0,
    right: 0,
    backgroundColor: 'rgba(52, 52, 52, 0)' // Make transparent
  },

  signupHeader: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },

})

export { styles };
