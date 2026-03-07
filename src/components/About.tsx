import { motion } from 'motion/react';
import { Cpu, Globe, Zap } from 'lucide-react';

const features = [
  {
    icon: <Cpu className="text-cyan-400" size={32} />,
    title: "Advanced AI",
    description: "Leveraging neural networks to build systems that learn, adapt, and evolve."
  },
  {
    icon: <Globe className="text-purple-400" size={32} />,
    title: "Global Scale",
    description: "Architectures designed to handle millions of concurrent operations seamlessly."
  },
  {
    icon: <Zap className="text-blue-400" size={32} />,
    title: "Lightning Fast",
    description: "Optimized codebases ensuring zero-latency experiences for end users."
  }
];

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Pioneering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Digital Frontier</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              At Hamoud Labs, we don't just write code; we engineer the future. Our multidisciplinary team of researchers, designers, and developers work at the intersection of artificial intelligence and human-centric design to create software that feels like magic.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              Founded on the belief that technology should empower humanity, we build robust, scalable, and beautiful solutions for the world's most complex challenges.
            </p>
          </motion.div>

          <div className="grid gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex items-start gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group"
              >
                <div className="p-4 rounded-xl bg-black/50 border border-white/5 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
