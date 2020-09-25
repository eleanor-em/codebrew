import renderer from 'react-test-renderer';

import { MonoText } from '../StyledText';

// TODO: Tests...
it(`renders correctly`, () => {
  const tree = renderer.create(<MonoText>Snapshot test!</MonoText>).toJSON();

  expect(tree).toMatchSnapshot();
});
