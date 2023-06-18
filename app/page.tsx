"use client";
import { useState, useEffect } from "react";
import Layout from "@/components/Module/Layout";
import Modal, { ModalIcons } from "@/components/Module/Modal";
import { load } from "../common/utils/auth";

export default function Home() {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    load().then(r => console.log(r))
  }, [])
  
  return (
    <Layout>
      <Modal 
        isOpen={isModalOpen}
        setOpen={setModalOpen}
        title="Title"
        content="This is some garbage content."
        icon={ModalIcons.Success}
      />
    </Layout>
  )
}
