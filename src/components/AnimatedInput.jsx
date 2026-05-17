import React from 'react';

export const AnimatedInput = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  name,
  required = false,
  className = '',
  icon: Icon,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-300 tracking-wide text-left pl-1">
          {label} {required && <span className="text-neon-pink">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-4 text-gray-400">
            <Icon size={18} />
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 ${Icon ? 'pl-11' : ''} text-white placeholder-gray-500 focus:outline-none focus:border-primary-purple focus:ring-2 focus:ring-primary-purple/20 transition-all duration-300`}
          {...props}
        />
      </div>
    </div>
  );
};

export default AnimatedInput;
