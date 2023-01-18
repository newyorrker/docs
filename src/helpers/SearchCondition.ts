export function prepareSearchCondition(fieldName: string, search: string) {
  let pieces = search
      .toLowerCase()
      .trim()
      .split(' '),
    conditions: any = [],
    result = {};

  pieces.forEach(item => {
    conditions.push({
      [fieldName]: {
        $regex: '(?i).*' + item + '.*',
      },
    });
  });

  if (conditions && conditions.length) {
    result = {
      where: {
        $or: conditions,
      },
    };
  }

  return result;
}
