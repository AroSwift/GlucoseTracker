import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // -- Application wide --
  breakAfter: {
    marginBottom: 20,
  },

  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'flex-start',
  },

  // Main error message
  mainError: {
    color: 'darkred',
    textAlign: 'center',
    paddingBottom: 15,
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

  loginHeader: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 22,
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
