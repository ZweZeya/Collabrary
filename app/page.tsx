"use client";
import { useState, useEffect } from "react";
import Image from 'next/image';
import { Main, TopBar } from '@/components/Module/';
import { load } from "../utils/auth";

export default function Home() {
  
  useEffect(() => {
    load().then(r => console.log(r))
  })
  
  return (
    <Main>
      <TopBar />
      <h1>Home</h1>
    </Main>
  )
}
