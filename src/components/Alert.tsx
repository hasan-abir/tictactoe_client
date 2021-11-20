interface PropTypes {
  msg: string;
  error: boolean;
}

function Alert({ msg, error }: PropTypes) {
  return <p className={`alert ${error ? "alert-error" : ""}`}>{msg}</p>;
}

export default Alert;
