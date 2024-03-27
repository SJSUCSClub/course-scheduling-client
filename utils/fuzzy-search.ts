const getLevenshteinDistance = (a: string, b: string): number => {
  const matrix: number[][] = [];

  // Initialize the matrix
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Compute the distance
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1,
          ),
        ); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
};

const fuzzySearch = (
  input: string,
  list: string[],
  threshold: number = 1,
): string[] => {
  const results: string[] = [];

  list.forEach((word) => {
    const distance = getLevenshteinDistance(input, word);
    if (distance <= threshold) results.push(word);
  });

  return results;
};

export default fuzzySearch;
