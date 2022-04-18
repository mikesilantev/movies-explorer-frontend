import React from "react";
import './SectionTitle.css';

export default function SectionTitle({text}) {
  return (
      <h2 className="section-title">{text}</h2>
  )
}