import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PrepNest — Free SAT & IELTS Preparation',
  description: 'Free SAT and IELTS preparation with lessons, practice, resources and progress tracking.',
  keywords: ['PrepNest','SAT preparation','IELTS preparation','free SAT','free IELTS']
};

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
