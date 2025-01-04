// import React, { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { ChevronLeft, ChevronRight, Upload, Star, Sparkles, DollarSign, Gavel, User, Mail, Phone, Instagram, Award, CheckCircle, Briefcase, CreditCard } from 'lucide-react'
// import axios from 'axios'
// import c1 from "../assets/images/a5.png"
// import c2 from "../assets/images/a6.png"
// import c3 from "../assets/images/a11.png"
// import c4 from "../assets/images/a13.png"
// const formSteps = {
//   1: {
//     title: "Choose Your Role",
//     subtitle: "Sponsor or Judge?",
//     image: c1,
//     icon: <Star className="w-8 h-8" />
//   },
//   2: {
//     title: "Personal Information",
//     subtitle: "Let's get to know you",
//     image: c2,
//     icon: <User className="w-8 h-8" />
//   },
//   3: {
//     title: "Tell Us More",
//     subtitle: "Share your story",
//     image: c3,
//     icon: <Mail className="w-8 h-8" />
//   },
//   4: {
//     title: "Thank You!",
//     subtitle: "We appreciate your interest",
//     image: c4,
//     icon: <CheckCircle className="w-8 h-8" />
//   }
// }

// const Collaborate = () => {
//   const [step, setStep] = useState(1)
//   const [formData, setFormData] = useState({
//     role: '',
//     name: '',
//     phoneNumber: '',
//     email: '',
//     instaId: '',
//     aboutYourself: '',
//     viewedPreviousEpisodes: false,
//     brandName: '',
//     priceOffering: ''
//   })

//   useEffect(() => {
//     const savedData = localStorage.getItem('comedyCollaborationData')
//     if (savedData) {
//       setFormData(JSON.parse(savedData))
//     }
//   }, [])

//   useEffect(() => {
//     localStorage.setItem('comedyCollaborationData', JSON.stringify(formData))
//   }, [formData])

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       const response = await axios.post('http://localhost:5000/api/collaborators', formData)
//       console.log('Form submitted:', response.data)
//       setStep(4) // Move to the thank you step
//       // Handle success (e.g., show a success message)
//     } catch (error) {
//       console.error('Error submitting form:', error)
//       // Handle error (e.g., show an error message)
//     }
//   }

//   const nextStep = () => setStep(prev => Math.min(prev + 1, 4))
//   const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

