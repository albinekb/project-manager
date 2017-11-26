export default ({ children, variant, ...props }) => (
  <div>
    <button {...props} className={variant}>
      {children}
    </button>
    <style jsx>{`
      button {
        color: white;
        -webkit-appearnce: none;
        border: none;
        background: black;
        cursor: pointer;
      }
      button.light {
        background: white;
        color: black;
      }
      button.green {
        background: linear-gradient(#70f570, #49c628);
        color: white;
      }
      button:hover {
        opacity: 0.6;
      }
      button:active {
        opacity: 1;
      }
    `}</style>
  </div>
)
