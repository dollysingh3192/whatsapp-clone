export const headers = () => {
  return Object.assign({
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }) as unknown as any
}
