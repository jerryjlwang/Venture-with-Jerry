import { lazy, Suspense } from 'react';

// User's original photos for content
import hole1SoccerMedal from '@/assets/hole1-soccer-medal.png';
import hole1SoccerKick from '@/assets/hole1-soccer-kick.jpeg';
import hole2Photo from '@/assets/hole2-photo.jpeg';
import hole2Trophy from '@/assets/hole2-trophy.jpeg';
import hole2Team from '@/assets/hole2-team.jpeg';
import hole3Photo from '@/assets/hole3-photo.png';
import hole4Photo from '@/assets/hole4-photo.jpeg';
import hole4Putting from '@/assets/hole4-putting.jpeg';
import hole4Swing from '@/assets/hole4-swing.jpeg';
import hole4Tee from '@/assets/hole4-tee.jpeg';
import hole5Photo from '@/assets/hole5-photo.png';
import hole5Clubs from '@/assets/hole5-clubs.png';
import hole5Flyer from '@/assets/hole5-flyer.png';
import hole5Team from '@/assets/hole5-team.png';
import hole6Photo from '@/assets/hole6-photo.jpeg';
import hole7Photo from '@/assets/hole7-photo.png';
import hole7Math from '@/assets/hole7-math.png';
import hole8Photo from '@/assets/hole8-photo.jpeg';
import hole9Photo from '@/assets/hole9-photo.png';
import hole10Photo from '@/assets/hole10-photo.jpeg';
import hole10Onesixone from '@/assets/hole10-onesixone.png';
import hole11Photo from '@/assets/hole11-photo.png';
import hole12Photo from '@/assets/hole12-photo.png';
import hole13Photo from '@/assets/hole13-photo.png';

// Chambers Bay background images
import chambersBayHole1 from '@/assets/chambers-bay-hole1.jpg';
import chambersBayHole2 from '@/assets/chambers-bay-hole2.jpg';
import chambersBayHole3 from '@/assets/chambers-bay-hole3.jpg';
import chambersBayHole4 from '@/assets/chambers-bay-hole4.jpg';
import chambersBayHole5 from '@/assets/chambers-bay-hole5.jpg';
import chambersBayHole6 from '@/assets/chambers-bay-hole6.jpg';
import chambersBayHole7 from '@/assets/chambers-bay-hole7.jpg';
import chambersBayHole8 from '@/assets/chambers-bay-hole8.jpg';
import chambersBayHole9 from '@/assets/chambers-bay-hole9.jpg';
import chambersBayHole10 from '@/assets/chambers-bay-hole10.jpg';
import chambersBayHole11 from '@/assets/chambers-bay-hole11.jpg';
import chambersBayHole12 from '@/assets/chambers-bay-hole12.jpg';
import chambersBayHole13 from '@/assets/chambers-bay-hole13.jpg';
import chambersBayHole14 from '@/assets/chambers-bay-hole14.jpg';
import chambersBayHole15 from '@/assets/chambers-bay-hole15.jpg';
import chambersBayHole16 from '@/assets/chambers-bay-hole16.jpg';
import chambersBayHole17 from '@/assets/chambers-bay-hole17.jpg';
import chambersBayHole18 from '@/assets/chambers-bay-hole18.jpg';

import HoleCard from './HoleCard';

interface HoleData {
  hole: number;
  title: string;
  description: string;
  year?: string;
}


