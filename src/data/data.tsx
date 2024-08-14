import {
  AcademicCapIcon,
  ArrowDownTrayIcon,
  BuildingOffice2Icon,
  CalendarIcon,
  FlagIcon,
  MapIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

import FacebookIcon from '../components/Icon/FacebookIcon';
import GithubIcon from '../components/Icon/GithubIcon';
import InstagramIcon from '../components/Icon/InstagramIcon';
import LinkedInIcon from '../components/Icon/LinkedInIcon';
import YouTubeIcon from '../components/Icon/YoutubeIcon';
import heroImage from '../images/header-background.jpg';
import FocaFounderHack from '../images/portfolio/FocaFounderHack.png';
import InstaClone from '../images/portfolio/Insta-Clone.png';
import LockdIn from '../images/portfolio/LockdIn.jpg';
import profilepic from '../images/profilepic.jpg';
import testimonialImage from '../images/testimonial.webp';
import {
  About,
  calculateAge,
  ContactSection,
  ContactType,
  Hero,
  HomepageMeta,
  PortfolioItem,
  SkillGroup,
  Social,
  TestimonialSection,
  TimelineItem,
} from './dataDef';

/**
 * Page meta data
 */
export const homePageMeta: HomepageMeta = {
  title: "King Wu's Personal Website",
  description: "This is a Personal Profile that showcases King Wu",
};

/**
 * Section definition
 */
export const SectionId = {
  Hero: 'hero',
  About: 'about',
  Contact: 'contact',
  Portfolio: 'portfolio',
  Resume: 'resume',
  Skills: 'skills',
  Stats: 'stats',
  Testimonials: 'testimonials',
} as const;

export type SectionId = (typeof SectionId)[keyof typeof SectionId];

/**
 * Hero section
 */
export const heroData: Hero = {
  imageSrc: heroImage,
  name: `I'm Zenan (King) Wu.`,
  description: (
    <>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        I'm a Melbourne based <strong className="text-stone-100">Engineering and Commerce Undergraduate</strong>, currently studying
        at <strong className="text-stone-100">Monash University</strong>.
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        In my free time time, you can catch me training for <strong className="text-stone-100">MMA</strong>,
        playing <strong className="text-stone-100">tennis</strong>,
        producing <strong className="text-stone-100">music</strong>, or modifying my beautiful{' '}
        <strong className="text-stone-100">BMW G310R Motorcycle</strong>.
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        Self-taught in <strong className="text-stone-100">front-end web development</strong>, I'm now diving into <strong className="text-stone-100">back-end development</strong>,
        <strong className="text-stone-100"> machine learning</strong>, and <strong className="text-stone-100">quantitative trading</strong>.
      </p>
    </>
  ),
  actions: [
    {
      href: 'https://kingwu.tiiny.site/',
      text: 'Resume',
      primary: true,
      Icon: ArrowDownTrayIcon,
    },
    {
      href: `#${SectionId.Contact}`,
      text: 'Contact',
      primary: false,
    },
  ],
};

/**
 * About section
 */
export const aboutData: About = {
  profileImageSrc: profilepic,
  description: ``,
  aboutItems: [
    { label: 'Location', text: 'Melbourne, VIC', Icon: MapIcon },
    { label: 'Age', text: `${calculateAge('2003-03-28')}`, Icon: CalendarIcon },
    { label: 'Nationality', text: 'Chinese / Australian', Icon: FlagIcon },
    { label: 'Interests', text: 'Motorcycles, MMA, Music Production', Icon: SparklesIcon },
    { label: 'Study', text: 'Monash University', Icon: AcademicCapIcon },
    { label: 'Employment', text: 'Self-employed', Icon: BuildingOffice2Icon },
  ],
};

/**
 * Skills section
 */
export const skills: SkillGroup[] = [
  {
    name: 'Spoken languages',
    skills: [
      {
        name: 'English',
        level: 10,
      },
      {
        name: 'Chinese',
        level: 10,
      },
      {
        name: 'Japanese',
        level: 3,
      },
    ],
  },
  {
    name: 'Tech-Stack',
    skills: [
      {
        name: 'React + Vite (JavaScript)',
        level: 8,
      },
      {
        name: 'Python',
        level: 9,
      },
      {
        name: 'MySQL',
        level: 5,
      },
    ],
  },
  /**
  {
    name: 'Backend development',
    skills: [
      {
        name: 'Node.js',
        level: 8,
      },
      {
        name: 'Rust',
        level: 5,
      },
      {
        name: 'Golang',
        level: 4,
      },
    ],
  },
  {
    name: 'Mobile development',
    skills: [
      {
        name: 'React Native',
        level: 9,
      },
      {
        name: 'Flutter',
        level: 4,
      },
      {
        name: 'Swift',
        level: 3,
      },
    ],
  },
   */
];

/**
 * Portfolio section
 */
export const portfolioItems: PortfolioItem[] = [
  {
    title: 'LockdIn - UniHack',
    description: 'LockdIn is primarily a Chrome Extension landing page for Monash University students',
    url: 'https://devpost.com/software/lockdin?ref_content=my-projects-tab&ref_feature=my_projects',
    image: LockdIn,
  },

  {
    title: "Instagram Clone Project",
    description: 'This is a practice project prior my start up idea to learn more about react and vite.',
    url: 'https://insta-clone-2dc9k3k8g-kingwu12s-projects.vercel.app/auth',
    image: InstaClone,
  },
  {
    title: 'Foca - FounderHack',
    description: 'The beginning of Foca, a productivity tool that blends the element of social accountability.',
    url: 'https://devpost.com/software/foca-bdep8x?ref_content=my-projects-tab&ref_feature=my_projects',
    image: FocaFounderHack,
  },
  /**
  {
    title: 'Project title 3',
    description: 'Give a short description of your project here.',
    url: 'https://reactresume.com',
    image: porfolioImage3,
  },
  {
    title: 'Project title 4',
    description: 'Give a short description of your project here.',
    url: 'https://reactresume.com',
    image: porfolioImage4,
  },
  {
    title: 'Project title 5',
    description: 'Give a short description of your project here.',
    url: 'https://reactresume.com',
    image: porfolioImage5,
  },
 */
];

/**
 * Resume section
 */
export const education: TimelineItem[] = [
  {
    date: 'September, 2026',
    location: 'Monash University',
    title: 'Bachelor of Mechanical Engineering (Honours)',
    content: <p>During my pursuit of the Bachelor of Mechanical Engineering, I delved into the intricacies of designing, analyzing, and optimizing mechanical systems.
      Through hands-on projects and coursework, I gained proficiency in CAD modeling, finite element analysis, and prototype development.
      This degree not only equipped me with technical knowledge but also instilled in me a passion for innovation and a commitment to sustainability.</p>,
  },
  {
    date: 'September, 2026',
    location: 'Monash University',
    title: 'Bachelor of Finance',
    content: <p>During my Bachelor of Finance studies,
      I explored various financial instruments, risk management strategies, and investment techniques.
      These insights empowered me to analyze market trends, assess investment opportunities, and make informed decisions.
      Moreover, I developed a strong foundation in financial modeling, quantitative analysis, and data interpretation,
      enabling me to forecast future financial performance and optimize business strategies. </p>,
  },
];

export const experience: TimelineItem[] = [
  {
    date: 'February 2022 - Present',
    location: 'Ezy Math Tutoring Pty Ltd',
    title: 'Mathematics Tutor',
    content: (
      <p>
        Experienced Methods and Specialist Mathematics Tutor dedicated to fostering student success through personalised and engaging lessons.
      </p>
    ),
  },
  {
    date: 'November 2021 - Present',
    location: 'Melbourne Sports Institute',
    title: 'Basketball Coach',
    content: (
      <p>
        As a dedicated Basketball Coach at the Melbourne Sports Institute,
        I led and developed young athletes across a range of skill levels, fostering an environment of excellence, teamwork, and personal growth.
      </p>
    ),
  },
];

/**
 * Testimonial section
*/
export const testimonial: TestimonialSection = {
  imageSrc: testimonialImage,
  testimonials: [
    /**
    {
      name: 'John Doe',
      text: 'Use this as an opportunity to promote what it is like to work with you. High value testimonials include ones from current or past co-workers, managers, or from happy clients.',
      image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/169.jpg',
    },
    {
      name: 'Jane Doe',
      text: 'Here you should write some nice things that someone has said about you. Encourage them to be specific and include important details (notes about a project you were on together, impressive quality produced, etc).',
      image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/14.jpg',
    },
    {
      name: 'Someone else',
      text: 'Add several of these, and keep them as fresh as possible, but be sure to focus on quality testimonials with strong highlights of your skills/work ethic.',
      image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/69.jpg',
    },
    */
  ],
};

/**
 * Contact section
 */

export const contact: ContactSection = {
  headerText: 'Get in touch.',
  description: "Let's Connect! If you have any questions, ideas, or simply want to say hello, I'd love to hear from you.",
  items: [
    {
      type: ContactType.Email,
      text: 'Kingwu1206@gmail.com',
      href: 'mailto:kingwu1206@gmail.com',
    },
    {
      type: ContactType.Location,
      text: 'Melbourne VIC, Australia',
      href: 'https://maps.app.goo.gl/fY8xVHymGQj9xL5H9',
    },
    {
      type: ContactType.Facebook,
      text: '@Kingwu1206',
      href: 'https://www.facebook.com/kingwu1206/',
    },
    {
      type: ContactType.LinkedIn,
      text: '@Zenanwu',
      href: 'https://www.linkedin.com/in/zenan-wu-50681624b/',
    },
  ],
};

/**
 * Social items
 */
export const socialLinks: Social[] = [
  { label: 'Github', Icon: GithubIcon, href: 'https://github.com/Kingwu12' },
  { label: 'Facebook', Icon: FacebookIcon, href: 'https://www.facebook.com/kingwu1206/' },
  { label: 'LinkedIn', Icon: LinkedInIcon, href: 'https://www.linkedin.com/in/zenan-wu-50681624b/' },
  { label: 'Instagram', Icon: InstagramIcon, href: 'https://www.instagram.com/kingwu1206/' },
  { label: 'YouTube', Icon: YouTubeIcon, href: 'https://youtube.com/@Kingwu1206?si=nZJBIZbwHxS0arw7' },
];

