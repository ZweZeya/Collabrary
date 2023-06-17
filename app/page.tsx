"use client";
import { useState, useEffect } from "react";
import Layout from "@/components/Module/Layout";
import { load } from "../common/utils/auth";

export default function Home() {
  
  useEffect(() => {
    load().then(r => console.log(r))
  }, [])
  
  return (
    <Layout>
      
    </Layout>
  )
}