const journeyData: HoleData[] = [
  { hole: 1, title: "European Football", description: "I played club soccer from 2nd to 9th grade, hopping around several teams until I found my place at Titans FC", year: "2015" },
  { hole: 2, title: "Washington Cup", description: "After several years of promotions and relegations, we finally won the state cup in a thrilling penalty shootout.", year: "2022" },
  { hole: 3, title: "First Tee->First Tee", description: "I started volunteering with First Tee, representing the non-profit at the Seattle Golf Show and helping out with equipment sales.", year: "2023" },
  { hole: 4, title: "Varsity Dogs", description: "After relentless driving range practice and dozens of balls lost to the pond, I made the Varsity team in my second year of golfing and have played every year since. Twice I was voted Most Improved Player.", year: "2023" },
  { hole: 5, title: "Fabulous JAB", description: "Joining First Tee's Junior Advisory Board, I helped lead 16 seasonal fundraisers which have in total raised $100k+ over the past 2.5 years. Now as the Director of Sales, I lead pricing strategy and have organized 4 record-breaking fundraisers which have provided hundreds of need-based scholarships to aspiring golfers.", year: "2024" },
  { hole: 6, title: "Late night Jams", description: "I built a lot of projects at this time (i.e. A pricing algorithm so my family wouldn't overcharge for rent or a course management tool using machine learning to make better swing decisions. I ended up qualifying for ACSL finals while ascending to the Gold Division in USACO too. LeetCode became a little hobby, and I now have 250+ problems solved.", year: "2019" },
  { hole: 7, title: "Canon Event", description: "Math competitions also struck a cord with me. After placing 2nd in my first tournament in 5th grade, I fell in love with problem solving. Since then, I've qualified for AIME four times with AMC10 honor roll as well.", year: "2019" },
  { hole: 8, title: "Growing Up", description: "I also joined DECA to build my business acumen, and became the co-head of administration for the LEAD DECA team. Other achievements included qualifying for the US Economics Olympiad and placing top 500 in the Wharton Youth Investment Challenge.", year: "2024" },
  { hole: 9, title: "Wyze Smarts", description: "Summer after sophomore year: I finally got real life experience while interning at Wyze Labs. There, I led an initative which educated and protected 100+ households with safety workshops and gifted security systems.", year: "2020" },
  { hole: 10, title: "The Golden Ratio", description: "I was recruited for an internship by one of my interviewees because he respected my tenacity. I helped with growth, co-hosted events, and even rebuilt the entire web platform for the release of the new fund–a high-stakes responsibility because it would ultimately oversee $35 million in venture funding.", year: "2025" },
  { hole: 11, title: "Boardy Scouts!", description: "To my surprise, I was selected as 1 of 1000 deal partners for the world's first AI-led venture fund. With thousands of applicants from a global pool of successful founders and investors, I was one of two high schoolers to be selected.", year: "2021" },
  { hole: 12, title: "Venture with Jerry", description: "I started reaching out to venture capital investors/operators, then built the blog you're on right now.", year: "2024" },
  { hole: 13, title: "PitchFork Revolution", description: "Drawing from my interviews and other experiences at tech events, I found a new problem to tackle that had amazing potential to scale.", year: "2022" },
  { hole: 14, title: "Taper", description: "I joined the Taper team as well, a matchmaking platform for student barbers and college students. We're currently raising, check us out!", year: "2025" },
  { hole: 15, title: "Venturous", description: "I love trying new things. Skiing, outdoor exploration, sailing, scuba diving, let me know what I should try next!", year: "2022" },
  { hole: 16, title: "Travelling", description: "I'm so glad to have visited so many sunny places. Next stop: Japan 2026.", year: "2022" },
  { hole: 17, title: "Stop-motion", description: "I've been obssessed with Lego building since I was 3. However, I took my talents to filming and production in 6th grade, where the better years of Covid left my storage full of Star Wars Lego scenes.", year: "2023" },
  { hole: 18, title: "The Journey Continues", description: "Golf, startups, I'm not sure what's next. I do know that I wont be sitting still, there's too much to uncover.", year: "2026" },
];

// Complete journey order
const journeyOrder: HoleData[] = journeyData;

// Photo collections for each hole (supports multiple photos per hole)
const holePhotos: Record<number, string[]> = {
  1: [hole1SoccerMedal, hole1SoccerKick],
  2: [hole2Trophy, hole2Team],
  3: [hole3Photo],
  4: [hole4Photo, hole4Putting, hole4Swing, hole4Tee],
  5: [hole5Clubs, hole5Flyer, hole5Team],
  6: [hole6Photo],
  7: [hole7Photo, hole7Math],
  8: [hole8Photo],
  9: [hole9Photo],
  10: [hole10Photo, hole10Onesixone],
  11: [hole11Photo],
  12: [hole12Photo],
  13: [hole13Photo],
};
// Get photos for a hole (returns array)
const getHolePhotos = (hole: number): string[] => {
  return holePhotos[hole] || [];
};

// Get Chambers Bay background
const getHoleBackground = (hole: number): string => {
  switch (hole) {
    case 1: return chambersBayHole1;
    case 2: return chambersBayHole2;
    case 3: return chambersBayHole3;
    case 4: return chambersBayHole4;
    case 5: return chambersBayHole5;
    case 6: return chambersBayHole6;
    case 7: return chambersBayHole7;
    case 8: return chambersBayHole8;
    case 9: return chambersBayHole9;
    case 10: return chambersBayHole10;
    case 11: return chambersBayHole11;
    case 12: return chambersBayHole12;
    case 13: return chambersBayHole13;
    case 14: return chambersBayHole14;
    case 15: return chambersBayHole15;
    case 16: return chambersBayHole16;
    case 17: return chambersBayHole17;
    case 18: return chambersBayHole18;
    default: return chambersBayHole1;
  }
};

const HoleCardList = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col items-center">
        {journeyOrder.map((hole, index) => (
          <HoleCard
            key={hole.hole}
            hole={hole}
            index={index}
            isLast={index === journeyOrder.length - 1}
            photos={getHolePhotos(hole.hole)}
            background={getHoleBackground(hole.hole)}
            position={index % 2 === 0 ? 'left' : 'right'}
          />
        ))}
      </div>
    </div>
  );
};

export default HoleCardList;