//   const renderFormStep = () => {
//     switch(step) {
//       case 1:
//         return (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="space-y-6"
//           >
//             <div className="space-y-4">
//               <label className="text-xl font-bold text-purple-300">Choose Your Role</label>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <motion.button
//                   type="button"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => {
//                     handleInputChange({ target: { name: 'role', value: 'sponsor' } })
//                     nextStep()
//                   }}
//                   className={`p-6 rounded-lg ${formData.role === 'sponsor' ? 'bg-yellow-500 text-gray-900' : 'bg-gray-800'} transition-all duration-300 flex flex-col items-center justify-center space-y-2`}
//                 >
//                   <DollarSign className="w-12 h-12" />
//                   <span className="text-lg font-semibold">Sponsor</span>
//                 </motion.button>
//                 <motion.button
//                   type="button"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => {
//                     handleInputChange({ target: { name: 'role', value: 'judge' } })
//                     nextStep()
//                   }}
//                   className={`p-6 rounded-lg ${formData.role === 'judge' ? 'bg-purple-500 text-gray-900' : 'bg-gray-800'} transition-all duration-300 flex flex-col items-center justify-center space-y-2`}
//                 >
//                   <Gavel className="w-12 h-12" />
//                   <span className="text-lg font-semibold">Judge</span>
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>
//         )
//       case 2:
//         return (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="space-y-6"
//           >
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.1 }}
//               className="space-y-4"
//             >
//               <label className="text-sm font-medium text-gray-300">Full Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
//                 placeholder="John Doe"
//               />
//             </motion.div>
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.2 }}
//               className="space-y-4"
//             >
//               <label className="text-sm font-medium text-gray-300">Phone Number</label>
//               <div className="relative">
//                 <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="tel"
//                   name="phoneNumber"
//                   value={formData.phoneNumber}
//                   onChange={handleInputChange}
//                   className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
//                   placeholder="+1 (555) 000-0000"
//                 />
//               </div>
//             </motion.div>
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.3 }}
//               className="space-y-4"
//             >
//               <label className="text-sm font-medium text-gray-300">Email</label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
//                   placeholder="johndoe@example.com"
//                 />
//               </div>
//             </motion.div>
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.4 }}
//               className="space-y-4"
//             >
//               <label className="text-sm font-medium text-gray-300">Instagram ID</label>
//               <div className="relative">
//                 <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                 <input
//                   type="text"
//                   name="instaId"
//                   value={formData.instaId}
//                   onChange={handleInputChange}
//                   className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
//                   placeholder="@johndoe"
//                 />
//               </div>
//             </motion.div>
//           </motion.div>
//         )
//       case 3:
//         return (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="space-y-6"
//           >
//             {formData.role === 'sponsor' && (
//               <>
//                 <motion.div
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.1 }}
//                   className="space-y-4"
//                 >
//                   <label className="text-sm font-medium text-gray-300">Brand Name</label>
//                   <div className="relative">
//                     <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <input
//                       type="text"
//                       name="brandName"
//                       value={formData.brandName}
//                       onChange={handleInputChange}
//                       className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
//                       placeholder="Your Brand Name"
//                     />
//                   </div>
//                 </motion.div>
//                 <motion.div
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.2 }}
//                   className="space-y-4"
//                 >
//                   <label className="text-sm font-medium text-gray-300">Price Offering</label>
//                   <div className="relative">
//                     <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
//                     <input
//                       type="text"
//                       name="priceOffering"
//                       value={formData.priceOffering}
//                       onChange={handleInputChange}
//                       className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
//                       placeholder="$1000"
//                     />
//                   </div>
//                 </motion.div>
//               </>
//             )}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.3 }}
//               className="space-y-4"
//             >
//               <label className="text-sm font-medium text-gray-300">Tell Us About Yourself</label>
//               <textarea
//                 name="aboutYourself"
//                 value={formData.aboutYourself}
//                 onChange={handleInputChange}
//                 className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all resize-none"
//                 rows={6}
//                 placeholder={formData.role === 'sponsor' ? "Tell us about your company and why you want to sponsor..." : "Share your experience as a comedy judge or enthusiast..."}
//               />
//             </motion.div>
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ delay: 0.4 }}
//               className="flex items-center space-x-3"
//             >
//               <input
//                 type="checkbox"
//                 name="viewedPreviousEpisodes"
//                 checked={formData.viewedPreviousEpisodes}
//                 onChange={handleInputChange}
//                 className="w-5 h-5 rounded border-gray-700 text-purple-500 focus:ring-purple-500"
//               />
//               <label className="text-sm text-gray-300">
//                 I have viewed previous episodes of the show
//               </label>
//             </motion.div>
//           </motion.div>
//         )
//       case 4:
//         return (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.8 }}
//             className="text-center py-12"
//           >
//             <motion.div
//               animate={{
//                 rotate: [0, 360],
//                 scale: [1, 1.2, 1],
//               }}
//               transition={{
//                 duration: 1.5,
//                 repeat: Infinity,
//                 repeatType: "loop"
//               }}
//               className="inline-block"
//             >
//               {formData.role === 'sponsor' ? (
//                 <DollarSign className="w-24 h-24 text-yellow-400" />
//               ) : (
//                 <Gavel className="w-24 h-24 text-purple-400" />
//               )}
//             </motion.div>
//             <h2 className="text-3xl font-bold mt-6 mb-2 text-purple-400">
//               {formData.role === 'sponsor' ? "Thank You, Sponsor!" : "Thank You, Judge!"}
//             </h2>
//             <p className="text-xl text-gray-300 mb-8">
//               {formData.role === 'sponsor' 
//                 ? "Your support will help us bring more laughter to the world!" 
//                 : "Your expertise will help us find the next comedy star!"}
//             </p>
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
//               className="text-lg text-gray-400"
//             >
//               We'll be in touch soon with next steps.
//             </motion.p>
//           </motion.div>
//         )
//       default:
//         return null
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
//       <div className="relative h-[50vh] overflow-hidden">
//         <img 
//           src="/comedy-collaboration-hero.jpg" 
//           alt="Comedy Collaboration" 
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="text-center">
//             <motion.h1 
//               initial={{ y: -50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.5 }}
//               className="text-5xl md:text-7xl font-extrabold text-white mb-4"
//             >
//               Join the Comedy Revolution
//             </motion.h1>
//             <motion.p
//               initial={{ y: 50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="text-xl md:text-2xl text-gray-200"
//             >
//               Become a Sponsor or Judge and Shape the Future of Laughter
//             </motion.p>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-4xl mx-auto px-4 py-12">
//         <div className="bg-gray-900 shadow-2xl rounded-xl overflow-hidden">
//           <div className="p-8">
//             <form onSubmit={handleSubmit} className="space-y-8">
//               <div className="flex items-center justify-between mb-8">
//                 {Object.entries(formSteps).map(([key, value]) => (
//                   <div key={key} className="flex flex-col items-center">
//                     <div
//                       className={`w-12 h-12 rounded-full flex items-center justify-center ${
//                         step >= parseInt(key) ? 'bg-purple-600' : 'bg-gray-700'
//                       } transition-all duration-300`}
//                     >
//                       {value.icon}
//                     </div>
//                     <div className="text-xs mt-2 text-gray-400">{value.title}</div>
//                   </div>
//                 ))}
//               </div>

