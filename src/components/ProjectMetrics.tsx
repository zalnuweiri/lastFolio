import { motion } from 'motion/react';

interface Metric {
  label: string;
  value: string;
}

interface ProjectMetricsProps {
  metrics: Metric[];
}

export function ProjectMetrics({ metrics }: ProjectMetricsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
      {metrics.map((metric, metricIndex) => (
        <motion.div
          key={metricIndex}
          className="p-2.5 md:p-3 rounded-xl md:rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-gray-800/50 relative overflow-hidden group/metric min-h-[60px] md:min-h-0"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover/metric:opacity-100 transition-opacity duration-300" />
          
          <div className="relative">
            <div className="text-[9px] md:text-[10px] text-gray-500 mb-0.5 uppercase tracking-wide">{metric.label}</div>
            <div className="text-xs md:text-sm bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent font-semibold">
              {metric.value}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}