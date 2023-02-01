const profileColors: string[] = [
  '#F44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  '#FFC107',
  '#FF9800',
  '#FF5722',
  '#03A9F4',
];

/**
 * User profile icon color
 * @param id
 */
export function getProfileColor(id: string) {
  if (id) {
    const d = id[id.length - 1];

    return profileColors[parseInt(d, 16)];
  }
  return profileColors[0];
}
