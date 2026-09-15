import React from 'react';
import Feather from 'react-native-vector-icons/Feather';

interface Props {
  name: string;
  color: string;
  size: number;
}

// Thin-line Feather icons read closest to Apple's minimal, single-accent
// aesthetic among the icon sets bundled with react-native-vector-icons.
const TabIcon: React.FC<Props> = ({ name, color, size }) => (
  <Feather name={name} size={size} color={color} />
);

export default TabIcon;
