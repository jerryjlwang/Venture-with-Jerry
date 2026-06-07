type FooterProps = {
  transparent?: boolean;
  terminal?: boolean;
};

const Footer = ({
  transparent = false,
  terminal = false,
}: FooterProps) => {
  return (
    <footer
      className={`relative z-10 py-8 ${
        terminal ? "text-terminal-text" : "text-white"
      } ${
        transparent ? "bg-transparent" : "mt-16 bg-slate-900"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className={terminal ? "text-terminal-faint" : "text-gray-400"}>
            © {new Date().getFullYear()} Jerry Wang. All rights reserved.
          </p>
          <p
            className={`mt-2 text-sm ${
              terminal ? "text-terminal-muted" : "text-gray-500"
            }`}
          >
            Built with love and code
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
