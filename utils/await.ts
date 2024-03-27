const Await = async <T>({
  promise,
  children,
}: {
  promise: Promise<T>;
  children: (value: T) => JSX.Element;
}) => {
  let data = await promise;

  return children(data);
};

export default Await;
