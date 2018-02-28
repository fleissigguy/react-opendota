export default function loggerMiddleware(store) {
  return next => action => {
    return next(action);
  };
}
