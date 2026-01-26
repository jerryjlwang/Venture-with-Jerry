import { lazy, Suspense } from 'react';

// User's original photos for content
import clubhousePhoto from '@/assets/clubhouse-photo.jpeg';
import hole1Photo from '@/assets/hole1-photo.png';
import hole2Photo from '@/assets/hole2-photo.jpeg';
import hole3Photo from '@/assets/hole3-photo.png';
import hole4Photo from '@/assets/hole4-photo.jpeg';
import hole5Photo from '@/assets/hole5-photo.png';
import hole6Photo from '@/assets/hole6-photo.jpeg';
import hole7Photo from '@/assets/hole7-photo.png';
import hole8Photo from '@/assets/hole8-photo.jpeg';
import hole9Photo from '@/assets/hole9-photo.png';
import hole10Photo from '@/assets/hole10-photo.jpeg';
import hole11Photo from '@/assets/hole11-photo.png';
import hole12Photo from '@/assets/hole12-photo.png';
import hole13Photo from '@/assets/hole13-photo.png';

// Chambers Bay background images
import chambersBayClubhouse from '@/assets/chambers-bay-clubhouse.jpg';
import chambersBayHalfway from '@/assets/chambers-bay-halfway.jpg';
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
  hole: number | 'clubhouse' | 'halfway';
  title: string;
  description: string;
  year?: string;
}

const clubhouseData: HoleData = {
  hole: 'clubhouse',
  title: "Clubhouse",
  description: "The clubhouse is where every round begins and ends. For me, this cycle looked like picking up my first club after leaving my previous passion, soccer, behind.",
};

const halfwayHouseData: HoleData = {
  hole: 'halfway',
  title: "Halfway House",
  description: "At this point in time, I took a step back to think about what I really wanted. After interviewing a venture capital partner for a class project, my eyes caught a glimpse of the startup world for the first time.",
};

const journeyData: HoleData[] = [
  { hole: 1, title: "First swings", description: "My primary interest at this time was math and programming. Mostly through competitions, I aspired to be a software developer because I loved using computational methods to solve problems.", year: "2018" },
  { hole: 2, title: "A chunk and a hole out", description: "After my first round of 168 at Bellevue Golf Course, I was ready to toss the clubs. However, seeing the $5 tee times offered through Youth on Course, I decided to give it another shot. After a thinned chip-in on the second par-5 for quadruple bogey, I became hooked.", year: "2018" },
  { hole: 3, title: "First Tee", description: "I started volunteering with First Tee, representing the non-profit at the Seattle Golf Show and helping out with equipment sales.", year: "2018" },
  { hole: 4, title: "High School Varsity", description: "After relentless driving range practice and dozens of balls lost to the pond, I made the Varsity team in my second year of golfing.", year: "2019" },
  { hole: 5, title: "Junior Tournaments", description: "I played in my first WJGA tournaments that summer and performed...horribly.", year: "2019" },
  { hole: 6, title: "Passion Projects", description: "I built a lot of projects at this time (i.e. A pricing algorithm so my family wouldn't overcharge for rent or a course management tool using machine learning to make better swing decisions.", year: "2019" },
  { hole: 7, title: "AIME", description: "After my 3rd AIME, I learned that I wanted to use computation for more ambitious projects.", year: "2020" },
  { hole: 8, title: "DECA", description: "I also joined DECA to build my business acumen, though I faced many pitfalls due to lack of commitment.", year: "2020" },
  { hole: 9, title: "Wyze Internship", description: "Summer after sophomore year: I finally got real life experience while interning at Wyze Labs.", year: "2020" },
  { hole: 10, title: "Networking", description: "I was invited to several networking at this time with the help of gracious mentors who valued my passion.", year: "2021" },
  { hole: 11, title: "Economics Olympiad", description: "I took a shot with the Economics Olympiad, and ended up being one of 50 to qualify to the national round.", year: "2021" },
  { hole: 12, title: "Venture with Jerry", description: "I started reaching out to venture capital investors/operators, then built the blog you're on right now.", year: "2021" },
  { hole: 13, title: "PitchFork", description: "Drawing from my interviews and other experiences at tech events, I found a new problem to tackle that had amazing potential to scale.", year: "2022" },
  { hole: 14, title: "Taper", description: "I joined the Taper team as well, a matchmaking platform for student barbers and college students.", year: "2022" },
  { hole: 15, title: "Director of Sales", description: "After junior year, I was elected by my peers to lead the Junior Advisory Board as the Director of Sales. With this agency, I could now address many of the problems I had observed.", year: "2022" },
  { hole: 16, title: "The Golden Ratio", description: "I was recruited for an internship by one of my interviewees because he respected my tenacity. I helped with growth, co-hosted events, and even rebuilt the entire web platform for the new year.", year: "2023" },
  { hole: 17, title: "Senior Season", description: "My final golf season didn't go expected, but it was the most fun I've had playng golf. I'm glad I could share my experiences with my teammates and the memories will carry on for every swing I make in the future.", year: "2023" },
  { hole: 18, title: "The Journey Continues", description: "Golf, startups, I'm not sure what's next. I do know that I wont be sitting still, there's too much to uncover.", year: "2024" },
];

// Complete journey order
const journeyOrder: HoleData[] = [
  clubhouseData,
  ...journeyData.slice(0, 9), // Holes 1-9
  halfwayHouseData,
  ...journeyData.slice(9), // Holes 10-18
];

// Get user's photo for content
const getHolePhoto = (hole: number | 'clubhouse' | 'halfway'): string | null => {
  switch (hole) {
    case 'clubhouse': return clubhousePhoto;
    case 1: return hole1Photo;
    case 2: return hole2Photo;
    case 3: return hole3Photo;
    case 4: return hole4Photo;
    case 5: return hole5Photo;
    case 6: return hole6Photo;
    case 7: return hole7Photo;
    case 8: return hole8Photo;
    case 9: return hole9Photo;
    case 10: return hole10Photo;
    case 11: return hole11Photo;
    case 12: return hole12Photo;
    case 13: return hole13Photo;
    default: return null;
  }
};

// Get Chambers Bay background
const getHoleBackground = (hole: number | 'clubhouse' | 'halfway'): string => {
  switch (hole) {
    case 'clubhouse': return chambersBayClubhouse;
    case 'halfway': return chambersBayHalfway;
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
            photo={getHolePhoto(hole.hole)}
            background={getHoleBackground(hole.hole)}
            position={index % 2 === 0 ? 'left' : 'right'}
          />
        ))}
      </div>
    </div>
  );
};

export default HoleCardList;
