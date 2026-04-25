'use client'

interface DoctorCardProps {
  name: string
  specialty: string
  rating: number
  reviews: number
  experience: number
  consultationFee: number
  services: string
  nextAvailable: string
  image: string
}

export default function DoctorCard({
  name,
  specialty,
  rating,
  reviews,
  experience,
  consultationFee,
  services,
  nextAvailable,
  image,
}: DoctorCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <img
            src={image}
            alt={name}
            className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
          />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">{name}</h3>
            <p className="text-blue-600 font-medium text-sm">{specialty}</p>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-yellow-400">⭐</span>
              <span className="font-semibold text-gray-900">{rating}</span>
              <span className="text-gray-600 text-sm">• {reviews} Reviews</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div>
            <p className="text-gray-300 uppercase text-xs font-semibold tracking-wide">Experience</p>
            <p className="font-semibold text-gray-900 text-base">{experience} Years</p>
          </div>
          <div>
            <p className="text-gray-600 uppercase text-xs font-semibold tracking-wide">Consultation</p>
            <p className="font-semibold text-gray-900 text-base">${consultationFee}.00</p>
          </div>
          <div>
            <p className="text-gray-600 uppercase text-xs font-semibold tracking-wide">Services</p>
            <p className="font-semibold text-gray-900">{services}</p>
          </div>
          <div>
            <p className="text-gray-600 uppercase text-xs font-semibold tracking-wide">Next Available</p>
            <p className="font-semibold text-green-600">{nextAvailable}</p>
          </div>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
          Book Appointment
        </button>
      </div>
    </div>
  )
}
