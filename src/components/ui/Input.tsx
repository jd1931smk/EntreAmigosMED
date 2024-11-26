import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface BaseInputProps {
  label?: string;
  error?: string;
  as?: 'input' | 'textarea';
}

type InputProps = BaseInputProps & 
  (
    | (InputHTMLAttributes<HTMLInputElement> & { as?: 'input' })
    | (TextareaHTMLAttributes<HTMLTextAreaElement> & { as: 'textarea' })
  );

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ className, label, error, as = 'input', ...props }, ref) => {
    const baseStyles = 'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-beige-500';
    const inputStyles = twMerge(
      baseStyles,
      error && 'border-red-500',
      className
    );

    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-beige-600">
            {label}
          </label>
        )}
        {as === 'textarea' ? (
          <textarea
            ref={ref as any}
            className={inputStyles}
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as any}
            className={inputStyles}
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);