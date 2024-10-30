export const generateUrl = (
  oldUrl: string,
  params: Record<string, number | string | boolean>,
): string => {
  if (!Object.keys(params).length) {
    return oldUrl;
  }

  return oldUrl
    .split('/')
    .map((part) => {
      if (part[0] === '{' && part.at(-1) === '}') {
        const value = params[part.replace(/[{}]/g, '')];

        if (value) {
          return value;
        }
      }

      return part;
    })
    .join('/');
};
