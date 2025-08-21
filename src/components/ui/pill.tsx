import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

const pillVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground ',
        secondary: 'bg-secondary text-secondary-foreground ',
        outline: 'border border-muted ',
        ghost: '',
      },
      size: {
        sm: 'px-2 py-1',
        md: 'px-4 py-2',
        lg: 'px-6 py-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

type PillProps = React.ComponentProps<'span'> &
  VariantProps<typeof pillVariants> & {
    asChild?: boolean;
  };

function Pill({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: PillProps) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot="span"
      className={cn(pillVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Pill };
