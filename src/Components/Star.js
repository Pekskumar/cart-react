// components/Star.js
function Star({ filled }) {
  return (
    <svg
      className={`star ${filled ? "filled" : ""}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width="24px"
      height="24px"
    >
      <path d="M12 .587l3.668 7.425 8.332 1.209-6.041 5.888 1.426 8.309L12 18.896l-7.385 3.882 1.426-8.309-6.041-5.888 8.332-1.209L12 .587z" />
    </svg>
  );
}

export default Star;
