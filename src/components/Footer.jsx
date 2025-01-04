'use client'

import React from 'react';
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion';
import { Menu, X, ChevronRight, ChevronLeft, Star, Users, Award, Briefcase, Zap, Clock, MapPin, ArrowRight, Mic, Calendar, ThumbsUp, Camera } from 'lucide-react';

function Footer() {
  return (
    <>
    <footer className="bg-black py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-500">India's Got Talent</h3>
              <p className="mb-4 text-gray-400">Discover, laugh, and rise to stardom with India's premier comedy platform.</p>
              <div className="flex space-x-4">
                {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map((social) => (
                  <a key={social} href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
                    <span className="sr-only">{social}</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-500">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'About', 'Shows', 'Participate', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-yellow-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-500">Contact Us</h4>
              <p className="text-gray-400 mb-2">123 Laughter Lane, Mumbai, India</p>
              <p className="text-gray-400 mb-2">Phone: +91 123-456-7890</p>
              <p className="text-gray-400">Email: info@indiagottalent.com</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-500">Newsletter</h4>
              <p className="text-gray-400 mb-4">Stay updated with our latest shows and rising stars!</p>
              <form className="flex flex-col sm:flex-row">
                <input type="email" placeholder="Your email" className="bg-gray-800 text-white px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2 sm:mb-0" />
                <motion.button
                  type="submit"
                  className="bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 text-white px-4 py-2 rounded-r-full hover:from-yellow-500 hover:via-red-600 hover:to-purple-700 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </form>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} India's Got Talent. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
    </>
  )
}

export default Footer
