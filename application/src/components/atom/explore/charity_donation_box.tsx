"use client";

import React, { FC } from 'react';
import Button from '../button';
import Image from 'next/image';
import Link from 'next/link';
import { BORDER_STYLE } from '@/constant/style_constant';

interface ICharityBoxProps {
  path: string;
  title: string;
  location: string;
  description: string;
  emergency: boolean;
}

const CharityDonationBox: FC<ICharityBoxProps> = ({ path, title, location, description, emergency }) => {
  return (
    <div
      className={`bg-accent_yellow lg:w-[416px] py-[1.5em] px-5 border-2 ${
        emergency ? 'border-red-500' : ''
      }`}
      style={BORDER_STYLE}
    >
      {emergency && (
        <div className="bg-red-500 text-white text-sm px-2 py-1 rounded-md mb-3">
          Emergency
        </div>
      )}
      <div className="my-5 py-3 px-2 rounded-md w-[fit-content] bg-[#F7F9FD]">
        <h1 className="font-[500]">{title}</h1>
        <p className="text-[#787878]">{location}</p>
      </div>
      <p className="line-clamp-3">{description}</p>
      <div className="bg-black w-full h-[.09em] my-[1em]"></div>
      <div className="flex justify-end">
        <Link href={path}>
          <Button bg="bg-black">
            <div className="flex gap-1">
              <Image
                src="/asset/cart.svg"
                alt="donation image"
                width="20"
                height="20"
              />
              <h1>Donate</h1>
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CharityDonationBox;
