export function Button({ children, className, ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-md font-medium focus:ring focus:ring-blue-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
