import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import Checkout from '../../src/native/Checkout';

storiesOf('Checkout', module)
  .add(
    'Checkout', () => (
      <Checkout />
    )
  );
