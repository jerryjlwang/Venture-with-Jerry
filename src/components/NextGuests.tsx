import { Calendar } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

const NextGuests = () => {
  // Placeholder data - you can replace with real data later
  const upcomingGuests = [
    {
      name: "Alex Edelson", 
      title: "General Partner at Slipstream Investors",
      date: "Oct 16, 2025",
      topic: "Fund of funds",
      avatar: "/lovable-uploads/alex-edelson.png"
    }
  ];

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-blue-400" />
        Upcoming Interviews
      </h3>
      <div className="space-y-4">
        {upcomingGuests.map((guest, index) => (
          <div key={index} className="border-b border-white/10 pb-3 last:border-0 last:pb-0">
            <div className="flex items-start gap-3">
              <Avatar className="w-10 h-10 flex-shrink-0">
                <AvatarImage src={guest.avatar} alt={guest.name} />
                <AvatarFallback className="bg-blue-400/20 text-blue-400 text-sm">
                  {guest.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-white font-medium text-sm">{guest.name}</p>
                <p className="text-gray-300 text-xs">{guest.title}</p>
                <p className="text-blue-400 text-xs mt-1">{guest.date}</p>
                <p className="text-gray-400 text-xs mt-1">{guest.topic}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextGuests;
