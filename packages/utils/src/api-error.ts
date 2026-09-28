export function getErrorMessage(status: number) {
  if (status === 409 || status === 400) {
    return 'This email is already taken';
  }
  if (status === 401) {
    return 'Invalid email or password';
  }
  if (status === 403) {
    return 'Forbidden';
  }

  return 'Something went wrong';
}
