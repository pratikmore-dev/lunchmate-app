function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6">
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <p>© 2025 LunchMate. All rights reserved.</p>
        <div className="flex gap-6 mt-2 md:mt-0">
          <a href="#" className="hover:text-indigo-600 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-indigo-600 transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-indigo-600 transition-colors">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;