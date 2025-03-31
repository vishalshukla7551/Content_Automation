"use client"
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';


const slides = [
  {
    title: "Revolutionize Your Content Creation",
    text: "Our AI-powered app delivers engaging and high-quality text in seconds.",
    image: "/ai-content-1.png"
  },
  {
    title: "Effortless Instagram Auto Posting",
    text: "Schedule and publish your Instagram posts automatically with precision. Boost engagement, maintain consistency, and grow your audience—without manual effort.",
    image: "/instagram-auto-posting.png"
  },
  {
    title: "Seamless LinkedIn Auto Posting",
    text: "Enhance your professional presence with automated LinkedIn posts. Share industry insights, updates, and articles effortlessly while maximizing visibility and engagement.",
    image: "/linkedin-auto-posting.png"
  },
  {
    title: "Generate Engaging Content Instantly",
    text: "Create blog posts, ads, social media captions, and more with ease.",
    image: "/ai-content-2.jpg"
  },
  {
    title: "Enhance Your Creativity",
    text: "AI assists you in crafting compelling narratives effortlessly.",
    image: "/ai-content-3.jpg"
  }
];

export default function AIContentLanding() {
  const router = useRouter();

  const goToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className="relative w-screen min-h-screen bg-black text-white overflow-hidden flex flex-col items-center">
      <Button onClick={goToDashboard} className="absolute top-5 right-5 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-xl">
        Get Started
      </Button>
      <div className="w-full flex flex-col items-center">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: false, amount: 0.3 }}
            className={`w-full min-h-screen flex flex-col md:flex-row items-center text-center md:text-left p-10 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
          >
            <div className="md:w-1/2 flex justify-center">
              <img src={slide.image} alt={slide.title} className="w-2/3 max-w-md rounded-xl shadow-lg" />
            </div>
            <div className="md:w-1/2 flex flex-col items-center md:items-start p-5">
              <h1 className="text-5xl font-bold mb-4">{slide.title}</h1>
              <p className="text-lg max-w-lg">{slide.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <Button onClick={goToDashboard} className="my-10 px-6 py-3 bg-green-500 hover:bg-green-600 rounded-xl">
        Get Started
      </Button>
    </div>
  );
}