import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
export default function Footer() {
    return (
      <footer className="w-full bg-gray-900 text-gray-300 mt-16 py-6 px-4 text-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <span className="text-white font-semibold">ImmovableRental</span> &copy; {new Date().getFullYear()}
          </div>

          <div className="flex gap-4">
            <a href="https://github.com/Elijah-ug/decentralised-rentals-system" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaGithub />

            </a>
            <a href="https://x.com/ElicomElijah" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaXTwitter />
            </a>
          </div>

          <div>
            <span className="text-xs">Built on Base Sepolia | CodeQuity@2025</span>
          </div>
        </div>
      </footer>
    );
  }
