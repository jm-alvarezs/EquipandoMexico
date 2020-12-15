import {StyleSheet} from 'react-native';

export const colors = {
  accent: '#276BA5',
  dark: '#2b2b2b',
  blue: 'rgba(39,107,165,1)',
  danger: '#dc3545',
  yellow: '##F2BF5E',
};

export const elements = StyleSheet.create({
  preguntaButton: {
    backgroundColor: 'transparent',
  },
  input: {
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 10,
    padding: 6,
    marginBottom: 12,
    marginTop: 6,
  },
});

export const text = StyleSheet.create({
  h1: {
    fontSize: 32,
  },
  h2: {
    fontSize: 28,
  },
  h3: {
    fontSize: 24,
  },
  h4: {
    fontSize: 18,
  },
  p: {
    fontSize: 14,
  },
});

export const style = StyleSheet.create({
  textWhite: {
    color: '#fff',
  },
  bold: {
    fontWeight: 'bold',
  },
  shadow: {
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 60,
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  padding: {
    padding: 16,
  },
  mx0: {
    marginHorizontal: 0,
  },
  my: {
    marginVertical: 16,
  },
  mt: {
    marginTop: 16,
  },
  mb: {
    marginBottom: 16,
  },
  mainButton: {
    backgroundColor: colors.blue,
    borderRadius: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainButtonInner: {
    backgroundColor: 'transparent',
  },
  buttonPreguntaSelected: {
    backgroundColor: '#F2BF5E',
    borderRadius: 100,
  },
});

export const layout = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 12,
  },
  half: {
    width: '50%',
  },
  third: {
    width: '30%',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  padding: {
    padding: 16,
  },
  my: {
    marginVertical: 8,
  },
});
