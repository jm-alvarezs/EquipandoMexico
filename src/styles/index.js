import {StyleSheet} from 'react-native';

export const colors = {
  accent: '#276BA5',
  dark: '#2b2b2b',
};

export const elements = StyleSheet.create({
  preguntaButton: {
    backgroundColor: 'transparent',
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

export const layout = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 12,
  },
  half: {
    width: '50%',
  },
  padding: {
    padding: 16,
  },
  my: {
    marginVertical: 8,
  },
});
