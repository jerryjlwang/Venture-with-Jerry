
const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Jerry Wang. All rights reserved.
          </p>
          <p className="text-gray-500 mt-2 text-sm">
            Built with love and code
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
