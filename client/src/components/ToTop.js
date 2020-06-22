import React from 'react';
import './ToTop.css';

export default function BackToTop() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 100,
            behavior: 'smooth'
        });
    }
    return <button className="to-top" onClick={scrollToTop}></button>
         
}