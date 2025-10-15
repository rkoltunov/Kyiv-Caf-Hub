import type { FC, ReactNode } from 'react';

type Props = { children: ReactNode; className?: string };
export const Card: FC<Props> = ({ children, className }) => (
  <div className={` ${className}`}>{children}</div>
);