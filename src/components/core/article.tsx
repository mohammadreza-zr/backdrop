import { images } from '@/assets/images';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ReactNode } from 'react';

interface IArticle {
  className?: string;
  children?: ReactNode | ReactNode[];
}

const Article = ({ children, className }: IArticle) => {
  return (
    <div className={cn('article', className)}>
      <Image
        src={images.article2}
        alt="article"
        className="aspect-video w-full object-cover"
      />
      <div className="px-4 py-2">
        <p className="text-sm font-bold">باروژ</p>
        <p className="text-xs font-normal">سوخاری, پیتزا, پاستا, ساندویچ</p>
      </div>
    </div>
  );
};

export default Article;
