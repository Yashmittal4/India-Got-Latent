'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Upload, Star, Sparkles, Mic2, Camera, User, Mail, Phone, Instagram, Award } from 'lucide-react'
import axios from 'axios'
const formSteps = {
  1: {
    title: "Personal Information",
    subtitle: "Let's get to know you better",
    image: "/comedian-1.jpg",
    icon: <User className="w-8 h-8" />
  },
  2: {
    title: "Your Comedy Journey",
    subtitle: "Share your unique story",
    image: "/comedian-2.jpg",
    icon: <Mic2 className="w-8 h-8" />
  },
  3: {
    title: "Final Touches",
    subtitle: "Almost there, superstar!",
    image: "/comedian-3.jpg",
    icon: <Star className="w-8 h-8" />
  },
  4: {
    title: "You're a Star!",
    subtitle: "Get ready to shine",
    image: "/comedian-4.jpg",
    icon: <Sparkles className="w-8 h-8" />
  }
}

const Participate = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    sex: '',
    email: '',
    instaId: '',
    photo: null,
    talentCategory: '',
    otherTalent: '',
    crazyThing: '',
    embarrassingMoment: '',
    lifeTrauma: '',
    watchedPreviousEpisodes: false,
    whyAttending: '',
    personalityScore: 5
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const savedData = localStorage.getItem('comedyFormData')
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      setFormData(prevData => ({
        ...prevData,
        ...parsedData,
        photo: null 
      }))
    }
  }, [])

  useEffect(() => {
    const dataToSave = { ...formData }
    delete dataToSave.photo 
    localStorage.setItem('comedyFormData', JSON.stringify(dataToSave))
  }, [formData])

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target
    if (type === 'file') {
      setFormData(prev => ({ 
        ...prev, 
        [name]: files[0],
        photoPreview: URL.createObjectURL(files[0])
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    
    const formDataToSend = new FormData()
    for (const key in formData) {
      formDataToSend.append(key, formData[key])
    }

    try {
      const response = await axios.post('http://localhost:5000/api/participants', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log('Form submitted:', response.data)

      
    } catch (error) {
      console.error('Error submitting form:', error)
      
    }
  }

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const renderFormStep = () => {
    switch(step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  required
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Sex</label>
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Instagram ID</label>
                <div className="relative">
                  <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="instaId"
                    value={formData.instaId}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
                    placeholder="@johncomedy"
                  />
                </div>
              </div>
            </div>

            {/* <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Upload Your Photo</label>
              <div className="relative">
                <input
                  type="file"
                  name="photo"
                  onChange={handleInputChange}
                  className="hidden"
                  id="photo-upload"
                  accept="image/*"
                />
                <label
                  htmlFor="photo-upload"
                  className="flex items-center justify-center w-full px-4 py-6 rounded-lg border-2 border-dashed border-gray-700 hover:border-purple-500 transition-all cursor-pointer bg-gray-800/50"
                >
                  <div className="text-center">
                    <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <span className="text-sm text-gray-400">
                      {formData.photo ? formData.photo.name : 'Click to upload your photo'}
                    </span>
                  </div>
                </label>
              </div>
            </div> */}
            <div className="space-y-2">
  <label className="text-sm font-medium text-gray-300">Upload Your Photo</label>
  <div className="relative">
    <input
      type="file"
      name="photo"
      onChange={handleInputChange}
      className="hidden"
      id="photo-upload"
      accept="image/*"
    />
    <label
      htmlFor="photo-upload"
      className="flex items-center justify-center w-full px-4 py-6 rounded-lg border-2 border-dashed border-gray-700 hover:border-purple-500 transition-all cursor-pointer bg-gray-800/50"
    >
      {formData.photoPreview ? (
        <img src={formData.photoPreview} alt="Preview" className="max-h-32 object-cover" />
      ) : (
        <div className="text-center">
          <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <span className="text-sm text-gray-400">
            Click to upload your photo
          </span>
        </div>
      )}
    </label>
  </div>
</div>
          </motion.div>
        )
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Talent Category</label>
              <select
                name="talentCategory"
                value={formData.talentCategory}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
              >
                <option value="">Select your talent</option>
                <option value="standup">Stand-up Comedy</option>
                <option value="improv">Improv Comedy</option>
                <option value="sketch">Sketch Comedy</option>
                <option value="musical">Musical Comedy</option>
                <option value="other">Other</option>
              </select>
            </div>

            {formData.talentCategory === 'other' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-gray-300">Specify Your Talent</label>
                <input
                  type="text"
                  name="otherTalent"
                  value={formData.otherTalent}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="Tell us about your unique talent"
                />
              </motion.div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Something Crazy About You</label>
              <textarea
                name="crazyThing"
                value={formData.crazyThing}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                rows={4}
                placeholder="Share something wild about yourself..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Most Embarrassing Moment</label>
              <textarea
                name="embarrassingMoment"
                value={formData.embarrassingMoment}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                rows={4}
                placeholder="We won't judge, promise!"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Life Trauma</label>
              <textarea
                name="lifeTrauma"
                value={formData.lifeTrauma}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                rows={4}
                placeholder="Turn your pain into comedy gold..."
              />
            </div>
          </motion.div>
        )
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Why Are You Coming to the Show?</label>
              <textarea
                name="whyAttending"
                value={formData.whyAttending}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                rows={4}
                placeholder="Tell us your motivation..."
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-300">Rate Your Personality (1-10)</label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  name="personalityScore"
                  min="1"
                  max="10"
                  value={formData.personalityScore}
                  onChange={handleInputChange}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-2xl font-bold text-purple-500">{formData.personalityScore}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Introvert</span>
                <span>Extrovert</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-gray-800/50 p-4 rounded-lg">
              <input
                type="checkbox"
                name="watchedPreviousEpisodes"
                checked={formData.watchedPreviousEpisodes}
                onChange={handleInputChange}
                className="w-5 h-5 rounded border-gray-700 text-purple-500 focus:ring-purple-500"
              />
              <label className="text-sm text-gray-300">
                I have watched previous episodes
              </label>
            </div>
          </motion.div>
        )
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop"
              }}
              className="inline-block"
            >
              <Sparkles className="w-24 h-24 text-yellow-400" />
            </motion.div>
            <h2 className="text-3xl font-bold mt-6 mb-2 text-purple-400">You're a Star!</h2>
            <p className="text-xl text-gray-300 mb-8">Get ready to shine on stage!</p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-gray-400"
            >
              We're excited to have you join us. Just one more step to go!
            </motion.p>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div>
          <h1 className="text-4xl font-extrabold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-500">
            Join the Laughter Revolution
          </h1>
          <p className="text-xl text-center text-gray-300">Your journey to comedy stardom starts here!</p>
        </div>

        <div className="bg-gray-900 shadow-2xl rounded-xl overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="flex items-center justify-between mb-8">
                {Object.entries(formSteps).map(([key, value]) => (
                  <div key={key} className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        step >= parseInt(key) ? 'bg-purple-600' : 'bg-gray-700'
                      } transition-all duration-300`}
                    >
                      {value.icon}
                    </div>
                    <div className="text-xs mt-2 text-gray-400">{value.title}</div>
                  </div>
                ))}
              </div>

              <div className="flex">
                <div className="w-2/3 pr-8">
                  <AnimatePresence mode="wait">
                    {renderFormStep()}
                  </AnimatePresence>
                </div>
                <div className="w-1/3">
                  <div className="sticky top-8">
                    <img
                      src={formSteps[step].image}
                      alt={`Step ${step}`}
                      className="w-full h-64 object-cover rounded-lg shadow-lg"
                    />
                    <h2 className="text-2xl font-bold mt-4 mb-2 text-purple-400">{formSteps[step].title}</h2>
                    <p className="text-gray-400">{formSteps[step].subtitle}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                {step > 1 && step < 4 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Previous
                  </button>
                )}
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all ml-auto"
                  >
                    Next
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all ml-auto"
                  >
                    Submit
                    <Upload className="w-5 h-5 ml-2" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Participate


