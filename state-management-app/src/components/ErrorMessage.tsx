
type ErrorMessageProps = {
  message: string;
};

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="error-message" role="alert">
      <p>Error: {message}</p>
    </div>
  );
}

export default ErrorMessage;
