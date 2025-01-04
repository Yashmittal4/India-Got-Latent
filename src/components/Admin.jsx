

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { Search, Filter, User, DollarSign, Calendar, ChevronDown, ChevronUp, X, Edit, Trash2, Eye, Plus, Ticket } from 'lucide-react';
import axios from 'axios'

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Admin = () => {
  const [activeTab, setActiveTab] = useState('participants');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('all');
  const [showAcceptedOnly, setShowAcceptedOnly] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [newEvent, setNewEvent] = useState({
    id: '',
    name: '',
    date: '',
    place: '',
    specialGuest: '',
    description: '',
    price: '',
    image: null,
    totalTickets: '',
  });

  useEffect(() => {
    fetchData()
  }, [activeTab])

  const fetchData = async () => {
    try {
      let response
      if (activeTab === 'participants') {
        response = await axios.get('http://localhost:5000/api/participants')
        setParticipants(response.data)
      } else if (activeTab === 'collaborators') {
        response = await axios.get('http://localhost:5000/api/collaborators')
        setCollaborators(response.data)
      } else if (activeTab === 'events') {
        response = await axios.get('http://localhost:5000/api/events')
        setEvents(response.data)
      } else if (activeTab === 'bookings') {
        response = await axios.get('http://localhost:5000/api/bookings')
        setBookings(response.data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilter = (option) => {
    setFilterOption(option);
  };

  const toggleAcceptedOnly = () => {
    setShowAcceptedOnly(!showAcceptedOnly);
  };

  const filteredData = () => {
    let data = activeTab === 'participants' ? participants :
               activeTab === 'collaborators' ? collaborators :
               activeTab === 'events' ? events : bookings;

    return data.filter(item => {
      const searchMatch = Object.values(item).some(val => 
        typeof val === 'string' && val.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const filterMatch = filterOption === 'all' || 
        (activeTab === 'participants' && item.talentCategory === filterOption) ||
        (activeTab === 'collaborators' && item.role === filterOption) ||
        (activeTab === 'events' && true) ||
        (activeTab === 'bookings' && (filterOption === 'all' || item.eventId.name === filterOption));
      const acceptedMatch = !showAcceptedOnly || item.status === 'accepted';
      return searchMatch && filterMatch && acceptedMatch;
    });
  };

  const handleAccept = async (item) => {
    try {
      if (activeTab === 'participants') {
        await axios.put(`http://localhost:5000/api/participants/${item._id}`, { ...item, status: 'accepted' })
      } else if (activeTab === 'collaborators') {
        await axios.put(`http://localhost:5000/api/collaborators/${item._id}`, { ...item, status: 'accepted' })
      }
      fetchData()
    } catch (error) {
      console.error('Error accepting item:', error)
    }
  }

  const handleReject = async (item) => {
    try {
      if (activeTab === 'participants') {
        await axios.put(`http://localhost:5000/api/participants/${item._id}`, { ...item, status: 'rejected' })
      } else if (activeTab === 'collaborators') {
        await axios.put(`http://localhost:5000/api/collaborators/${item._id}`, { ...item, status: 'rejected' })
      }
      fetchData()
    } catch (error) {
      console.error('Error rejecting item:', error)
    }
  }

  const handleDelete = async (item) => {
    try {
      if (activeTab === 'participants') {
        await axios.delete(`http://localhost:5000/api/participants/${item._id}`)
      } else if (activeTab === 'collaborators') {
        await axios.delete(`http://localhost:5000/api/collaborators/${item._id}`)
      } else if (activeTab === 'events') {
        await axios.delete(`http://localhost:5000/api/events/${item._id}`)
      } else if (activeTab === 'bookings') {
        await axios.delete(`http://localhost:5000/api/bookings/${item._id}`)
      }
      fetchData()
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  const handleView = (item) => {
    setModalContent(item);
    setShowModal(true);
  };

  const handleAddOrUpdateEvent = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    for (const key in newEvent) {
      formData.append(key, newEvent[key])
    }

    try {
      if (editingEvent) {
        await axios.put(`http://localhost:5000/api/events/${editingEvent._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      } else {
        await axios.post('http://localhost:5000/api/events', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      }
      setShowEventForm(false)
      setEditingEvent(null)
      setNewEvent({
        id: '',
        name: '',
        date: '',
        place: '',
        specialGuest: '',
        description: '',
        price: '',
        image: null,
        totalTickets: ''
      })
      fetchData()
    } catch (error) {
      console.error('Error adding/updating event:', error)
    }
  }

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setNewEvent({
      id: event.id,
      name: event.name,
      date: event.date,
      place: event.place,
      specialGuest: event.specialGuest,
      description: event.description,
      price: event.price,
      image: event.image,
      totalTickets: event.totalTickets
    });
    setShowEventForm(true);
  };

  const renderCharts = () => {
    const chartOptions = {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Data Visualization' },
      },
    };

    let chart1, chart2;

    if (activeTab === 'participants') {
      const talentCategories = ['standup', 'improv', 'sketch', 'musical', 'other'];
      const talentData = talentCategories.map(category => 
        participants.filter(p => p.talentCategory === category).length
      );

      chart1 = (
        <Pie
          data={{
            labels: talentCategories,
            datasets: [{
              data: talentData,
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
              ],
            }],
          }}
          options={{
            ...chartOptions,
            plugins: {
              ...chartOptions.plugins,
              title: { ...chartOptions.plugins.title, text: 'Participants by Talent Category' },
            },
          }}
        />
      );

      const personalityScores = participants.map(p => p.personalityScore).sort((a, b) => a - b);
      const labels = personalityScores.map((_, index) => index + 1);

      chart2 = (
        <Bar
          data={{
            labels: labels,
            datasets: [{
              label: 'Personality Score',
              data: personalityScores,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            }],
          }}
          options={{
            ...chartOptions,
            plugins: {
              ...chartOptions.plugins,
              title: { ...chartOptions.plugins.title, text: 'Participant Personality Scores' },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Personality Score'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Participant Number'
                }
              }
            }
          }}
        />
      );
    } else if (activeTab === 'collaborators') {
      const roles = ['sponsor', 'judge'];
      const roleData = roles.map(role => collaborators.filter(c => c.role === role).length);

      chart1 = (
        <Pie
          data={{
            labels: roles,
            datasets: [{
              data: roleData,
              backgroundColor: [
                'rgba(255, 159, 64, 0.6)',
                'rgba(75, 192, 192, 0.6)',
              ],
            }],
          }}
          options={{
            ...chartOptions,
            plugins: {
              ...chartOptions.plugins,
              title: { ...chartOptions.plugins.title, text: 'Collaborators by Role' },
            },
          }}
        />
      );

      const sponsors = collaborators.filter(c => c.role === 'sponsor');
      chart2 = (
        <Bar
          data={{
            labels: sponsors.map(s => s.name),
            datasets: [{
              label: 'Sponsorship Amount ($)',
              data: sponsors.map(s => parseFloat(s.priceOffering.replace('$', ''))),
              backgroundColor: 'rgba(255, 159, 64, 0.6)',
            }],
          }}
          options={{
            ...chartOptions,
            plugins: {
              ...chartOptions.plugins,
              title: { ...chartOptions.plugins.title, text: 'Sponsorship Amounts' },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      );
    } else if (activeTab === 'events') {
      chart1 = (
        <Bar
          data={{
            labels: events.map(e => e.name),
            datasets: [{
              label: 'Event Price ($)',
              data: events.map(e => parseFloat(e.price)),
              backgroundColor: 'rgba(255, 206, 86, 0.6)',
            }],
          }}
          options={{
            ...chartOptions,
            plugins: {
              ...chartOptions.plugins,
              title: { ...chartOptions.plugins.title, text: 'Individual Event Prices' },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Price ($)'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Event Name'
                }
              }
            },
          }}
        />
      );

      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const eventsByMonth = months.map((_, index) => 
        events.filter(e => new Date(e.date).getMonth() === index).length
      );

      chart2 = (
        <Bar
          data={{
            labels: months,
            datasets: [{
              label: 'Number of Events',
              data: eventsByMonth,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            }],
          }}
          options={{
            ...chartOptions,
            plugins: {
              ...chartOptions.plugins,
              title: { ...chartOptions.plugins.title, text: 'Events Distribution by Month' },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1,
                },
              },
            },
          }}
        />
      );
    } else if (activeTab === 'bookings') {
      const bookingsByEvent = events.map(event => ({
        eventName: event.name,
        bookingsCount: bookings.filter(booking => booking.eventId._id === event._id).length
      }));

      chart1 = (
        <Bar
          data={{
            labels: bookingsByEvent.map(b => b.eventName),
            datasets: [{
              label: 'Number of Bookings',
              data: bookingsByEvent.map(b => b.bookingsCount),
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
            }],
          }}
          options={{
            ...chartOptions,
            plugins: {
              ...chartOptions.plugins,
              title: { ...chartOptions.plugins.title, text: 'Bookings by Event' },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Number of Bookings'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Event Name'
                }
              }
            },
          }}
        />
      );

      const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
      const averageBookingValue = totalRevenue / bookings.length;

      chart2 = (
        <Pie
          data={{
            labels: ['Total Revenue', 'Average Booking Value'],
            datasets: [{
              data: [totalRevenue, averageBookingValue],
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
              ],
            }],
          }}
          options={{
            ...chartOptions,
            plugins: {
              ...chartOptions.plugins,
              title: { ...chartOptions.plugins.title, text: 'Booking Revenue Overview' },
            },
          }}
        />
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="bg-white p-4 rounded-lg shadow">{chart1}</div>
        <div className="bg-white p-4 rounded-lg shadow">{chart2}</div>
      </div>
    );
  };

  const renderModalContent = (item) => {
    if (activeTab === 'bookings') {
      return (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">Event Details:</h4>
            <p>Name: {item.eventId.name}</p>
            <p>Date: {new Date(item.eventId.date).toLocaleDateString()}</p>
            <p>Place: {item.eventId.place}</p>
          </div>
          <div>
            <h4 className="font-semibold">Booking Details:</h4>
            <p>Name: {item.name}</p>
            <p>Email: {item.email}</p>
            <p>Phone: {item.phoneNumber}</p>
            <p>Number of Tickets: {item.numberOfTickets}</p>
            <p>Total Price: ${item.totalPrice}</p>
            <p>Status: {item.status}</p>
          </div>
        </div>
      );
    }

    return Object.entries(item).map(([key, value]) => {
      if (key === 'photo' || key === 'image') {
        return (
          <div key={key} className="mb-4">
            <span className="font-semibold">{key}: </span>
            <img 
              src={`http://localhost:5000${value}`} 
              alt={key} 
              className="mt-2 max-w-full h-auto rounded-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder.svg?height=200&width=200';
              }}
            />
          </div>
        );
      } else if (typeof value === 'object' && value !== null) {
        return (
          <div key={key} className="mb-2">
            <span className="font-semibold">{key}: </span>
            <pre className="whitespace-pre-wrap">{JSON.stringify(value, null, 2)}</pre>
          </div>
        );
      } else {
        return (
          <p key={key} className="mb-2">
            <span className="font-semibold">{key}: </span>
            {value}
          </p>
        );
      }
    });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
          <nav className="space-y-2">
            <button
              className={`w-full text-left py-2 px-4 rounded transition-colors ${activeTab === 'participants' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              onClick={() => setActiveTab('participants')}
            >
              <User className="inline-block mr-2" />
              Participants
            </button>
            <button
              className={`w-full text-left py-2 px-4 rounded transition-colors ${activeTab === 'collaborators' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              onClick={() => setActiveTab('collaborators')}
            >
              <DollarSign className="inline-block mr-2" />
              Collaborators
            </button>
            <button
              className={`w-full text-left py-2 px-4 rounded transition-colors ${activeTab === 'events' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              onClick={() => setActiveTab('events')}
            >
              <Calendar className="inline-block mr-2" />
              Events
            </button>
            <button
              className={`w-full text-left py-2 px-4 rounded transition-colors ${activeTab === 'bookings' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              onClick={() => setActiveTab('bookings')}
            >
              <Ticket className="inline-block mr-2" />
              Bookings
            </button>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-6">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h2>

        {/* Search, filter, and accepted only checkbox */}
        <div className="flex flex-col md:flex-row mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          <div className="relative">
            <select
              value={filterOption}
              onChange={(e) => handleFilter(e.target.value)}
              className="appearance-none w-full bg-white border border-gray-300 rounded-lg py-2 px-4 pr-8 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              {activeTab === 'participants' && (
                <>
                  <option value="standup">Stand-up</option>
                  <option value="improv">Improv</option>
                  <option value="sketch">Sketch</option>
                  <option value="musical">Musical</option>
                  <option value="other">Other</option>
                </>
              )}
              {activeTab === 'collaborators' && (
                <>
                  <option value="sponsor">Sponsors</option>
                  <option value="judge">Judges</option>
                </>
              )}
              {activeTab === 'bookings' && events.map(event => (
                <option key={event._id} value={event.name}>{event.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
          {(activeTab === 'participants' || activeTab === 'collaborators') && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="acceptedOnly"
                checked={showAcceptedOnly}
                onChange={toggleAcceptedOnly}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="acceptedOnly" className="ml-2 block text-sm text-gray-900">
                Show Accepted Only
              </label>
            </div>
          )}
        </div>

        {/* Data table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {activeTab === 'participants' ? 'Talent' :
                   activeTab === 'collaborators' ? 'Role' :
                   activeTab === 'events' ? 'Date' :
                   'Event'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {activeTab === 'participants' ? 'Personality Score' :
                   activeTab === 'collaborators' ? 'Price Offering' :
                   activeTab === 'events' ? 'Available Tickets' :
                   'Number of Tickets'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData().map((item) => (
                <tr key={item._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {activeTab === 'participants' ? `${item.firstName} ${item.lastName}` :
                       activeTab === 'collaborators' ? item.name :
                       activeTab === 'events' ? item.name :
                       item.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {activeTab === 'participants' ? item.talentCategory :
                       activeTab === 'collaborators' ? item.role :
                       activeTab === 'events' ? new Date(item.date).toLocaleDateString() :
                       item.eventId.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {activeTab === 'participants' ? item.personalityScore :
                       activeTab === 'collaborators' ? item.priceOffering :
                       activeTab === 'events' ? `${item.availableTickets} / ${item.totalTickets}` :
                       item.numberOfTickets}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      item.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status || 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleView(item)}
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                    >
                      <Eye className="inline-block h-5 w-5" />
                    </button>
                    {activeTab !== 'events' && activeTab !== 'bookings' && item.status !== 'accepted' && (
                      <button
                        onClick={() => handleAccept(item)}
                        className="text-green-600 hover:text-green-900 mr-2"
                      >
                        Accept
                      </button>
                    )}
                    {activeTab !== 'events' && activeTab !== 'bookings' && item.status !== 'rejected' && (
                      <button
                        onClick={() => handleReject(item)}
                        className="text-red-600 hover:text-red-900 mr-2"
                      >
                        Reject
                      </button>
                    )}
                    {activeTab === 'events' && (
                      <button
                        onClick={() => handleEditEvent(item)}
                        className="text-yellow-600 hover:text-yellow-900 mr-2"
                      >
                        <Edit className="inline-block h-5 w-5" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(item)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="inline-block h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Charts */}
        {renderCharts()}

        {/* Add Event Button (only for Events tab) */}
        {activeTab === 'events' && (
          <button
            onClick={() => {
              setEditingEvent(null);
              setNewEvent({
                id: '',
                name: '',
                date: '',
                place: '',
                specialGuest: '',
                description: '',
                price: '',
                image: null,
                totalTickets: ''
              });
              setShowEventForm(true);
            }}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
          >
            <Plus className="mr-2" /> Add Event
          </button>
        )}

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-white rounded-lg p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto"
              >
                <h3 className="text-2xl font-bold mb-4">
                  {activeTab === 'participants' ? 'Participant Details' :
                   activeTab === 'collaborators' ? 'Collaborator Details' :
                   activeTab === 'events' ? 'Event Details' :
                   'Booking Details'}
                </h3>
                {modalContent && renderModalContent(modalContent)}
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add/Edit Event Form */}
        <AnimatePresence>
          {showEventForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-white rounded-lg p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto"
              >
                <h3 className="text-2xl font-bold mb-4">{editingEvent ? 'Edit Event' : 'Add New Event'}</h3>
                <form onSubmit={handleAddOrUpdateEvent} className="space-y-4">
                  <div>
                    <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">Event Name</label>
                    <input
                      type="text"
                      id="eventName"
                      value={newEvent.name}
                      onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="date"
                      id="eventDate"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="eventPlace" className="block text-sm font-medium text-gray-700">Place</label>
                    <input
                      type="text"
                      id="eventPlace"
                      value={newEvent.place}
                      onChange={(e) => setNewEvent({...newEvent, place: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="eventGuest" className="block text-sm font-medium text-gray-700">Special Guest</label>
                    <input
                      type="text"
                      id="eventGuest"
                      value={newEvent.specialGuest}
                      onChange={(e) => setNewEvent({...newEvent, specialGuest: e.target.value})}
                      className="mt-1 block w-full roundedmd border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      id="eventDescription"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      rows="3"
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="eventPrice" className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                      type="number"
                      id="eventPrice"
                      value={newEvent.price}
                      onChange={(e) => setNewEvent({...newEvent, price: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="eventTotalTickets" className="block text-sm font-medium text-gray-700">Total Tickets</label>
                    <input
                      type="number"
                      id="eventTotalTickets"
                      value={newEvent.totalTickets}
                      onChange={(e) => setNewEvent({...newEvent, totalTickets: e.target.value})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="eventImage" className="block text-sm font-medium text-gray-700">Image</label>
                    <input
                      type="file"
                      id="eventImage"
                      onChange={(e) => setNewEvent({...newEvent, image: e.target.files[0]})}
                      className="mt-1 block w-full"
                      accept="image/*"
                    />
                    {newEvent.image && (
                      <img 
                        src={typeof newEvent.image === 'string' ? newEvent.image : URL.createObjectURL(newEvent.image)} 
                        alt="Event preview" 
                        className="mt-2 h-32 w-auto object-cover"
                      />
                    )}
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowEventForm(false);
                        setEditingEvent(null);
                      }}
                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                      {editingEvent ? 'Update Event' : 'Add Event'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Admin;

