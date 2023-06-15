"use client";
import { useState, useEffect } from "react";
import Image from 'next/image';
import ModuleLayout from '@/components/Module/ModuleLayout';
import { load } from "../utils/auth";

export default function Home() {
  
  useEffect(() => {
    load().then(r => console.log(r))
  })
  
  return (
    <ModuleLayout>
      <h1>Home</h1>
    </ModuleLayout>
  )
}
