import { motion } from 'motion/react';
import { BrainCircuit, Code, Workflow, Database } from 'lucide-react';

const technologies = [
  {
    icon: <BrainCircuit size={40} />,
    name: "Artificial Intelligence",
    description: "Deep learning, NLP, and predictive modeling.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: <Code size={40} />,
    name: "Web Development",
    description: "Modern, reactive, and accessible user interfaces.",
    color: "from-cyan-400 to-blue-500"
  },
  {
    icon: <Workflow size={40} />,
    name: "Automation",
    description: "Streamlining complex workflows and CI/CD pipelines.",
    color: "from-emerald-400 to-teal-500"
  },
  {
    icon: <Database size={40} />,
    name: "Data Engineering",
    description: "Robust architectures for big data processing.",
    color: "from-orange-400 to-red-500"
  }
];

export default function Technology() {
  return (
    <section id="technology" className="py-24 relative overflow-hidden bg-black/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Core <span className="text-purple-400">Technologies</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">The foundational pillars that power our innovative solutions.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500 blur-xl`} />
              <div className="relative h-full p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors flex flex-col items-center text-center">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${tech.color} text-white mb-6 shadow-lg transform group-hover:-translate-y-2 transition-transform duration-300`}>
                  {tech.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{tech.name}</h3>
                <p className="text-gray-400 text-sm">{tech.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
