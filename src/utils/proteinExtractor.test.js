import protein from './proteinExtractor';


test('Extracts protein correctly #1', () => {
  expect(protein.getProtein('proteiinia 2 g')).toBe(2);
});

test('Extracts protein correctly #2', () => {
  expect(protein.getProtein('proteiinia 13 g')).toBe(13);
});

test('Returns 0 if no match', () => {
  expect(protein.getProtein('nothing here')).toBe(0);
});