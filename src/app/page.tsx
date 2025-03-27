//'use client';
import React, { useState, useEffect } from "react";
import ShowSevenAndStorage from "@/components/ShowSevenAndStorage";
import LoginForm from "@/components/LoginForm";
//import { MenuProvider } from "@/context/IngredientsContext";

export default function Home() {
  return (
    <>
      {/* <MenuProvider> */}
      <LoginForm />
      {/* </MenuProvider> */}
    </>
  );
}
