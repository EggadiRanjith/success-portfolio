'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import './form-field.css';

export interface FormFieldProps {
  label: string;
  value: string;
  error?: string;
  success?: boolean;
  onChange: (value: string) => void;
  onBlur?: () => void;
  type?: 'text' | 'email' | 'textarea' | 'tel' | 'url';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  rows?: number;
}

export function FormField({
  label,
  value,
  error,
  success,
  onChange,
  onBlur,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  className,
  rows = 4,
}: FormFieldProps) {
  const baseInputClasses = cn(
    'w-full px-4 py-3 rounded-lg transition-all duration-300',
    'border',
    'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
      : success
      ? 'border-green-500 focus:border-green-500 focus:ring-green-500/20'
      : 'border-primary/50 focus:border-primary',
    className
  );

  const labelClasses = cn(
    'block mb-2 text-sm font-semibold text-primary',
    'transition-colors duration-200'
  );

  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <label
        htmlFor={label.toLowerCase().replace(/\s+/g, '-')}
        className={labelClasses}
      >
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>

      {type === 'textarea' ? (
        <textarea
          id={label.toLowerCase().replace(/\s+/g, '-')}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          rows={rows}
          className={cn(baseInputClasses, 'resize-none bg-primary text-primary')}
          aria-label={label}
        />
      ) : (
        <input
          id={label.toLowerCase().replace(/\s+/g, '-')}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={cn(baseInputClasses, 'bg-primary text-primary')}
          aria-label={label}
        />
      )}

      {/* Error/Success message */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-error text-sm mt-2 flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
              {error}
            </p>
          </motion.div>
        )}
        {success && !error && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-success text-sm mt-2 flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
              {label} is valid
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Character count for textarea */}
      {type === 'textarea' && value.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-tertiary mt-1 text-right"
        >
          {value.length} characters
        </motion.p>
      )}
    </motion.div>
  );
}