//               <div className="flex flex-col md:flex-row md:space-x-8">
//                 <div className="w-full md:w-2/3">
//                   <AnimatePresence mode="wait">
//                     {renderFormStep()}
//                   </AnimatePresence>
//                 </div>
//                 <div className="w-full md:w-1/3 mt-8 md:mt-0">
//                   <div className="sticky top-8">
//                     <img
//                       src={formSteps[step].image}
//                       alt={`Step ${step}`}
//                       className="w-full h-64 object-cover rounded-lg shadow-lg"
//                     />
//                     <h2 className="text-2xl font-bold mt-4 mb-2 text-purple-400">{formSteps[step].title}</h2>
//                     <p className="text-gray-400">{formSteps[step].subtitle}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex justify-between mt-8">
//                 {step > 1 && step < 4 && (
//                   <button
//                     type="button"
//                     onClick={prevStep}
//                     className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all"
//                   >
//                     <ChevronLeft className="w-5 h-5 mr-2" />
//                     Previous
//                   </button>
//                 )}
//                 {step < 4 ? (
//                   <button
//                     type="button"
//                     onClick={nextStep}
//                     className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all ml-auto"
//                   >
//                     Next
//                     <ChevronRight className="w-5 h-5 ml-2" />
//                   </button>
//                 ) : step === 4 ? (
//                   <button
//                     type="submit"
//                     className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all ml-auto"
//                   >
//                     Submit
//                     <Upload className="w-5 h-5 ml-2" />
//                   </button>
//                 ) : null}
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Collaborate



import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Upload, Star, Sparkles, DollarSign, Gavel, User, Mail, Phone, Instagram, Award, CheckCircle, Briefcase, CreditCard } from 'lucide-react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import c1 from "../assets/images/a5.png"
import c2 from "../assets/images/a6.png"
import c3 from "../assets/images/a11.png"
import c4 from "../assets/images/a13.png"

const formSteps = {
  1: {
    title: "Choose Your Role",
    subtitle: "Sponsor or Judge?",
    image: c1,
    icon: <Star className="w-8 h-8" />
  },
  2: {
    title: "Personal Information",
    subtitle: "Let's get to know you",
    image: c2,
    icon: <User className="w-8 h-8" />
  },
  3: {
    title: "Tell Us More",
    subtitle: "Share your story",
    image: c3,
    icon: <Mail className="w-8 h-8" />
  },
  4: {
    title: "Thank You!",
    subtitle: "We appreciate your interest",
    image: c4,
    icon: <CheckCircle className="w-8 h-8" />
  }
}

