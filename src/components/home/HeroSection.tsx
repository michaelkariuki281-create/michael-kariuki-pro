import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import profileImage from "@/assets/michael-profile.jpg";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms for background elements
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const orbY1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const orbY3 = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const starsY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section ref={sectionRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Parallax Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient overlay */}
        <motion.div 
          style={{ y: bgY, opacity }}
          className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent"
        />
        
        {/* Floating orbs with parallax */}
        <motion.div
          style={{ y: orbY1 }}
          className="absolute top-20 left-[10%] w-72 h-72 rounded-full bg-purple-500/10 blur-3xl"
        />
        <motion.div
          style={{ y: orbY2 }}
          className="absolute top-40 right-[15%] w-96 h-96 rounded-full bg-violet-500/10 blur-3xl"
        />
        <motion.div
          style={{ y: orbY3 }}
          className="absolute bottom-20 left-[30%] w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl"
        />
        
        {/* Animated stars/particles */}
        <motion.div style={{ y: starsY }} className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-300/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>
        
        {/* Grid pattern */}
        <motion.div 
          style={{ y: bgY, opacity }}
          className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">
                Available for Freelance Projects
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-[1.1]"
            >
              Michael<br />
              <span className="text-accent">Kariuki</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground max-w-lg"
            >
              Web Developer building fast, responsive, and user-focused websites 
              that turn design concepts into accessible digital experiences.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              {/* 3D Push Button - Hire Me */}
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-3 text-base font-bold text-white bg-[#6c5ce7] rounded-md shadow-[0px_5px_0px_0px_#a29bfe] transition-all duration-100 active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#a29bfe] hover:bg-[#5b4cdb]"
              >
                Hire Me
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Button asChild variant="outline" size="lg">
                <Link to="/projects">View Portfolio</Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex gap-8 pt-8 border-t border-border"
            >
              <div>
                <motion.p 
                  className="font-display text-3xl font-semibold text-foreground"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  1
                </motion.p>
                <p className="text-sm text-muted-foreground">Year Experience</p>
              </div>
              <div>
                <motion.p 
                  className="font-display text-3xl font-semibold text-foreground"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  1
                </motion.p>
                <p className="text-sm text-muted-foreground">Project & Growing</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Decorative circles */}
              <motion.div 
                className="absolute inset-0 rounded-full border-2 border-dashed border-accent/20 animate-[spin_30s_linear_infinite]"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              />
              <motion.div 
                className="absolute inset-8 rounded-full border-2 border-accent/10"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              />
              <motion.div 
                className="absolute inset-16 rounded-full bg-accent/5"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
              />
              
              {/* Profile Image */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                <Avatar className="w-48 h-48 border-4 border-accent shadow-custom-xl">
                  <AvatarImage src={profileImage} alt="Michael Kariuki" className="object-cover" />
                  <AvatarFallback className="text-4xl font-semibold bg-accent/10 text-accent">MK</AvatarFallback>
                </Avatar>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                animate={{ y: [-10, 10, -10] }}
                className="absolute top-20 right-0 px-4 py-2 bg-card rounded-lg shadow-custom-lg border border-border"
              >
                <span className="text-sm font-medium">HTML5</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                animate={{ y: [10, -10, 10] }}
                className="absolute bottom-20 left-0 px-4 py-2 bg-card rounded-lg shadow-custom-lg border border-border"
              >
                <span className="text-sm font-medium">JavaScript</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                animate={{ y: [-5, 15, -5] }}
                className="absolute bottom-32 right-8 px-4 py-2 bg-card rounded-lg shadow-custom-lg border border-border"
              >
                <span className="text-sm font-medium">CSS3</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
