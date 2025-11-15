"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, GitBranch, Star, TrendingUp, ExternalLink, Code, GitCommit } from "lucide-react";

interface GitHubStatsProps {
  username: string;
  profileUrl: string;
  stats: {
    contributions: string;
    repositories: string;
    stars: string;
    languages: string[];
    topRepos: Array<{
      name: string;
      stars: number;
      description: string;
    }>;
  };
}

export function GithubStats({ username, profileUrl, stats }: GitHubStatsProps) {
  // Language colors for visual representation
  const languageColors: Record<string, string> = {
    Python: "bg-blue-500",
    JavaScript: "bg-yellow-500",
    TypeScript: "bg-blue-600",
    Java: "bg-orange-500",
    "C++": "bg-blue-700",
    Go: "bg-cyan-500",
    Rust: "bg-orange-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="group relative glass-card p-8 rounded-2xl border border-border-primary hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-500"
      whileHover={{ y: -6, scale: 1.02 }}
    >
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-border-primary/50">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 group-hover:from-gray-700 group-hover:to-gray-800 transition-all duration-300 shadow-lg">
            <Github className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-h4 font-bold text-fg-primary group-hover:text-gradient-silver transition-all duration-300 mb-1">
              GitHub Profile
            </h3>
            <a 
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-fg-tertiary hover:text-fg-primary transition-colors flex items-center gap-1.5 group/link"
            >
              <span className="font-medium">@{username}</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/5 border border-border-primary/30">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-fg-tertiary font-medium">Active</span>
        </div>
      </div>

      {/* Main Stats Grid - Enhanced */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <motion.div 
          className="glass-card p-5 rounded-xl border border-border-primary/50 text-center group/stat hover:border-border-primary transition-all"
          whileHover={{ scale: 1.05, y: -2 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <GitBranch className="w-5 h-5 text-fg-primary" />
          </div>
          <p className="text-3xl font-bold text-fg-primary mb-1 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            {stats.repositories}
          </p>
          <p className="text-xs text-fg-tertiary font-medium uppercase tracking-wide">Repositories</p>
        </motion.div>

        <motion.div 
          className="glass-card p-5 rounded-xl border border-border-primary/50 text-center group/stat hover:border-border-primary transition-all"
          whileHover={{ scale: 1.05, y: -2 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          </div>
          <p className="text-3xl font-bold text-fg-primary mb-1 bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-orange-400 bg-clip-text text-transparent">
            {stats.stars}
          </p>
          <p className="text-xs text-fg-tertiary font-medium uppercase tracking-wide">Stars Earned</p>
        </motion.div>

        <motion.div 
          className="glass-card p-5 rounded-xl border border-border-primary/50 text-center group/stat hover:border-border-primary transition-all"
          whileHover={{ scale: 1.05, y: -2 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <GitCommit className="w-5 h-5 text-fg-primary" />
          </div>
          <p className="text-3xl font-bold text-fg-primary mb-1 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
            {stats.contributions}
          </p>
          <p className="text-xs text-fg-tertiary font-medium uppercase tracking-wide">Contributions</p>
        </motion.div>

        <motion.div 
          className="glass-card p-5 rounded-xl border border-border-primary/50 text-center group/stat hover:border-border-primary transition-all"
          whileHover={{ scale: 1.05, y: -2 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Code className="w-5 h-5 text-fg-primary" />
          </div>
          <p className="text-3xl font-bold text-fg-primary mb-1 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            {stats.languages.length}
          </p>
          <p className="text-xs text-fg-tertiary font-medium uppercase tracking-wide">Languages</p>
        </motion.div>
      </div>

      {/* Top Languages with Visual Bars */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-fg-primary font-semibold uppercase tracking-wide flex items-center gap-2">
            <Code className="w-4 h-4" />
            Primary Languages
          </p>
          <a 
            href={`${profileUrl}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-fg-tertiary hover:text-fg-primary transition-colors flex items-center gap-1"
          >
            View All
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <div className="space-y-3">
          {stats.languages.map((lang, idx) => {
            const percentage = 100 - (idx * 15); // Visual representation
            return (
              <div key={lang} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${languageColors[lang] || "bg-gray-500"}`} />
                    <span className="text-sm font-medium text-fg-primary">{lang}</span>
                  </div>
                  <span className="text-xs text-fg-tertiary font-mono">{percentage}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className={`h-full ${languageColors[lang] || "bg-gray-500"} rounded-full`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Repositories - Enhanced */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-fg-primary font-semibold uppercase tracking-wide flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Featured Repositories
          </p>
          <a 
            href={`${profileUrl}?tab=repositories&sort=stars`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-fg-tertiary hover:text-fg-primary transition-colors flex items-center gap-1"
          >
            View All
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <div className="space-y-3">
          {stats.topRepos.map((repo, idx) => (
            <motion.a
              key={idx}
              href={`${profileUrl}/${repo.name}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ x: 4 }}
              className="flex items-center justify-between glass-card p-4 rounded-xl border border-border-primary/50 hover:border-border-primary hover:shadow-lg transition-all group/repo"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <Code className="w-4 h-4 text-fg-tertiary" />
                  <p className="text-sm font-bold text-fg-primary group-hover/repo:text-gradient-silver transition-all truncate">
                    {repo.name}
                  </p>
                </div>
                <p className="text-xs text-fg-tertiary line-clamp-1">{repo.description}</p>
              </div>
              <div className="flex items-center gap-3 ml-4">
                <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-primary/5 border border-border-primary/30">
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-semibold text-fg-primary">{repo.stars}</span>
                </div>
                <ExternalLink className="w-4 h-4 text-fg-tertiary group-hover/repo:text-fg-primary group-hover/repo:translate-x-0.5 group-hover/repo:-translate-y-0.5 transition-all" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Hover shine effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
    </motion.div>
  );
}