const Collaborate = () => {
  const [step, setStep] = useState(1)
  const { register, handleSubmit, formState: { errors, isValid }, watch, setValue, trigger } = useForm({
    mode: 'onChange',
    defaultValues: {
      role: '',
      name: '',
      phoneNumber: '',
      email: '',
      instaId: '',
      aboutYourself: '',
      viewedPreviousEpisodes: false,
      brandName: '',
      priceOffering: ''
    }
  })

  const role = watch('role')

  // useEffect(() => {
  //   const savedData = localStorage.getItem('comedyCollaborationData')
  //   if (savedData) {
  //     const parsedData = JSON.parse(savedData)
  //     Object.keys(parsedData).forEach(key => {
  //       setValue(key, parsedData[key])
  //     })
  //   }
  // }, [setValue])

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      localStorage.setItem('comedyCollaborationData', JSON.stringify(value))
    })
    return () => subscription.unsubscribe()
  }, [watch])

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/collaborators', data)
      console.log('Form submitted:', response.data)
      setStep(4) // Move to the thank you step
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error('Error submitting form:', error)
      // Handle error (e.g., show an error message)
    }
  }

  const nextStep = async () => {
    const isStepValid = await trigger()
    if (isStepValid) {
      setStep(prev => Math.min(prev + 1, 4))
    }
  }

  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const renderFormStep = () => {
    switch(step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <label className="text-xl font-bold text-purple-300">Choose Your Role</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setValue('role', 'sponsor')
                    nextStep()
                  }}
                  className={`p-6 rounded-lg ${role === 'sponsor' ? 'bg-yellow-500 text-gray-900' : 'bg-gray-800'} transition-all duration-300 flex flex-col items-center justify-center space-y-2`}
                >
                  <DollarSign className="w-12 h-12" />
                  <span className="text-lg font-semibold">Sponsor</span>
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setValue('role', 'judge')
                    nextStep()
                  }}
                  className={`p-6 rounded-lg ${role === 'judge' ? 'bg-purple-500 text-gray-900' : 'bg-gray-800'} transition-all duration-300 flex flex-col items-center justify-center space-y-2`}
                >
                  <Gavel className="w-12 h-12" />
                  <span className="text-lg font-semibold">Judge</span>
                </motion.button>
              </div>
            </div>
            {errors.role && <p className="text-red-500 text-sm mt-2">Please select a role</p>}
          </motion.div>
        )
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <label className="text-sm font-medium text-gray-300">Full Name</label>
              <input
                {...register("name", { 
                  required: "Name is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Name should only contain alphabetical characters and spaces"
                  }
                })}
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <label className="text-sm font-medium text-gray-300">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register("phoneNumber", { 
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9+\-\s()]+$/,
                      message: "Invalid phone number format"
                    }
                  })}
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              {errors.phoneNumber && <p className="text-red-500 text-sm mt-2">{errors.phoneNumber.message}</p>}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <label className="text-sm font-medium text-gray-300">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="johndoe@example.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <label className="text-sm font-medium text-gray-300">Instagram ID</label>
              <div className="relative">
                <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register("instaId", { required: "Instagram ID is required" })}
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="@johndoe"
                />
              </div>
              {errors.instaId && <p className="text-red-500 text-sm mt-2">{errors.instaId.message}</p>}
            </motion.div>
          </motion.div>
        )
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {role === 'sponsor' && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-4"
                >
                  <label className="text-sm font-medium text-gray-300">Brand Name</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register("brandName", { required: "Brand name is required" })}
                      className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
                      placeholder="Your Brand Name"
                    />
                  </div>
                  {errors.brandName && <p className="text-red-500 text-sm mt-2">{errors.brandName.message}</p>}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <label className="text-sm font-medium text-gray-300">Price Offering</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register("priceOffering", { 
                        required: "Price offering is required",
                        pattern: {
                          value: /^\$?[0-9]+(\.[0-9]{2})?$/,
                          message: "Invalid price format"
                        }
                      })}
                      className="w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
                      placeholder="$1000"
                    />
                  </div>
                  {errors.priceOffering && <p className="text-red-500 text-sm mt-2">{errors.priceOffering.message}</p>}
                </motion.div>
              </>
            )}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <label className="text-sm font-medium text-gray-300">Tell Us About Yourself</label>
              <textarea
                {...register("aboutYourself", { required: "This field is required" })}
                className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                rows={6}
                placeholder={role === 'sponsor' ? "Tell us about your company and why you want to sponsor..." : "Share your experience as a comedy judge or enthusiast..."}
              />
              {errors.aboutYourself && <p className="text-red-500 text-sm mt-2">{errors.aboutYourself.message}</p>}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center space-x-3"
            >
              <input
                {...register("viewedPreviousEpisodes")}
                type="checkbox"
                className="w-5 h-5 rounded border-gray-700 text-purple-500 focus:ring-purple-500"
              />
              <label className="text-sm text-gray-300">
                I have viewed previous episodes of the show
              </label>
            </motion.div>
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
              {role === 'sponsor' ? (
                <DollarSign className="w-24 h-24 text-yellow-400" />
              ) : (
                <Gavel className="w-24 h-24 text-purple-400" />
              )}
            </motion.div>
            <h2 className="text-3xl font-bold mt-6 mb-2 text-purple-400">
              {role === 'sponsor' ? "Thank You, Sponsor!" : "Thank You, Judge!"}
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              {role === 'sponsor' 
                ? "Your support will help us bring more laughter to the world!" 
                : "Your expertise will help us find the next comedy star!"}
            </p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-gray-400"
            >
              We'll be in touch soon with next steps.
            </motion.p>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <div className="relative h-[50vh] overflow-hidden">
        <img 
          src="/comedy-collaboration-hero.jpg" 
          alt="Comedy Collaboration" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <motion.h1 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-7xl font-extrabold text-white mb-4"
            >
              Join the Comedy Revolution
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-200"
            >
              Become a Sponsor or Judge and Shape the Future of Laughter
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-gray-900 shadow-2xl rounded-xl overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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

              <div className="flex flex-col md:flex-row md:space-x-8">
                <div className="w-full md:w-2/3">
                  <AnimatePresence mode="wait">
                    {renderFormStep()}
                  </AnimatePresence>
                </div>
                <div className="w-full md:w-1/3 mt-8 md:mt-0">
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
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all ml-auto"
                    disabled={!isValid}
                  >
                    Next
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                ) : step === 3 ? (
                  <button
                    type="submit"
                    className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all ml-auto"
                    disabled={!isValid}
                  >
                    Submit
                    <Upload className="w-5 h-5 ml-2" />
                  </button>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Collaborate

