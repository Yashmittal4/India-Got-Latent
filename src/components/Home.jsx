



'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion';
import { Menu, X, ChevronRight, ChevronLeft, Star, Play, Pause, AlertCircle, Users, Award, Briefcase, DollarSign, Zap, Clock, MapPin, ArrowRight, Mic, Search, Calendar, ThumbsUp, Camera, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';
import a1 from "../assets/images/a1.PNG"
import a2 from "../assets/images/a2.PNG"
import a3 from "../assets/images/a3.PNG"
import a4 from "../assets/images/a12.PNG"
import a5 from "../assets/images/a6.PNG"
import a6 from "../assets/images/a7.PNG"
import a7 from "../assets/images/a9.PNG"
import a8 from "../assets/images/a3.PNG"
import a9 from "../assets/images/a4.PNG"
import v1 from "../assets/images/v1.mp4"
import v2 from "../assets/images/v2.mp4"
import v3 from "../assets/images/v3.mp4"

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    numberOfTickets: 1,
  });
  const [bookingStatus, setBookingStatus] = useState(null);
 
  const eventsPerPage = 3;

  const heroSlides = [
    {
      title: "India's Got Latent",
      subtitle: "Unleash Your Comic Genius",
      image: a1
    },
    {
      title: "Laugh Out Loud",
      subtitle: "With India's Best Comics",
      image: a2
    },
    {
      title: "Rise to Stardom",
      subtitle: "Your Journey Begins Here",
      image: a4
    }
  ];

  const features = [
    { icon: <Star className="w-8 h-8 text-yellow-400" />, text: "Showcase a talent nobody talks about" },
    { icon: <Users className="w-8 h-8 text-blue-400" />, text: "Get a chance to know yourself" },
    { icon: <Award className="w-8 h-8 text-green-400" />, text: "Chance to win a huge amount" },
    { icon: <Briefcase className="w-8 h-8 text-purple-400" />, text: "Collab with brands" },
    { icon: <Zap className="w-8 h-8 text-red-400" />, text: "Collab with Big personalities" },
  ];

  const testimonials = [
    { name: "Rajesh Kumar", text: "This platform changed my life! I went from an unknown to a household name in comedy.", image: a8 },
    { name: "Priya Sharma", text: "The exposure and opportunities here are unmatched. It's a launchpad for aspiring comedians!", image: a8 },
    { name: "Amit Patel", text: "I discovered my true comedic voice through this amazing journey. Highly recommended!", image: a8 },
    { name: "Sneha Reddy", text: "The mentorship and guidance I received here were invaluable. It shaped my career!", image: a8},
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  const navItems = ['Home', 'About', 'Shows', 'Participate', 'Contact'];

  const SectionTitle = ({ children }) => (
    <motion.h2
      className="text-4xl md:text-5xl font-bold mb-12 text-center text-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      
    >
      {children}
    </motion.h2>
  );


  const SpotlightCard = ({ icon, title, description, delay }) => {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref);
  
    useEffect(() => {
      if (isInView) {
        controls.start("visible");
      }
    }, [controls, isInView]);
  
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.6,
              delay: delay,
              ease: [0.22, 1, 0.36, 1]
            }
          }
        }}
        className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
          <motion.div
            className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-yellow-400/20 to-purple-400/20 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {icon}
          </motion.div>
          <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-yellow-400 transition-colors">
            {title}
          </h3>
          <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
            {description}
          </p>
        </div>
      </motion.div>
    );
  };



  const MotionLink = motion(motion.a);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  };

  const AnimatedText = ({ text, className }) => (
    <motion.span className={`inline-block ${className}`} variants={textVariants} initial="hidden" animate="visible">
      {text.split('').map((char, index) => (
        <motion.span key={index} className="inline-block" variants={letterVariants}>
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
  

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const filteredEvents = events.filter(event => 
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (priceFilter === '' || event.price <= parseInt(priceFilter))
  );

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openEventModal = (event) => {
    setSelectedEvent(event);
    setBookingData({
      name: '',
      email: '',
      phoneNumber: '',
      numberOfTickets: 1,
    });
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
    setBookingStatus(null);
  };

  
  const memories = [
    {
      type: 'video',
      src: v1,
      thumbnail: a8,
      title: 'Hilarious Stand-up Moment'
    },
    {
      type: 'image',
      src: a6,
      title: 'Crowd Goes Wild'
    },
    {
      type: 'video',
      src: v2,
      thumbnail: a9,
      title: 'Unexpected Punchline'
    },
    {
      type: 'image',
      src: a7,
      title: 'Judges in Stitches'
    },
    {
      type: 'video',
      src: v3,
      thumbnail: a2,
      title: 'Backstage Nerves'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const [thumbnails, setThumbnails] = useState([]);
  const [touchStart, setTouchStart] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Generate thumbnails for the preview strip
    const thumbs = memories.map((memory, index) => ({
      ...memory,
      isActive: index === activeIndex
    }));
    setThumbnails(thumbs);
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % memories.length);
    setIsPlaying(false);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + memories.length) % memories.length);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;

    const currentTouch = e.touches[0].clientX;
    const diff = touchStart - currentTouch;

    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      setTouchStart(null);
    }
  };

  const handleBooking = async (event) => {
    event.preventDefault();
    setBookingStatus('pending');
    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...bookingData, eventId: selectedEvent._id }),
      });
      const data = await response.json();
      if (response.ok) {
        setBookingStatus('success');
        setTimeout(() => {
          closeEventModal();
          setBookingStatus(null);
          fetchEvents(); // Refresh events to update available tickets
        }, 2000);
      } else {
        setBookingStatus('error');
        console.error('Booking failed:', data.message);
      }
    } catch (error) {
      setBookingStatus('error');
      console.error('Error:', error);
    }
  };

  const calculateTotalCost = () => {
    if (selectedEvent && bookingData.numberOfTickets) {
      return selectedEvent.price * bookingData.numberOfTickets;
    }
    return 0;
  };

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-4 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AnimatedText text={heroSlides[currentSlide].title} />
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </motion.h1>
          <motion.p
            className="text-2xl md:text-3xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <AnimatedText text={heroSlides[currentSlide].subtitle} />
          </motion.p>
          <motion.button
            className="bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:from-yellow-500 hover:via-red-600 hover:to-purple-700 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join the Laughter
          </motion.button>
        </div>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {heroSlides.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? 'bg-yellow-400' : 'bg-gray-400'
              }`}
              onClick={() => setCurrentSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <SectionTitle>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-500">
              About India's Got Latent
            </span>
          </SectionTitle>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <img src={a6} alt="Stand Up Comedy" className="rounded-lg shadow-2xl" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-500">Discover Your Comic Genius</h3>
              <p className="text-lg mb-6 text-gray-300">
                India's Got Latent is not just a platform; it's a launchpad for the next generation of comedy superstars. We believe in the power of laughter to change lives and bring people together.
              </p>
              <motion.ul variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
                {features.map((feature, index) => (
                  <motion.li key={index} variants={itemVariants} className="flex items-center space-x-3">
                    <div className="bg-gray-800 p-2 rounded-full">{feature.icon}</div>
                    <span className="text-gray-200">{feature.text}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Book a Ticket Section */}
     
      <section className="py-20 bg-gradient-to-br from-purple-900 via-red-800 to-yellow-700">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-purple-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Upcoming Events
          </motion.h2>
          
          {/* Search and Filter */}
          <motion.div 
            className="mb-12 flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full bg-purple-900 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 w-64"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400" size={20} />
            </div>
            <div className="relative">
              <input
                type="number"
                placeholder="Max price"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full bg-purple-900 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 w-48"
              />
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400" size={20} />
            </div>
          </motion.div>

          {/* Events List */}
          <div className="grid gap-8 md:grid-cols-3">
            {currentEvents.map((event, index) => (
              <motion.div
                key={event._id}
                className="bg-purple-900 rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img src={`http://localhost:5000${event.image}`} alt={event.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-yellow-300">{event.name}</h3>
                  <p className="text-purple-200 mb-4 line-clamp-2">{event.description}</p>
                  <div className="flex items-center mb-2 text-purple-200">
                    <Calendar className="w-5 h-5 mr-2 text-yellow-400" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center mb-2 text-purple-200">
                    <MapPin className="w-5 h-5 mr-2 text-yellow-400" />
                    <span>{event.place}</span>
                  </div>
                  <div className="flex items-center mb-4 text-purple-200">
                    <DollarSign className="w-5 h-5 mr-2 text-yellow-400" />
                    <span>{event.price}</span>
                  </div>
                  <div className="flex items-center mb-4 text-purple-200">
                    <Ticket className="w-5 h-5 mr-2 text-yellow-400" />
                    <span>{event.availableTickets} tickets available</span>
                  </div>
                  <div className="flex justify-between">
                    <button 
                      onClick={() => openEventModal(event)}
                      className="bg-yellow-400 text-purple-900 font-bold py-2 px-4 rounded-full hover:bg-yellow-300 transition duration-300"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => openEventModal(event)}
                      className="bg-purple-600 text-white font-bold py-2 px-4 rounded-full hover:bg-purple-700 transition duration-300"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            {Array.from({ length: Math.ceil(filteredEvents.length / eventsPerPage) }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`mx-1 px-4 py-2 rounded-full ${
                  currentPage === index + 1 
                    ? 'bg-yellow-400 text-purple-900' 
                    : 'bg-purple-800 text-white hover:bg-purple-700'
                } transition duration-300`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {index + 1}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Event Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={closeEventModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-purple-900 p-6 rounded-lg max-w-2xl w-full mx-auto relative overflow-y-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeEventModal}
                className="absolute top-4 right-4 text-white hover:text-yellow-400"
              >
                <X size={24} />
              </button>
              <img 
                src={`http://localhost:5000${selectedEvent.image}`} 
                alt={selectedEvent.name} 
                className="w-full h-48 object-cover rounded-lg mb-6"
              />
              <h3 className="text-3xl font-bold mb-4 text-yellow-300">{selectedEvent.name}</h3>
              <p className="text-purple-200 mb-4">{selectedEvent.description}</p>
              <p className="text-purple-200 mb-4">Special Guest: {selectedEvent.specialGuest}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-purple-200">
                  <Calendar className="w-5 h-5 mr-2 text-yellow-400" />
                  <span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-purple-200">
                  <MapPin className="w-5 h-5 mr-2 text-yellow-400" />
                  <span>{selectedEvent.place}</span>
                </div>
                <div className="flex items-center text-purple-200">
                  <DollarSign className="w-5 h-5 mr-2 text-yellow-400" />
                  <span>{selectedEvent.price}</span>
                </div>
              </div>
              <form onSubmit={handleBooking} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-purple-200 mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      value={bookingData.name}
                      onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                      required
                      className="w-full px-3 py-2 bg-purple-800 border border-purple-600 rounded-md text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-purple-200 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={bookingData.email}
                      onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                      required
                      className="w-full px-3 py-2 bg-purple-800 border border-purple-600 rounded-md text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-purple-200 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      value={bookingData.phoneNumber}
                      onChange={(e) => setBookingData({ ...bookingData, phoneNumber: e.target.value })}
                      required
                      className="w-full px-3 py-2 bg-purple-800 border border-purple-600 rounded-md text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="tickets" className="block text-sm font-medium text-purple-200 mb-1">Number of Tickets</label>
                    <input
                      type="number"
                      id="tickets"
                      min="1"
                      value={bookingData.numberOfTickets}
                      onChange={(e) => setBookingData({ ...bookingData, numberOfTickets: parseInt(e.target.value) })}
                      required
                      className="w-full px-3 py-2 bg-purple-800 border border-purple-600 rounded-md text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-purple-200">Total Cost: ${calculateTotalCost()}</p>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-yellow-400 text-purple-900 font-bold py-3 px-6 rounded-full hover:bg-yellow-300 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={bookingStatus === 'pending' || selectedEvent.availableTickets === 0}
                >
                  {bookingStatus === 'pending' ? 'Booking...' : (selectedEvent.availableTickets === 0 ? 'Sold Out' : 'Book Now')}
                </button>
              </form>
              {bookingStatus === 'success' && (
                <p className="mt-4 text-green-400 text-center">Booking successful! Closing in 2 seconds...</p>
              )}
              {bookingStatus === 'error' && (
                <p className="mt-4 text-red-400 text-center">Booking failed. Please try again.</p>
              )}
              {selectedEvent.availableTickets === 0 && (
                <p className="mt-4 text-red-500 text-center">This event is sold out.</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Collab with Us Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <SectionTitle>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-500">
              Collaborate with Us
            </span>
          </SectionTitle>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <h3 className="text-3xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-500">Partner with the Best in Comedy</h3>
              <p className="text-lg mb-6 text-gray-300">
                Join forces with India's Got Latent and tap into a world of comedic brilliance. Whether you're a brand looking to reach a laugh-loving audience or a venue seeking top-tier entertainment, we've got you covered.
              </p>
              <Link to="/collabrate">
              <motion.button
                className="bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:from-yellow-500 hover:via-red-600 hover:to-purple-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95}}
              >
                Let's Collaborate
              </motion.button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <img src={a7} alt="Collaboration" className="rounded-lg shadow-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Participate Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <SectionTitle>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-500">
              Participate in the Latent Show
            </span>
          </SectionTitle>
          <motion.div
            className="max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p variants={itemVariants} className="text-xl mb-12 text-center text-gray-300">
              Your journey to stardom begins here! Show the world your unique comedic Latent and become the next big thing in stand-up comedy.
            </motion.p>
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: <Mic className="w-12 h-12 text-yellow-400" />, title: "Auditions", desc: "Showcase your talent" },
                { icon: <Users className="w-12 h-12 text-blue-400" />, title: "Mentorship", desc: "Learn from the best" },
                { icon: <Camera className="w-12 h-12 text-green-400" />, title: "Live Shows", desc: "Perform for audiences" },
                { icon: <ThumbsUp className="w-12 h-12 text-red-400" />, title: "Voting", desc: "Win audience hearts" }
              ].map((step, index) => (
                <motion.div
                  key={step.title}
                  className="bg-white/10 rounded-lg p-6 backdrop-blur-sm text-center"
                  whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(255,255,255)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "linear" }}
                  >
                    {step.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold mt-4 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-300">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={itemVariants} className="text-center mt-12">
              <Link to="/participate">
                <motion.button
                  className="bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:from-yellow-500 hover:via-red-600 hover:to-purple-700 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Apply Now
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Before Spotlight Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <SectionTitle>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-500">
              Before the Spotlight
            </span>
          </SectionTitle>
          <div className="grid md:grid-cols-3 gap-8">
            <SpotlightCard
              icon={<Mic className="w-6 h-6 text-yellow-400" />}
              title="Rehearse"
              description="Perfect your timing and delivery with dedicated practice sessions"
              delay={0.2}
            />
            <SpotlightCard
              icon={<Users className="w-6 h-6 text-purple-400" />}
              title="Network"
              description="Connect with fellow comedians and industry professionals"
              delay={0.4}
            />
            <SpotlightCard
              icon={<Calendar className="w-6 h-6 text-pink-400" />}
              title="Plan"
              description="Organize your material and set achievable performance goals"
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* memories */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-red-800 to-yellow-700">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-purple-400"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Unforgettable Moments
          </motion.h2>

          <div
            ref={containerRef}
            className="relative max-w-6xl mx-auto"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            {/* Main Display */}
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  {memories[activeIndex].type === 'image' ? (
                    <img
                      src={memories[activeIndex].src}
                      alt={memories[activeIndex].title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      ref={videoRef}
                      src={memories[activeIndex].src}
                      poster={memories[activeIndex].thumbnail}
                      className="w-full h-full object-cover"
                      onEnded={() => setIsPlaying(false)}
                      playsInline
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Controls Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                  <motion.h3
                    className="text-2xl md:text-3xl font-bold mb-4 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {memories[activeIndex].title}
                  </motion.h3>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handlePrev}
                        className="bg-yellow-400 text-purple-900 rounded-full p-3 hover:bg-yellow-300 transition-colors"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleNext}
                        className="bg-yellow-400 text-purple-900 rounded-full p-3 hover:bg-yellow-300 transition-colors"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </motion.button>
                    </div>

                    {memories[activeIndex].type === 'video' && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={togglePlay}
                        className="bg-yellow-400 text-purple-900 rounded-full p-3 hover:bg-yellow-300 transition-colors"
                      >
                        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnails Strip */}
            <div className="mt-6 overflow-hidden">
              <div className="flex justify-center gap-4 overflow-x-auto py-2 px-4 scrollbar-hide">
                {thumbnails.map((memory, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`relative flex-shrink-0 rounded-lg overflow-hidden transition-transform ${
                      index === activeIndex ? 'ring-4 ring-yellow-400' : ''
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-24 h-12 md:w-32 md:h-16">
                      <img
                        src={memory.type === 'video' ? memory.thumbnail : memory.src}
                        alt={memory.title}
                        className="w-full h-full object-cover"
                      />
                      {memory.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Overcoming Stage Fright Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <SectionTitle>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-500">
              Overcoming Stage Fright
            </span>
          </SectionTitle>
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid md:grid-cols-2 gap-8">
              {[
                "Master your material through consistent practice",
                "Use breathing techniques to stay calm",
                "Start with smaller audiences",
                "Transform nervousness into excitement",
                "Visualize successful performances",
                "Connect with your audience"
              ].map((tip, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400/20 to-purple-400/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-400 font-semibold">{index + 1}</span>
                    </div>
                    <p className="text-gray-300">{tip}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <SectionTitle>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-500">
              What Our Stars Say
            </span>
          </SectionTitle>
          <motion.div
            className="relative overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="flex space-x-6"
              drag="x"
              dragConstraints={{ left: -1000, right: 0 }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="min-w-[300px] md:min-w-[400px] bg-gray-800 rounded-lg shadow-xl p-6 flex flex-col justify-between"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div>
                    <img src={testimonial.image} alt={testimonial.name} className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-yellow-400" />
                    <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                  </div>
                  <h4 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-500">{testimonial.name}</h4>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <div className="text-center mt-8">
            <p className="text-gray-400">Swipe to see more testimonials</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

