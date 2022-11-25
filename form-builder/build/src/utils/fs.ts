export const excludeFiles = (files: string[]) => {
  const excludes = ['node_modules', 'dist']
  return files.filter(
    (path) => !excludes.some((exclude) => path.includes(exclude))
  )
}
