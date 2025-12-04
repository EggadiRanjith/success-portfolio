"use client";

import React from "react";
import { Badge } from "@/components/ui";
import { motion } from "framer-motion";
import { Code, Trophy, TrendingUp, Star, ExternalLink } from "lucide-react";

interface LeetCodeStatsProps {
  username: string;
  profileUrl: string;
  stats: {
    problemsSolved: string;
    acceptanceRate: string;
    contestRating: string;
    badges: string[];
    topics: string[];
  };
}

export function LeetCodeStats({ username, profileUrl, stats }: LeetCodeStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true }}
      className="group relative glass-card p-8 rounded-2xl border border-border-primary hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-500"
      whileHover={{ y: -6, scale: 1.02 }}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
          <Code className="w-6 h-6 text-fg-primary" />
        </div>
        <div>
          <h3 className="text-h4 font-bold text-fg-primary group-hover:text-gradient-silver transition-all duration-300">
            LeetCode Performance
          </h3>
          <a 
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-fg-tertiary hover:text-fg-primary transition-colors flex items-center gap-1"
          >
            @{username}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* LeetCode Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="glass-card p-4 rounded-lg border border-border-primary/50 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Trophy className="w-4 h-4 text-fg-primary" />
          </div>
          <p className="text-2xl font-bold text-fg-primary mb-1">{stats.problemsSolved}</p>
          <p className="text-xs text-fg-tertiary">Problems Solved</p>
        </div>
        <div className="glass-card p-4 rounded-lg border border-border-primary/50 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-fg-primary" />
          </div>
          <p className="text-2xl font-bold text-fg-primary mb-1">{stats.acceptanceRate}</p>
          <p className="text-xs text-fg-tertiary">Acceptance Rate</p>
        </div>
        <div className="glass-card p-4 rounded-lg border border-border-primary/50 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="w-4 h-4 text-fg-primary" />
          </div>
          <p className="text-2xl font-bold text-fg-primary mb-1">{stats.contestRating}</p>
          <p className="text-xs text-fg-tertiary">Contest Rating</p>
        </div>
      </div>

      {/* Badges */}
      <div className="mb-6">
        <p className="text-xs text-fg-tertiary mb-2 font-semibold uppercase tracking-wide">Achievements</p>
        <div className="flex flex-wrap gap-2">
          {stats.badges.map((badge, idx) => (
            <Badge key={idx} variant="glass" size="sm" className="bg-primary/10">
              <Trophy className="w-3 h-3 mr-1" />
              {badge}
            </Badge>
          ))}
        </div>
      </div>

      {/* Topics */}
      <div>
        <p className="text-xs text-fg-tertiary mb-2 font-semibold uppercase tracking-wide">Focus Areas</p>
        <div className="flex flex-wrap gap-2">
          {stats.topics.map((topic) => (
            <Badge key={topic} variant="glass" size="sm">
              {topic}
            </Badge>
          ))}
        </div>
      </div>

      {/* Hover shine effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-fg-primary/5 to-transparent" />
      </div>
    </motion.div>
  );
}

